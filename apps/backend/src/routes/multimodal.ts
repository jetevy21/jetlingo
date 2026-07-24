import { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import { conversations } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';
import { speechService } from '../services/speech.js';
import { analyzePronunciation } from '../agents/pronunciation-agent.js';

export default async function multimodalRoutes(app: FastifyInstance) {
  app.post('/api/upload', { preHandler: [authMiddleware] }, async (request, reply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: 'No file uploaded' });
    }

    const chunks: Buffer[] = [];
    for await (const chunk of data.file) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    const filename = data.filename;
    const mimetype = data.mimetype;

    let result: any = { filename, mimetype, size: fileBuffer.length };

    if (mimetype.startsWith('audio/')) {
      try {
        const transcription = await speechService.transcribe(fileBuffer, filename);
        result.transcription = transcription;
      } catch (error) {
        result.transcriptionError = 'Failed to transcribe audio';
      }
    }

    return reply.send(result);
  });

  app.post(
    '/api/conversations/:id/multimodal',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const userId = (request as any).userId as string;
      const { id } = request.params as { id: string };

      const convoResult = await db
        .select()
        .from(conversations)
        .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
        .limit(1);

      if (!convoResult[0]) {
        return reply.status(404).send({ error: 'Conversation not found' });
      }

      const data = await request.file();
      if (!data) {
        return reply.status(400).send({ error: 'No file uploaded' });
      }

      const chunks: Buffer[] = [];
      for await (const chunk of data.file) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);
      const filename = data.filename;
      const mimetype = data.mimetype;

      const response: any = { filename, mimetype };

      if (mimetype.startsWith('audio/')) {
        try {
          const transcription = await speechService.transcribe(fileBuffer, filename);
          response.transcription = transcription;

          const conversation = convoResult[0];
          const existingMessages = (conversation.messages as Array<{
            role: string;
            content: string;
          }>) || [];

          const lastUserMessage = existingMessages.filter((m) => m.role === 'user').pop();
          const originalText = lastUserMessage?.content || transcription;

          const pronunciationResult = await analyzePronunciation({
            originalText,
            transcribedText: transcription,
            targetLanguage: 'english',
            accentPreference: 'american',
          });

          response.pronunciationAnalysis = pronunciationResult;
        } catch (error) {
          response.error = 'Failed to process audio';
        }
      } else if (mimetype.startsWith('image/')) {
        response.message = 'Image received. Image analysis is available in premium features.';
      } else {
        response.message = 'File received.';
      }

      return reply.send(response);
    }
  );
}
