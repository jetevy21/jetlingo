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
} as const;
