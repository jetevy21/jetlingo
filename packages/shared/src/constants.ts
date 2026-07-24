export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export const LANGUAGES = ['english', 'spanish', 'french', 'portuguese', 'german', 'italian', 'japanese', 'korean', 'chinese'] as const;
export const LEARNING_GOALS = ['travel', 'work', 'abroad', 'exam', 'culture'] as const;
export const LESSON_CATEGORIES = ['grammar', 'vocabulary', 'conversation', 'pronunciation', 'ielts', 'toefl', 'business', 'travel'] as const;
export const ACCENT_PREFERENCES = ['american', 'british', 'australian', 'latin_american', 'european'] as const;
export const SUBSCRIPTION_TIERS = ['free', 'premium', 'family', 'lifetime'] as const;

export const AVATARS_BY_LANGUAGE: Record<string, Array<{name: string, accent: string, personality: string, style: string}>> = {
  english: [
    { name: 'Aria', accent: 'american', personality: 'Stanford grad, inclusive and motivating', style: 'encouraging' },
    { name: 'James', accent: 'british', personality: 'Journalist, witty and sharp', style: 'academic' },
    { name: 'Sofia', accent: 'latin_american', personality: 'Dancer, warm and expressive', style: 'casual' },
    { name: 'Kenji', accent: 'american', personality: 'Engineer, patient and methodical', style: 'encouraging' },
    { name: 'Emma', accent: 'australian', personality: 'Traveler, casual and adventurous', style: 'casual' },
    { name: 'Marcus', accent: 'british', personality: 'Professor, rigorous and academic', style: 'strict' },
  ],
  spanish: [
    { name: 'Alejandro', accent: 'european', personality: 'Athletic, sporty and approachable', style: 'casual' },
    { name: 'Valentina', accent: 'latin_american', personality: 'Music lover, warm conversations', style: 'encouraging' },
    { name: 'Lucia', accent: 'european', personality: 'Literary, soft-spoken and academic', style: 'academic' },
    { name: 'Diego', accent: 'latin_american', personality: 'Chef, passionate and fun', style: 'casual' },
    { name: 'Carmen', accent: 'european', personality: 'Business woman, professional', style: 'strict' },
    { name: 'Mateo', accent: 'latin_american', personality: 'Artist, creative and laid-back', style: 'encouraging' },
  ],
  french: [
    { name: 'Claire', accent: 'european', personality: 'Art curator, elegant and cultured', style: 'academic' },
    { name: 'Hugo', accent: 'european', personality: 'Filmmaker, creative and passionate', style: 'casual' },
    { name: 'Amelie', accent: 'european', personality: 'Baker, sweet and encouraging', style: 'encouraging' },
    { name: 'Jean', accent: 'european', personality: 'Philosopher, thoughtful and deep', style: 'academic' },
    { name: 'Sophie', accent: 'latin_american', personality: 'Canadian, friendly and approachable', style: 'encouraging' },
    { name: 'Lucas', accent: 'european', personality: 'Musician, energetic and fun', style: 'casual' },
  ],
  portuguese: [
    { name: 'Rafael', accent: 'latin_american', personality: 'Musician, warm and rhythmic', style: 'casual' },
    { name: 'Isabella', accent: 'european', personality: 'Writer, poetic and refined', style: 'academic' },
    { name: 'Lucas', accent: 'latin_american', personality: 'Surfer, laid-back and friendly', style: 'encouraging' },
    { name: 'Ana', accent: 'european', personality: 'Chef, passionate about food', style: 'casual' },
    { name: 'Pedro', accent: 'latin_american', personality: 'Engineer, methodical and patient', style: 'encouraging' },
    { name: 'Maria', accent: 'european', personality: 'Dancer, expressive and fun', style: 'encouraging' },
  ],
  german: [
    { name: 'Hans', accent: 'european', personality: 'Engineer, precise and reliable', style: 'strict' },
    { name: 'Lena', accent: 'european', personality: 'Scientist, analytical and curious', style: 'academic' },
    { name: 'Felix', accent: 'european', personality: 'Musician, creative and passionate', style: 'casual' },
    { name: 'Anna', accent: 'european', personality: 'Teacher, patient and encouraging', style: 'encouraging' },
    { name: 'Max', accent: 'european', personality: 'Athletic, motivating and direct', style: 'strict' },
    { name: 'Sophie', accent: 'european', personality: 'Artist, imaginative and warm', style: 'encouraging' },
  ],
  italian: [
    { name: 'Marco', accent: 'european', personality: 'Chef, passionate and expressive', style: 'casual' },
    { name: 'Giulia', accent: 'european', personality: 'Fashion designer, elegant and creative', style: 'academic' },
    { name: 'Luca', accent: 'european', personality: 'Filmmaker, dramatic and fun', style: 'casual' },
    { name: 'Sofia', accent: 'european', personality: 'Singer, warm and melodic', style: 'encouraging' },
    { name: 'Alessandro', accent: 'european', personality: 'Architect, thoughtful and precise', style: 'strict' },
    { name: 'Elena', accent: 'european', personality: 'Writer, poetic and gentle', style: 'encouraging' },
  ],
  japanese: [
    { name: 'Yuki', accent: 'asian', personality: 'Tech enthusiast, patient and methodical', style: 'encouraging' },
    { name: 'Haruto', accent: 'asian', personality: 'Martial artist, disciplined and respectful', style: 'strict' },
    { name: 'Sakura', accent: 'asian', personality: 'Artist, creative and gentle', style: 'encouraging' },
    { name: 'Kenji', accent: 'asian', personality: 'Chef, passionate and precise', style: 'casual' },
    { name: 'Akiko', accent: 'asian', personality: 'Teacher, warm and encouraging', style: 'encouraging' },
    { name: 'Takeshi', accent: 'asian', personality: 'Athletic, energetic and motivating', style: 'casual' },
  ],
  korean: [
    { name: 'Min-jun', accent: 'asian', personality: 'K-pop fan, trendy and fun', style: 'casual' },
    { name: 'Ji-woo', accent: 'asian', personality: 'Drama enthusiast, expressive and warm', style: 'encouraging' },
    { name: 'Seo-yeon', accent: 'asian', personality: 'Student, helpful and friendly', style: 'encouraging' },
    { name: 'Tae-hyun', accent: 'asian', personality: 'Business professional, formal and precise', style: 'strict' },
    { name: 'Eun-bi', accent: 'asian', personality: 'Artist, creative and gentle', style: 'encouraging' },
    { name: 'Sung-ho', accent: 'asian', personality: 'Athletic, energetic and motivating', style: 'casual' },
  ],
  chinese: [
    { name: 'Wei', accent: 'asian', personality: 'Teacher, patient and wise', style: 'encouraging' },
    { name: 'Mei', accent: 'asian', personality: 'Business professional, ambitious and direct', style: 'strict' },
    { name: 'Jing', accent: 'asian', personality: 'Artist, creative and contemplative', style: 'academic' },
    { name: 'Chen', accent: 'asian', personality: 'Chef, passionate and warm', style: 'casual' },
    { name: 'Lin', accent: 'asian', personality: 'Engineer, logical and methodical', style: 'encouraging' },
    { name: 'Xiao', accent: 'asian', personality: 'Musician, expressive and fun', style: 'casual' },
  ],
};

export const PRACTICE_TOPICS = [
  { id: 'restaurant', title: 'Ordering at a Restaurant', category: 'daily_life', icon: 'UtensilsCrossed' },
  { id: 'job_interview', title: 'Job Interview', category: 'business', icon: 'Briefcase' },
  { id: 'travel', title: 'Travel & Directions', category: 'travel', icon: 'Plane' },
  { id: 'shopping', title: 'Shopping', category: 'daily_life', icon: 'ShoppingBag' },
  { id: 'doctor', title: 'At the Doctor', category: 'daily_life', icon: 'Stethoscope' },
  { id: 'weather', title: 'Weather Conversation', category: 'daily_life', icon: 'CloudSun' },
  { id: 'hobbies', title: 'Hobbies & Interests', category: 'culture', icon: 'Gamepad2' },
  { id: 'news', title: 'Discussing the News', category: 'culture', icon: 'Newspaper' },
  { id: 'movies', title: 'Movies & TV Shows', category: 'culture', icon: 'Film' },
  { id: 'music', title: 'Music', category: 'culture', icon: 'Music' },
  { id: 'sports', title: 'Sports', category: 'culture', icon: 'Trophy' },
  { id: 'technology', title: 'Technology', category: 'business', icon: 'Laptop' },
  { id: 'food', title: 'Food & Cooking', category: 'culture', icon: 'ChefHat' },
  { id: 'family', title: 'Family & Relationships', category: 'daily_life', icon: 'Heart' },
  { id: 'environment', title: 'Environment', category: 'culture', icon: 'Leaf' },
  { id: 'education', title: 'Education', category: 'business', icon: 'GraduationCap' },
  { id: 'startup', title: 'Startup Life', category: 'business', icon: 'Rocket' },
  { id: 'street_art', title: 'Street Art', category: 'culture', icon: 'Palette' },
  { id: 'wildlife', title: 'Wildlife', category: 'culture', icon: 'Bug' },
  { id: 'architecture', title: 'Architecture', category: 'culture', icon: 'Building' },
] as const;
