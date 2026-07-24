import { FastifyInstance } from 'fastify';
import { config } from '../config.js';
import { pool } from '../db/index.js';
import { authMiddleware } from '../middleware/auth.js';

const PAYPAL_API = config.paypalMode === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(`${config.paypalClientId}:${config.paypalClientSecret}`).toString('base64');
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json() as any;
  return data.access_token;
}

export default async function subscriptionsRoutes(app: FastifyInstance) {
  app.get('/api/paypal/config', async () => {
    return {
      clientId: config.paypalClientId,
      mode: config.paypalMode,
      plans: {
        premium: config.paypalPremiumPlanId,
        family: config.paypalFamilyPlanId,
      },
    };
  });

  app.post('/api/subscriptions/verify', { preHandler: [authMiddleware] }, async (request, reply) => {
    try {
      const user = (request as any).user;
      const { subscriptionId } = request.body as { subscriptionId: string };

      if (!subscriptionId) {
        return reply.status(400).send({ error: 'subscriptionId required' });
      }

      const accessToken = await getPayPalAccessToken();
      const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        return reply.status(400).send({ error: 'Invalid subscription' });
      }

      const sub = await res.json() as any;
      const planId = sub.plan_id;
      const tier = planId === config.paypalPremiumPlanId ? 'premium'
        : planId === config.paypalFamilyPlanId ? 'family'
        : 'premium';

      await pool.query(
        `INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, tier, status, start_date, next_billing_date)
         VALUES ($1, $2, $3, $4, $5, NOW(), $6)
         ON CONFLICT (paypal_subscription_id) DO UPDATE SET status = $5, next_billing_date = $6, updated_at = NOW()`,
        [user.userId, subscriptionId, planId, tier, sub.status, sub.next_billing_time || null]
      );

      await pool.query(
        `UPDATE users SET subscription_tier = $1, updated_at = NOW() WHERE id = $2`,
        [tier, user.userId]
      );

      return { success: true, tier };
    } catch (err: any) {
      app.log.error(err);
      return reply.status(500).send({ error: 'Verification failed' });
    }
  });

  app.post('/api/subscriptions/cancel', { preHandler: [authMiddleware] }, async (request, reply) => {
    try {
      const user = (request as any).user;
      const { subscriptionId } = request.body as { subscriptionId: string };

      const accessToken = await getPayPalAccessToken();
      const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: 'User requested cancellation' }),
      });

      if (!res.ok && res.status !== 204) {
        return reply.status(400).send({ error: 'Cancellation failed' });
      }

      await pool.query(
        `UPDATE subscriptions SET status = 'cancelled', cancel_date = NOW(), updated_at = NOW() WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );

      await pool.query(
        `UPDATE users SET subscription_tier = 'free', updated_at = NOW() WHERE id = $1`,
        [user.userId]
      );

      return { success: true };
    } catch (err: any) {
      app.log.error(err);
      return reply.status(500).send({ error: 'Cancellation failed' });
    }
  });

  app.get('/api/subscriptions/current', { preHandler: [authMiddleware] }, async (request, reply) => {
    try {
      const user = (request as any).user;
      const result = await pool.query(
        `SELECT * FROM subscriptions WHERE user_id = $1 AND status = 'active' ORDER BY created_at DESC LIMIT 1`,
        [user.userId]
      );
      return { subscription: result.rows[0] || null };
    } catch (err: any) {
      return { subscription: null };
    }
  });

  app.post('/api/webhooks/paypal', async (request, reply) => {
    try {
      const body = request.body as any;
      const eventType = body.event_type;

      if (eventType === 'BILLING.SUBSCRIPTION.ACTIVATED') {
        const subscriptionId = body.resource?.id;
        if (subscriptionId) {
          await pool.query(
            `UPDATE subscriptions SET status = 'active', updated_at = NOW() WHERE paypal_subscription_id = $1`,
            [subscriptionId]
          );
        }
      } else if (eventType === 'BILLING.SUBSCRIPTION.CANCELLED' || eventType === 'BILLING.SUBSCRIPTION.EXPIRED') {
        const subscriptionId = body.resource?.id;
        if (subscriptionId) {
          await pool.query(
            `UPDATE subscriptions SET status = 'cancelled', cancel_date = NOW(), updated_at = NOW() WHERE paypal_subscription_id = $1`,
            [subscriptionId]
          );
          const subResult = await pool.query(
            `SELECT user_id FROM subscriptions WHERE paypal_subscription_id = $1`,
            [subscriptionId]
          );
          if (subResult.rows[0]) {
            await pool.query(
              `UPDATE users SET subscription_tier = 'free', updated_at = NOW() WHERE id = $1`,
              [subResult.rows[0].user_id]
            );
          }
        }
      }

      return { received: true };
    } catch (err: any) {
      app.log.error(err);
      return reply.status(500).send({ error: 'Webhook processing failed' });
    }
  });
}
