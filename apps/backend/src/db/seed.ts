import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://jetlingo:JetLingo2026!@localhost:5432/jetlingo',
});

// ══════════════════════════════════════════════════════════════
// AVATARS DATA
// ══════════════════════════════════════════════════════════════

const avatars = [
  // ── ENGLISH ──
  { name: 'Aria', language: 'english', accent: 'american', personality: 'Stanford grad, inclusive and motivating', backstory: 'A tech enthusiast from San Francisco who loves helping people achieve their dreams through language.', imageUrl: '/avatars/aria.png', voiceId: 'alloy', style: 'encouraging' },
  { name: 'James', language: 'english', accent: 'british', personality: 'Journalist, witty and sharp', backstory: 'A seasoned BBC correspondent with a dry sense of humor and a passion for clear communication.', imageUrl: '/avatars/james.png', voiceId: 'echo', style: 'academic' },
  { name: 'Sofia', language: 'english', accent: 'latin_american', personality: 'Dancer, warm and expressive', backstory: 'A Colombian salsa instructor who brings rhythm and warmth to every conversation.', imageUrl: '/avatars/sofia.png', voiceId: 'nova', style: 'casual' },
  { name: 'Kenji', language: 'english', accent: 'american', personality: 'Engineer, patient and methodical', backstory: 'A Japanese-American software engineer who believes in breaking complex problems into simple steps.', imageUrl: '/avatars/kenji.png', voiceId: 'onyx', style: 'encouraging' },
  { name: 'Emma', language: 'english', accent: 'australian', personality: 'Traveler, casual and adventurous', backstory: 'A backpacker from Sydney who has visited 40+ countries and collects stories everywhere.', imageUrl: '/avatars/emma.png', voiceId: 'shimmer', style: 'casual' },
  { name: 'Marcus', language: 'english', accent: 'british', personality: 'Professor, rigorous and academic', backstory: 'An Oxford literature professor who sees beauty in precise language and deep thinking.', imageUrl: '/avatars/marcus.png', voiceId: 'echo', style: 'strict' },

  // ── SPANISH ──
  { name: 'Alejandro', language: 'spanish', accent: 'european', personality: 'Athletic, sporty and approachable', backstory: 'A former FC Barcelona youth coach who uses sports metaphors to make learning fun.', imageUrl: '/avatars/alejandro.png', voiceId: 'onyx', style: 'casual' },
  { name: 'Valentina', language: 'spanish', accent: 'latin_american', personality: 'Music lover, warm conversations', backstory: 'AMexican singer-songwriter who believes music is the fastest path to fluency.', imageUrl: '/avatars/valentina.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Lucia', language: 'spanish', accent: 'european', personality: 'Literary, soft-spoken and academic', backstory: 'A Madrid librarian who treasures the written word and classical literature.', imageUrl: '/avatars/lucia.png', voiceId: 'shimmer', style: 'academic' },
  { name: 'Diego', language: 'spanish', accent: 'latin_american', personality: 'Chef, passionate and fun', backstory: 'An Argentine chef who teaches language through recipes and food culture.', imageUrl: '/avatars/diego.png', voiceId: 'onyx', style: 'casual' },
  { name: 'Carmen', language: 'spanish', accent: 'european', personality: 'Business woman, professional', backstory: 'A Barcelona entrepreneur who runs a successful international consultancy.', imageUrl: '/avatars/carmen.png', voiceId: 'alloy', style: 'strict' },
  { name: 'Mateo', language: 'spanish', accent: 'latin_american', personality: 'Artist, creative and laid-back', backstory: 'A Colombian muralist who sees the world in colors and shapes.', imageUrl: '/avatars/mateo.png', voiceId: 'echo', style: 'encouraging' },

  // ── FRENCH ──
  { name: 'Claire', language: 'french', accent: 'european', personality: 'Art curator, elegant and cultured', backstory: 'A Parisian art curator at the Louvre who appreciates beauty in all its forms.', imageUrl: '/avatars/claire.png', voiceId: 'shimmer', style: 'academic' },
  { name: 'Hugo', language: 'french', accent: 'european', personality: 'Filmmaker, creative and passionate', backstory: 'An independent filmmaker from Lyon who tells stories through cinema.', imageUrl: '/avatars/hugo.png', voiceId: 'onyx', style: 'casual' },
  { name: 'Amelie', language: 'french', accent: 'european', personality: 'Baker, sweet and encouraging', backstory: 'A Parisian patissière whose croissants are as warm as her personality.', imageUrl: '/avatars/amelie.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Jean', language: 'french', accent: 'european', personality: 'Philosopher, thoughtful and deep', backstory: 'A Sorbonne philosophy professor who questions everything and expects you to do the same.', imageUrl: '/avatars/jean.png', voiceId: 'echo', style: 'strict' },
  { name: 'Sophie', language: 'french', accent: 'european', personality: 'Canadian, friendly and approachable', backstory: 'A Montrealer who bridges French and North American cultures with ease.', imageUrl: '/avatars/sophie.png', voiceId: 'alloy', style: 'encouraging' },
  { name: 'Lucas', language: 'french', accent: 'european', personality: 'Musician, energetic and fun', backstory: 'A jazz pianist from Marseille who brings improvisation to language learning.', imageUrl: '/avatars/lucas.png', voiceId: 'onyx', style: 'casual' },

  // ── GERMAN ──
  { name: 'Hans', language: 'german', accent: 'european', personality: 'Engineer, precise and helpful', backstory: 'A Munich BMW engineer who applies German precision to teaching.', imageUrl: '/avatars/hans.png', voiceId: 'onyx', style: 'strict' },
  { name: 'Lena', language: 'german', accent: 'european', personality: 'Environmental scientist, warm and passionate', backstory: 'A Berlin environmentalist who loves nature and sustainable living.', imageUrl: '/avatars/lena.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Fritz', language: 'german', accent: 'european', personality: 'Historian, knowledgeable and patient', backstory: 'A Heidelberg historian who brings the past to life through language.', imageUrl: '/avatars/fritz.png', voiceId: 'echo', style: 'academic' },
  { name: 'Greta', language: 'german', accent: 'european', personality: 'Artist, creative and free-spirited', backstory: 'A Hamburg street artist who expresses herself through murals and words.', imageUrl: '/avatars/greta.png', voiceId: 'shimmer', style: 'casual' },

  // ── ITALIAN ──
  { name: 'Marco', language: 'italian', accent: 'european', personality: 'Sommelier, charismatic and jovial', backstory: 'A Tuscan wine expert who believes every meal is a language lesson.', imageUrl: '/avatars/marco_it.png', voiceId: 'onyx', style: 'casual' },
  { name: 'Giulia', language: 'italian', accent: 'european', personality: 'Fashion designer, elegant and inspiring', backstory: 'A Milan fashion designer who sees language as the ultimate accessory.', imageUrl: '/avatars/giulia.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Luigi', language: 'italian', accent: 'european', personality: 'Chef, passionate and humorous', backstory: 'A Neapolitan chef who teaches Italian through the language of food.', imageUrl: '/avatars/luigi.png', voiceId: 'echo', style: 'casual' },
  { name: 'Chiara', language: 'italian', accent: 'european', personality: 'Opera singer, dramatic and expressive', backstory: 'A La Scala soprano who brings theatrical flair to every lesson.', imageUrl: '/avatars/chiara.png', voiceId: 'shimmer', style: 'academic' },

  // ── PORTUGUESE ──
  { name: 'Rafael', language: 'portuguese', accent: 'brazilian', personality: 'Football fan, energetic and fun', backstory: 'A Rio de Janeiro football coach who brings stadium energy to learning.', imageUrl: '/avatars/rafael.png', voiceId: 'onyx', style: 'casual' },
  { name: 'Ana', language: 'portuguese', accent: 'brazilian', personality: 'Marine biologist, curious and passionate', backstory: 'A marine biologist from Salvador who explores language like the ocean.', imageUrl: '/avatars/ana.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Joao', language: 'portuguese', accent: 'european', personality: 'Fado musician, soulful and melancholic', backstory: 'A Lisbon fado player who finds poetry in everyday conversation.', imageUrl: '/avatars/joao.png', voiceId: 'echo', style: 'academic' },
  { name: 'Ines', language: 'portuguese', accent: 'european', personality: 'Architect, thoughtful and creative', backstory: 'A Porto architect who designs spaces and sentences with equal care.', imageUrl: '/avatars/ines.png', voiceId: 'shimmer', style: 'encouraging' },

  // ── JAPANESE ──
  { name: 'Yuki', language: 'japanese', accent: 'asian', personality: 'Game designer, playful and creative', backstory: 'A Tokyo game designer who makes learning feel like play.', imageUrl: '/avatars/yuki.png', voiceId: 'nova', style: 'casual' },
  { name: 'Takeshi', language: 'japanese', accent: 'asian', personality: 'Martial arts master, disciplined and wise', backstory: 'A Kyoto karate sensei who teaches language with martial precision.', imageUrl: '/avatars/takeshi.png', voiceId: 'onyx', style: 'strict' },
  { name: 'Sakura', language: 'japanese', accent: 'asian', personality: 'Animator, imaginative and cheerful', backstory: 'A Studio Ghibli-inspired artist who brings characters to life through words.', imageUrl: '/avatars/sakura.png', voiceId: 'shimmer', style: 'encouraging' },
  { name: 'Kenji', language: 'japanese', accent: 'asian', personality: 'Chef, meticulous and passionate', backstory: 'An Osaka sushi master who applies knife precision to language craft.', imageUrl: '/avatars/kenji_jp.png', voiceId: 'echo', style: 'strict' },

  // ── KOREAN ──
  { name: 'Minjun', language: 'korean', accent: 'asian', personality: 'K-pop idol, energetic and trendy', backstory: 'A Seoul music producer who brings K-pop flair to language learning.', imageUrl: '/avatars/minjun.png', voiceId: 'onyx', style: 'casual' },
  { name: 'Soyeon', language: 'korean', accent: 'asian', personality: 'K-drama actress, expressive and warm', backstory: 'An actress from Busan who believes every conversation is a scene.', imageUrl: '/avatars/soyeon.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Jinho', language: 'korean', accent: 'asian', personality: 'Tech entrepreneur, innovative and driven', backstory: 'A Gangnam startup founder who disrupts language learning through AI.', imageUrl: '/avatars/jinho.png', voiceId: 'echo', style: 'strict' },
  { name: 'Mina', language: 'korean', accent: 'asian', personality: 'Artist, calm and insightful', backstory: 'A Jeju island ceramicist who finds wisdom in simplicity.', imageUrl: '/avatars/mina.png', voiceId: 'shimmer', style: 'academic' },

  // ── CHINESE ──
  { name: 'Wei', language: 'chinese', accent: 'asian', personality: 'Calligrapher, patient and precise', backstory: 'A Beijing calligrapher who sees beauty in every brushstroke of language.', imageUrl: '/avatars/wei.png', voiceId: 'onyx', style: 'strict' },
  { name: 'Mei', language: 'chinese', accent: 'asian', personality: 'Travel blogger, adventurous and friendly', backstory: 'A Shanghai travel blogger who connects cultures through stories.', imageUrl: '/avatars/mei.png', voiceId: 'nova', style: 'encouraging' },
  { name: 'Chen', language: 'chinese', accent: 'asian', personality: 'Professor, scholarly and encouraging', backstory: 'A Tsinghua University professor who makes ancient wisdom accessible.', imageUrl: '/avatars/chen.png', voiceId: 'echo', style: 'academic' },
  { name: 'Lin', language: 'chinese', accent: 'asian', personality: 'Chef, creative and warm', backstory: 'A Cantonese dim sum master who teaches through flavors.', imageUrl: '/avatars/lin.png', voiceId: 'shimmer', style: 'casual' },
];

// ══════════════════════════════════════════════════════════════
// LESSONS DATA
// ══════════════════════════════════════════════════════════════

const lessons = [
  // ── ENGLISH LESSONS ──
  { title: 'Greetings & Introductions', description: 'Learn how to greet people and introduce yourself in English.', language: 'english', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['Say hello and goodbye', 'Introduce yourself', 'Ask someone\'s name'], exercises: ['Role-play meeting someone new', 'Practice common greetings', 'Introduce yourself to your avatar'] } },
  { title: 'Present Simple Tense', description: 'Master the present simple tense for daily routines and facts.', language: 'english', category: 'grammar', cefrLevel: 'A1', orderIndex: 2, content: { type: 'grammar', objectives: ['Form positive sentences', 'Create negative sentences', 'Ask questions'], exercises: ['Describe your daily routine', 'Talk about habits', 'Ask about someone\'s routine'] } },
  { title: 'Ordering Food & Drinks', description: 'Practice ordering at restaurants and cafes in English.', language: 'english', category: 'conversation', cefrLevel: 'A1', orderIndex: 3, content: { type: 'roleplay', scenario: 'restaurant', objectives: ['Read a menu', 'Order food and drinks', 'Ask for the bill'], exercises: ['Role-play restaurant scene', 'Practice food vocabulary', 'Handle special requests'] } },
  { title: 'Numbers & Counting', description: 'Learn numbers, prices, and how to count in English.', language: 'english', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 4, content: { type: 'vocabulary', objectives: ['Count from 1 to 100', 'Say prices correctly', 'Use numbers in context'], exercises: ['Shopping simulation', 'Phone number practice', 'Address recognition'] } },
  { title: 'Past Simple Tense', description: 'Talk about past events and experiences.', language: 'english', category: 'grammar', cefrLevel: 'A2', orderIndex: 5, content: { type: 'grammar', objectives: ['Regular past tense verbs', 'Irregular past tense', 'Past tense questions'], exercises: ['Describe your last weekend', 'Tell a story about your childhood', 'Ask about past experiences'] } },
  { title: 'Travel Vocabulary', description: 'Essential vocabulary for traveling in English-speaking countries.', language: 'english', category: 'vocabulary', cefrLevel: 'A2', orderIndex: 6, content: { type: 'vocabulary', objectives: ['Airport vocabulary', 'Hotel check-in', 'Asking for directions'], exercises: ['Airport role-play', 'Hotel booking simulation', 'Navigation practice'] } },
  { title: 'Conditionals (If Clauses)', description: 'Learn to express conditions and hypothetical situations.', language: 'english', category: 'grammar', cefrLevel: 'B1', orderIndex: 7, content: { type: 'grammar', objectives: ['First conditional', 'Second conditional', 'Third conditional'], exercises: ['Discuss future plans with if', 'Imagine different life scenarios', 'Talk about past regrets'] } },
  { title: 'Business English Essentials', description: 'Professional communication for the workplace.', language: 'english', category: 'business', cefrLevel: 'B1', orderIndex: 8, content: { type: 'conversation', objectives: ['Write professional emails', 'Participate in meetings', 'Give presentations'], exercises: ['Email writing practice', 'Meeting role-play', 'Presentation simulation'] } },
  { title: 'Pronunciation: TH Sounds', description: 'Master the challenging TH sounds in English.', language: 'english', category: 'pronunciation', cefrLevel: 'A1', orderIndex: 9, content: { type: 'pronunciation', objectives: ['Voiced TH (this, that)', 'Unvoiced TH (think, thank)', 'Common TH word practice'], exercises: ['Minimal pairs practice', 'Tongue twisters', 'Conversation with TH focus'] } },
  { title: 'IELTS Speaking Part 1', description: 'Prepare for IELTS Speaking Part 1 questions.', language: 'english', category: 'ielts', cefrLevel: 'B1', orderIndex: 10, content: { type: 'exam_prep', objectives: ['Answer common questions', 'Extend your responses', 'Use varied vocabulary'], exercises: ['Practice common topics', 'Timed responses', 'Self-assessment'] } },
  { title: 'Financial English', description: 'Master financial vocabulary for budgets, reports, and quarterly reviews.', language: 'english', category: 'business', cefrLevel: 'B1', orderIndex: 11, content: { type: 'vocabulary', objectives: ['Discuss revenue and profit', 'Present financial data', 'Analyze quarterly reports'], exercises: ['Financial vocabulary quiz', 'Board meeting role-play', 'Budget presentation'] } },
  { title: 'HR & People Management', description: 'Learn English for hiring, performance reviews, and team management.', language: 'english', category: 'business', cefrLevel: 'B1', orderIndex: 12, content: { type: 'conversation', objectives: ['Conduct performance reviews', 'Discuss HR policies', 'Resolve team conflicts'], exercises: ['Performance review role-play', 'HR vocabulary quiz', 'Conflict resolution scenario'] } },
  { title: 'Marketing & Sales English', description: 'Master marketing pitches, client proposals, and sales conversations.', language: 'english', category: 'business', cefrLevel: 'B1', orderIndex: 13, content: { type: 'conversation', objectives: ['Deliver sales pitches', 'Write client proposals', 'Discuss marketing strategy'], exercises: ['Sales pitch practice', 'Client proposal writing', 'Marketing vocabulary quiz'] } },

  // ── SPANISH LESSONS ──
  { title: 'Saludos y Presentaciones', description: 'Aprende a saludar y presentarte en español.', language: 'spanish', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['Decir hola y adiós', 'Presentarte', 'Preguntar el nombre de alguien'], exercises: ['Simulación de presentación', 'Práctica de saludos', 'Conversación con tu avatar'] } },
  { title: 'El Presente', description: 'Domina el presente simple en español.', language: 'spanish', category: 'grammar', cefrLevel: 'A1', orderIndex: 2, content: { type: 'grammar', objectives: ['Conjugación regular', 'Verbos irregulares', 'Formación de preguntas'], exercises: ['Describe tu rutina diaria', 'Habla de tus hábitos', 'Pregunta sobre la rutina de otros'] } },
  { title: 'En el Restaurante', description: 'Practica pedir comida en un restaurante.', language: 'spanish', category: 'conversation', cefrLevel: 'A1', orderIndex: 3, content: { type: 'roleplay', scenario: 'restaurant', objectives: ['Leer un menú', 'Pedir comida y bebida', 'Pedir la cuenta'], exercises: ['Simulación de restaurante', 'Vocabulario de comida', 'Manejar solicitudes especiales'] } },
  { title: 'Números y Precios', description: 'Aprende números y precios en español.', language: 'spanish', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 4, content: { type: 'vocabulary', objectives: ['Contar del 1 al 100', 'Decir precios correctamente', 'Usar números en contexto'], exercises: ['Simulación de compras', 'Práctica de teléfonos', 'Reconocimiento de direcciones'] } },
  { title: 'Pretérito Indefinido', description: 'Habla de eventos pasados en español.', language: 'spanish', category: 'grammar', cefrLevel: 'A2', orderIndex: 5, content: { type: 'grammar', objectives: ['Verbos regulares', 'Verbos irregulares', 'Preguntas en pasado'], exercises: ['Describe tu último fin de semana', 'Cuenta una historia', 'Pregunta sobre experiencias'] } },
  { title: 'Vocabulario de Viajes', description: 'Vocabulario esencial para viajar en países hispanohablantes.', language: 'spanish', category: 'vocabulary', cefrLevel: 'A2', orderIndex: 6, content: { type: 'vocabulary', objectives: ['Vocabulario de aeropuerto', 'Check-in en hotel', 'Pedir direcciones'], exercises: ['Simulación de aeropuerto', 'Reserva de hotel', 'Práctica de navegación'] } },
  { title: 'Condicionales', description: 'Aprende a expresar condiciones e hipótesis.', language: 'spanish', category: 'grammar', cefrLevel: 'B1', orderIndex: 7, content: { type: 'grammar', objectives: ['Primer condicional', 'Segundo condicional', 'Tercer condicional'], exercises: ['Discutir planes futuros', 'Imaginar escenarios', 'Hablar de arrepentimientos'] } },
  { title: 'Español de Negocios', description: 'Comunicación profesional en el lugar de trabajo.', language: 'spanish', category: 'business', cefrLevel: 'B1', orderIndex: 8, content: { type: 'conversation', objectives: ['Escribir correos profesionales', 'Participar en reuniones', 'Dar presentaciones'], exercises: ['Práctica de emails', 'Simulación de reunión', 'Presentación laboral'] } },
  { title: 'Pronunciación: Ñ y LL', description: 'Domina los sonidos Ñ y LL en español.', language: 'spanish', category: 'pronunciation', cefrLevel: 'A1', orderIndex: 9, content: { type: 'pronunciation', objectives: ['Sonido Ñ (niño, año)', 'Sonido LL (calle, lluvia)', 'Práctica de palabras'], exercises: ['Parejas mínimas', 'Trabalenguas', 'Conversación con foco en Ñ/LL'] } },
  { title: 'DELE A1 Práctica', description: 'Prepárate para el examen DELE nivel A1.', language: 'spanish', category: 'ielts', cefrLevel: 'A1', orderIndex: 10, content: { type: 'exam_prep', objectives: ['Comprensión auditiva', 'Expresión escrita', 'Interacción oral'], exercises: ['Práctica de listening', 'Escritura guiada', 'Simulación oral'] } },

  // ── FRENCH LESSONS ──
  { title: 'Salutations', description: 'Apprenez à saluer et vous présenter en français.', language: 'french', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['Dire bonjour et au revoir', 'Vous présenter', 'Demander le nom de quelqu\'un'], exercises: ['Jeu de rôle de présentation', 'Pratique des salutations', 'Conversation avec votre avatar'] } },
  { title: 'Le Présent', description: 'Maîtrisez le présent de l\'indicatif en français.', language: 'french', category: 'grammar', cefrLevel: 'A1', orderIndex: 2, content: { type: 'grammar', objectives: ['Conjugaison régulière', 'Verbes irréguliers', 'Formation des questions'], exercises: ['Décrivez votre routine', 'Parlez de vos habitudes', 'Questionnez les autres'] } },
  { title: 'Au Restaurant', description: 'Pratiquez commander au restaurant en français.', language: 'french', category: 'conversation', cefrLevel: 'A1', orderIndex: 3, content: { type: 'roleplay', scenario: 'restaurant', objectives: ['Lire un menu', 'Commander à manger et à boire', 'Demander l\'addition'], exercises: ['Simulation de restaurant', 'Vocabulaire culinaire', 'Gérer les demandes spéciales'] } },
  { title: 'Nombres et Prix', description: 'Apprenez les nombres et les prix en français.', language: 'french', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 4, content: { type: 'vocabulary', objectives: ['Compter de 1 à 100', 'Dire les prix', 'Utiliser les nombres en contexte'], exercises: ['Simulation d\'achat', 'Pratique des numéros', 'Reconnaissance d\'adresses'] } },
  { title: 'Le Passé Composé', description: 'Parlez d\'événements passés en français.', language: 'french', category: 'grammar', cefrLevel: 'A2', orderIndex: 5, content: { type: 'grammar', objectives: ['Verbes avec avoir', 'Verbes avec être', 'Participe passé'], exercises: ['Décrivez votre week-end', 'Racontez une histoire', 'Questionnez sur le passé'] } },
  { title: 'Vocabulaire de Voyage', description: 'Vocabulaire essentiel pour voyager en France.', language: 'french', category: 'vocabulary', cefrLevel: 'A2', orderIndex: 6, content: { type: 'vocabulary', objectives: ['Vocabulaire aéroport', 'Check-in hôtel', 'Demander son chemin'], exercises: ['Simulation aéroport', 'Réservation d\'hôtel', 'Pratique de navigation'] } },
  { title: 'Prononçiation: R et Nasales', description: 'Maîtrisez le R français et les voyelles nasales.', language: 'french', category: 'pronunciation', cefrLevel: 'A1', orderIndex: 7, content: { type: 'pronunciation', objectives: ['Son R français', 'Voyelles nasales (an, on, in)', 'Pratique de mots'], exercises: ['Exercices de bouche', 'Jeux de voix', 'Conversation avec focus'] } },

  // ── JAPANESE LESSONS ──
  { title: 'はじめまして (Introductions)', description: '日本語で自己紹介を学びましょう。', language: 'japanese', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['挨拶する', '自己紹介する', '人の名前を聞く'], exercises: ['自己紹介のロールプレイ', '挨拶の練習', 'アバターと会話'] } },
  { title: 'ひらがな基礎', description: 'ひらがなの読み書きを練習します。', language: 'japanese', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 2, content: { type: 'vocabulary', objectives: ['あ行からわ行まで', '正しい筆順', '発音の練習'], exercises: ['書き取り練習', '発音クイズ', '単語の読み方'] } },
  { title: '数字とカウンティング', description: '日本語の数字を学びます。', language: 'japanese', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 3, content: { type: 'vocabulary', objectives: ['数字1-100', '助数詞の使い方', '価格の言い方'], exercises: ['買い物シミュレーション', '電話番号の練習', '数量の表現'] } },
  { title: 'カタカナ基礎', description: 'カタカナの読み書きを練習します。', language: 'japanese', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 4, content: { type: 'vocabulary', objectives: ['外来語の表記', '発音のコツ', 'よく使うカタカナ語'], exercises: ['外来語クイズ', 'メニュー読み', 'カタカナ日記'] } },
  { title: 'ます形 (Polite Form)', description: '丁寧語での会話を練習します。', language: 'japanese', category: 'grammar', cefrLevel: 'A1', orderIndex: 5, content: { type: 'grammar', objectives: ['動詞のます形', '肯定文と否定文', '疑問文の作り方'], exercises: ['日常会話', '丁寧なお願い', '質問の練習'] } },

  // ── KOREAN LESSONS ──
  { title: '안녕하세요 (Greetings)', description: '한국어로 인사를 배워봅시다.', language: 'korean', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['인사하기', '자기소개하기', '이름 묻기'], exercises: ['자기소개 롤 플레이', '인사 연습', '아바타와 대화'] } },
  { title: '한글 기초', description: '한글의 자음과 모음을 배웁니다.', language: 'korean', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 2, content: { type: 'vocabulary', objectives: ['자음 14개', '모음 10개', '글자 조합'], exercises: ['쓰기 연습', '발음 퀴즈', '단어 읽기'] } },
  { title: '숫자와 계산', description: '한국어 숫자를 배웁니다.', language: 'korean', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 3, content: { type: 'vocabulary', objectives: ['한국어 숫자', '천의 숫자', '가격 말하기'], exercises: ['쇼핑 시뮬레이션', '전화번호 연습', '수량 표현'] } },
  { title: '존댓말 (Polite Speech)', description: '존댓말로 대화하는 법을 배웁니다.', language: 'korean', category: 'grammar', cefrLevel: 'A1', orderIndex: 4, content: { type: 'grammar', objectives: ['존댓말 동사', '긍정문과 부정문', '의문문 만들기'], exercises: ['일상 대화', '공손한 부탁', '질문 연습'] } },

  // ── GERMAN LESSONS ──
  { title: 'Begrüßungen', description: 'Lernen Sie sich auf Deutsch vorzustellen.', language: 'german', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['Hallo und Tschüss sagen', 'Sich vorstellen', 'Jemanden nach dem Namen fragen'], exercises: ['Vorstellungsrollenspiel', 'Begrüßungspraxis', 'Gespräch mit Avatar'] } },
  { title: 'Das Präsens', description: 'Meistern Sie das deutsche Präsens.', language: 'german', category: 'grammar', cefrLevel: 'A1', orderIndex: 2, content: { type: 'grammar', objectives: ['Regelmäßige Konjugation', 'Unregelmäßige Verben', 'Fragewörter'], exercises: ['Tagesablauf beschreiben', 'Gewohnheiten erzählen', 'Fragen stellen'] } },
  { title: 'Im Restaurant', description: 'Üben Sie das Bestellen auf Deutsch.', language: 'german', category: 'conversation', cefrLevel: 'A1', orderIndex: 3, content: { type: 'roleplay', scenario: 'restaurant', objectives: ['Speisekarte lesen', 'Essen und Trinken bestellen', 'Die Rechnung bitten'], exercises: ['Restaurant-Simulation', 'Essensvokabular', 'Spezielle Wünsche'] } },
  { title: 'Zahlen und Preise', description: 'Lernen Sie Zahlen und Preise auf Deutsch.', language: 'german', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 4, content: { type: 'vocabulary', objectives: ['Zahlen 1-100', 'Preise aussprechen', 'Zahlen im Kontext'], exercises: ['Einkaufssimulation', 'Telefonnummer-Übung', 'Adressenerkennung'] } },
  { title: 'Das Perfekt', description: 'Sprechen Sie über vergangene Ereignisse.', language: 'german', category: 'grammar', cefrLevel: 'A2', orderIndex: 5, content: { type: 'grammar', objectives: ['Haben-Verben', 'Sein-Verben', 'Partizip II'], exercises: ['Wochenende beschreiben', 'Geschichte erzählen', 'Vergangenes fragen'] } },

  // ── ITALIAN LESSONS ──
  { title: 'Saluti e Presentazioni', description: 'Impara a salutare e presentarti in italiano.', language: 'italian', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['Dire ciao e arrivederci', 'Presentarsi', 'Chiedere il nome'], exercises: ['Gioco di ruolo', 'Pratica dei saluti', 'Conversazione con avatar'] } },
  { title: 'Il Presente', description: 'Padroneggia il presente indicativo italiano.', language: 'italian', category: 'grammar', cefrLevel: 'A1', orderIndex: 2, content: { type: 'grammar', objectives: ['Coniugazione regolare', 'Verbi irregolari', 'Formazione domande'], exercises: ['Descrivi la tua routine', 'Parla delle abitudini', 'Fai domande'] } },
  { title: 'Al Ristorante', description: 'Pratica ordinare al ristorante in italiano.', language: 'italian', category: 'conversation', cefrLevel: 'A1', orderIndex: 3, content: { type: 'roleplay', scenario: 'restaurant', objectives: ['Leggere il menu', 'Ordinare cibo e bevande', 'Chiedere il conto'], exercises: ['Simulazione ristorante', 'Vocabolario cibo', 'Richieste speciali'] } },
  { title: 'Numeri e Prezzi', description: 'Impara numeri e prezzi in italiano.', language: 'italian', category: 'vocabulary', cefrLevel: 'A1', orderIndex: 4, content: { type: 'vocabulary', objectives: ['Contare da 1 a 100', 'Dire i prezzi', 'Usare numeri in contesto'], exercises: ['Simulazione shopping', 'Pratica numeri di telefono', 'Riconoscimento indirizzi'] } },

  // ── PORTUGUESE LESSONS ──
  { title: 'Saudações', description: 'Aprenda a se apresentar em português.', language: 'portuguese', category: 'conversation', cefrLevel: 'A1', orderIndex: 1, content: { type: 'conversation', objectives: ['Dizer olá e tchau', 'Se apresentar', 'Perguntar o nome'], exercises: ['Simulação de apresentação', 'Prática de saudações', 'Conversa com avatar'] } },
  { title: 'O Presente', description: 'Domine o presente do indicativo em português.', language: 'portuguese', category: 'grammar', cefrLevel: 'A1', orderIndex: 2, content: { type: 'grammar', objectives: ['Conjugação regular', 'Verbos irregulares', 'Formação de perguntas'], exercises: ['Descreva sua rotina', 'Fale sobre hábitos', 'Pergunte sobre outros'] } },
  { title: 'No Restaurante', description: 'Pratique pedir comida em português.', language: 'portuguese', category: 'conversation', cefrLevel: 'A1', orderIndex: 3, content: { type: 'roleplay', scenario: 'restaurant', objectives: ['Ler o cardápio', 'Pedir comida e bebida', 'Pedir a conta'], exercises: ['Simulação de restaurante', 'Vocabulário de comida', 'Pedidos especiais'] } },
];

// ══════════════════════════════════════════════════════════════
// SEED FUNCTIONS
// ══════════════════════════════════════════════════════════════

async function seed() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seed...\n');

    // ── Clear existing data ──
    console.log('🗑️  Clearing existing data...');
    await client.query('DELETE FROM user_stats');
    await client.query('DELETE FROM dictionary');
    await client.query('DELETE FROM user_progress');
    await client.query('DELETE FROM conversations');
    await client.query('DELETE FROM lessons');
    await client.query('DELETE FROM avatars');
    await client.query('DELETE FROM users');
    console.log('   ✅ Tables cleared\n');

    // ── Seed Avatars ──
    console.log('🎭 Seeding avatars...');
    for (const avatar of avatars) {
      await client.query(
        `INSERT INTO avatars (id, name, language, accent, personality, backstory, image_url, voice_id, style)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [uuidv4(), avatar.name, avatar.language, avatar.accent, avatar.personality, avatar.backstory, avatar.imageUrl, avatar.voiceId, avatar.style]
      );
    }
    console.log(`   ✅ ${avatars.length} avatars inserted\n`);

    // ── Seed Lessons ──
    console.log('📚 Seeding lessons...');
    for (const lesson of lessons) {
      await client.query(
        `INSERT INTO lessons (id, title, description, language, category, cefr_level, content, order_index, is_published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)`,
        [uuidv4(), lesson.title, lesson.description, lesson.language, lesson.category, lesson.cefrLevel, JSON.stringify(lesson.content), lesson.orderIndex]
      );
    }
    console.log(`   ✅ ${lessons.length} lessons inserted\n`);

    // ── Seed Demo User ──
    console.log('👤 Creating demo user...');
    const demoUserId = uuidv4();
    const demoPasswordHash = await bcrypt.hash('demo1234', 12);

    await client.query(
      `INSERT INTO users (id, email, name, password_hash, native_language, target_language, cefr_level, accent_preference, learning_goal, interests, streak, xp, subscription_tier)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 7, 1250, 'premium')`,
      [demoUserId, 'demo@jetlingo.app', 'Demo User', demoPasswordHash, 'fr', 'en', 'B1', 'latin', 'work', ['technology', 'music', 'travel'],]
    );

    // ── Seed Demo User Stats ──
    await client.query(
      `INSERT INTO user_stats (id, user_id, total_minutes_learned, total_sessions, total_words_learned, average_pronunciation_score, average_grammar_score, current_streak, longest_streak, weekly_minutes)
       VALUES ($1, $2, 1240, 47, 186, 78.5, 82.3, 7, 14, $3)`,
      [uuidv4(), demoUserId, JSON.stringify({ mon: 25, tue: 30, wed: 20, thu: 35, fri: 40, sat: 15, sun: 10 })]
    );

    // ── Seed Demo Dictionary Words ──
    const demoWords = [
      { word: 'ubiquitous', translation: 'omniprésent', context: 'Smartphones have become ubiquitous in modern society.' },
      { word: 'serendipity', translation: 'sérendipité', context: 'Finding that book was pure serendipity.' },
      { word: 'resilience', translation: 'résilience', context: 'Her resilience through difficult times was inspiring.' },
      { word: 'eloquent', translation: 'éloquent', context: 'He gave an eloquent speech about climate change.' },
      { word: 'ephemeral', translation: 'éphémère', context: 'The beauty of cherry blossoms is ephemeral.' },
      { word: 'paradigm', translation: 'paradigme', context: 'This discovery shifted the scientific paradigm.' },
      { word: 'ambiguous', translation: 'ambigu', context: 'The instructions were too ambiguous to follow.' },
      { word: 'nostalgia', translation: 'nostalgie', context: 'The old photos filled her with nostalgia.' },
    ];

    for (const w of demoWords) {
      await client.query(
        `INSERT INTO dictionary (id, user_id, word, translation, language, context)
         VALUES ($1, $2, $3, $4, 'english', $5)`,
        [uuidv4(), demoUserId, w.word, w.translation, w.context]
      );
    }
    console.log(`   ✅ Demo user created (email: demo@jetlingo.app, password: demo1234)`);
    console.log(`   ✅ ${demoWords.length} dictionary words added\n`);

    // ── Seed Demo Conversations ──
    const avatarResult = await client.query(`SELECT id, name FROM avatars WHERE language = 'english' LIMIT 1`);
    if (avatarResult.rows.length > 0) {
      const avatarId = avatarResult.rows[0].id;

      const demoConversations = [
        {
          mode: 'lesson',
          messages: JSON.stringify([
            { role: 'assistant', content: 'Hi! I\'m Aria. Today we\'ll practice ordering food at a restaurant. Ready to start?', timestamp: new Date().toISOString() },
            { role: 'user', content: 'Yes, I\'m ready! Let\'s go.', timestamp: new Date().toISOString() },
            { role: 'assistant', content: 'Great! You walk into a restaurant. The waiter approaches you and says "Good evening, table for one?" What do you say?', timestamp: new Date().toISOString() },
            { role: 'user', content: 'Yes please, a table for two actually.', timestamp: new Date().toISOString() },
            { role: 'assistant', content: 'Perfect! "Right this way." You sit down and get the menu. What would you like to order?', timestamp: new Date().toISOString() },
            { role: 'user', content: 'I\'ll have the grilled salmon with vegetables, please.', timestamp: new Date().toISOString() },
            { role: 'assistant', content: 'Excellent choice! "And to drink?" What do you say?', timestamp: new Date().toISOString() },
            { role: 'user', content: 'Could I get a glass of sparkling water?', timestamp: new Date().toISOString() },
            { role: 'assistant', content: 'Wonderful! Your order is perfect. Notice how you used "Could I get" — that\'s a very polite and natural way to order. Great job! 🎉', timestamp: new Date().toISOString() },
          ]),
          duration: 300,
          score: 88.5,
        },
        {
          mode: 'freetalk',
          messages: JSON.stringify([
            { role: 'assistant', content: 'Hey there! What did you do this weekend?', timestamp: new Date().toISOString() },
            { role: 'user', content: 'I went to the cinema with friends.', timestamp: new Date().toISOString() },
            { role: 'assistant', content: 'Nice! What did you watch? Was it good?', timestamp: new Date().toISOString() },
            { role: 'user', content: 'We watched a sci-fi movie. It was about time travel.', timestamp: new Date().toISOString() },
            { role: 'assistant', content: 'Time travel movies are fascinating! Did you enjoy it? "Was it" is perfect past tense usage. 👏', timestamp: new Date().toISOString() },
          ]),
          duration: 180,
          score: 82.0,
        },
      ];

      for (const conv of demoConversations) {
        await client.query(
          `INSERT INTO conversations (id, user_id, avatar_id, mode, messages, duration, score)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [uuidv4(), demoUserId, avatarId, conv.mode, conv.messages, conv.duration, conv.score]
        );
      }
      console.log('   ✅ 2 demo conversations added\n');
    }

    console.log('═══════════════════════════════════════════════');
    console.log('✅ Seed completed successfully!');
    console.log('═══════════════════════════════════════════════');
    console.log(`   🎭 ${avatars.length} avatars`);
    console.log(`   📚 ${lessons.length} lessons`);
    console.log(`   👤 1 demo user (demo@jetlingo.app / demo1234)`);
    console.log(`   📖 ${demoWords.length} dictionary words`);
    console.log(`   💬 2 demo conversations`);
    console.log('═══════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
