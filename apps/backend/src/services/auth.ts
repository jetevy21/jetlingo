import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = '7d';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): { userId: string } {
  const payload = jwt.verify(token, config.jwtSecret) as { userId: string };
  return { userId: payload.userId };
}

export async function findUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function findUserById(id: string) {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
  nativeLanguage?: string;
  targetLanguage?: string;
}) {
  const id = uuidv4();
  const passwordHash = await hashPassword(data.password);

  const result = await db
    .insert(users)
    .values({
      id,
      email: data.email,
      name: data.name,
      passwordHash,
      nativeLanguage: data.nativeLanguage || 'en',
      targetLanguage: data.targetLanguage || 'en',
    })
    .returning();

  return result[0];
}
