import OpenAI from 'openai';
import { config } from '../config.js';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export async function chatCompletion(options: ChatCompletionOptions): Promise<string> {
  const {
    model = 'gpt-4o',
    messages,
    temperature = 0.7,
    maxTokens = 2048,
  } = options;

  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
  });

  return response.choices[0]?.message?.content || '';
}

export async function streamingChatCompletion(options: ChatCompletionOptions) {
  const {
    model = 'gpt-4o',
    messages,
    temperature = 0.7,
    maxTokens = 2048,
  } = options;

  return openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: true,
  });
}

export async function transcribeAudio(audioBuffer: Buffer, filename: string): Promise<string> {
  const file = new File([audioBuffer], filename, { type: 'audio/webm' });
  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file,
    language: 'en',
  });
  return response.text;
}

export async function synthesizeSpeech(text: string, voiceId: string = 'alloy'): Promise<Buffer> {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voiceId as any,
    input: text,
    speed: 1.0,
  });

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0]?.embedding || [];
}

export function countTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export default openai;
