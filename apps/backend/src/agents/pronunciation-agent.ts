import { chatCompletion, ChatMessage } from '../services/openai.js';
import { pronunciationAnalysisPrompt } from '../utils/prompts.js';

interface PronunciationInput {
  originalText: string;
  transcribedText: string;
  targetLanguage: string;
  accentPreference: string;
}

interface WordAnalysis {
  word: string;
  score: number;
  issue: string;
  tip: string;
}

interface PronunciationResult {
  score: number;
  overallFeedback: string;
  wordAnalysis: WordAnalysis[];
  phonemeFocus: string[];
  positiveAspects: string[];
}

export async function analyzePronunciation(input: PronunciationInput): Promise<PronunciationResult> {
  const chatMessages: ChatMessage[] = [
    { role: 'system', content: pronunciationAnalysisPrompt },
    {
      role: 'user',
      content: `Original text: "${input.originalText}"
Transcribed text: "${input.transcribedText}"
Target language: ${input.targetLanguage}
Accent preference: ${input.accentPreference}`,
    },
  ];

  const response = await chatCompletion({
    model: 'gpt-4o',
    messages: chatMessages,
    temperature: 0.3,
    maxTokens: 1024,
  });

  let result: PronunciationResult;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    result = jsonMatch ? JSON.parse(jsonMatch[0]) : getDefaultResult();
  } catch {
    result = getDefaultResult();
  }

  return result;
}

function getDefaultResult(): PronunciationResult {
  return {
    score: 70,
    overallFeedback: 'Good effort! Keep practicing to improve your pronunciation.',
    wordAnalysis: [],
    phonemeFocus: [],
    positiveAspects: ['Clear overall speech', 'Good attempt at the target language'],
  };
}
