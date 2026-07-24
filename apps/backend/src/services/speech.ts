import { transcribeAudio, synthesizeSpeech } from './openai.js';

export interface SpeechService {
  transcribe(audioBuffer: Buffer, filename: string): Promise<string>;
  synthesize(text: string, voiceId?: string, speed?: number): Promise<Buffer>;
}

export const speechService: SpeechService = {
  async transcribe(audioBuffer: Buffer, filename: string): Promise<string> {
    return transcribeAudio(audioBuffer, filename);
  },

  async synthesize(text: string, voiceId: string = 'alloy', speed: number = 1.0): Promise<Buffer> {
    return synthesizeSpeech(text, voiceId);
  },
};

export default speechService;
