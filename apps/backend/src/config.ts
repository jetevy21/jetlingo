import 'dotenv/config';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  databaseUrl: requiredEnv('DATABASE_URL'),
  openaiApiKey: requiredEnv('OPENAI_API_KEY'),
  jwtSecret: requiredEnv('JWT_SECRET'),
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  paypalMode: process.env.PAYPAL_MODE || 'sandbox',
  paypalPremiumPlanId: process.env.PAYPAL_PREMIUM_PLAN_ID || '',
  paypalFamilyPlanId: process.env.PAYPAL_FAMILY_PLAN_ID || '',
} as const;
