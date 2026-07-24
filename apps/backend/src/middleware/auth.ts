import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../services/auth.js';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.slice(7);

  try {
    const { userId } = verifyToken(token);
    (request as any).userId = userId;
  } catch {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }
}
