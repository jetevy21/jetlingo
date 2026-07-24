const { Pool } = require('pg');
require('dotenv/config');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const sql = `
  CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    paypal_subscription_id TEXT NOT NULL UNIQUE,
    plan_id TEXT NOT NULL,
    tier TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    start_date TIMESTAMP NOT NULL DEFAULT NOW(),
    next_billing_date TIMESTAMP,
    cancel_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

pool.query(sql)
  .then(() => { console.log('Subscriptions table created'); pool.end(); })
  .catch(e => { console.error(e.message); pool.end(); });
