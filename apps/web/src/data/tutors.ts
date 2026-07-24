export interface Tutor {
  id: string;
  name: string;
  role: string;
  personality: string;
  avatar: string;
  specialty: string;
  greeting: string;
  style: "encouraging" | "strict" | "casual" | "academic";
  color: string;
  language: "en" | "es";
}

export const tutors: Tutor[] = [
  // ── SPANISH TUTORS ──
  {
    id: "profesor-carlos",
    name: "Professeur Carlos",
    role: "Ton guide principal",
    personality: "Pédagogue, patient, utilise des métaphores du quotidien",
    avatar: "👨‍🏫",
    specialty: "Grammaire et structure",
    greeting: "¡Hola! Je suis Carlos, ton professeur d'espagnol. Je vais t'accompagner dans cette aventure linguistique. Prêt à commencer ?",
    style: "encouraging",
    color: "teal",
    language: "es",
  },
  {
    id: "maria-conversacion",
    name: "María",
    role: "Ton partenaire de conversation",
    personality: "Chaleureuse, expressive, adore les anecdotes culturelles",
    avatar: "👩‍🎤",
    specialty: "Conversation et culture",
    greeting: "¡Hola amigo! Je suis María. Je vais t'aider à parler espagnol comme un natif. N'aie pas peur de faire des erreurs, c'est comme ça qu'on apprend !",
    style: "casual",
    color: "rose",
    language: "es",
  },
  {
    id: "diego-vocabulario",
    name: "Diego",
    role: "Ton expert en vocabulaire",
    personality: "Méticuleux, passionné d'étymologie, fait des liens entre les langues",
    avatar: "🧑‍💻",
    specialty: "Vocabulaire et expressions",
    greeting: "¡Bienvenido! Je suis Diego, et je vais enrichir ton vocabulaire espagnol. Savais-tu que 40% des mots espagnols viennent du latin ?",
    style: "academic",
    color: "amber",
    language: "es",
  },
  {
    id: "sofia-pronunciacion",
    name: "Sofía",
    role: "Ton coach de prononciation",
    personality: "Exigeante mais bienveillante, attentive aux détails",
    avatar: "🎙️",
    specialty: "Prononciation et accent",
    greeting: "¡Hola! Soy Sofía. Je vais t'aider à prononcer comme un vrai Espagnol. Écoute bien et répète après moi !",
    style: "strict",
    color: "purple",
    language: "es",
  },
  {
    id: "mateo-juegos",
    name: "Mateo",
    role: "Ton créateur de défis",
    personality: "Joueur, espiègle, transforme l'apprentissage en jeu",
    avatar: "🎮",
    specialty: "Quiz et exercices interactifs",
    greeting: "¡Ey! Je suis Mateo, et je suis là pour rendre l'apprentissage amusant. Prêt pour un défi ?",
    style: "casual",
    color: "emerald",
    language: "es",
  },
  {
    id: "carmen-business",
    name: "Carmen",
    role: "Ton experte espagnol des affaires",
    personality: "Professionnelle, directe, orientée résultats",
    avatar: "💼",
    specialty: "Espagnol professionnel et formel",
    greeting: "Buenos días. Je suis Carmen. Si tu veux utiliser l'espagnol dans un contexte professionnel, tu es au bon endroit.",
    style: "strict",
    color: "slate",
    language: "es",
  },

  // ── ENGLISH TUTORS ──
  {
    id: "aria",
    name: "Aria",
    role: "Your main guide",
    personality: "Inclusive, motivating, uses everyday metaphors",
    avatar: "👩‍🏫",
    specialty: "Grammar and structure",
    greeting: "Hi there! I'm Aria, your English teacher. I'll guide you through this language adventure. Ready to start?",
    style: "encouraging",
    color: "teal",
    language: "en",
  },
  {
    id: "james",
    name: "James",
    role: "Your grammar expert",
    personality: "Witty, sharp, journalist background",
    avatar: "🧑‍💼",
    specialty: "Grammar and writing",
    greeting: "Hello! I'm James. I'll help you master English grammar with precision and style. Let's get to work!",
    style: "academic",
    color: "amber",
    language: "en",
  },
  {
    id: "kenji",
    name: "Kenji",
    role: "Your conversation partner",
    personality: "Patient, methodical, breaks complex problems into simple steps",
    avatar: "🧑‍💻",
    specialty: "Conversation and vocabulary",
    greeting: "Hey! I'm Kenji. I'll help you build confidence in speaking English. Don't worry about mistakes — that's how we learn!",
    style: "encouraging",
    color: "emerald",
    language: "en",
  },
  {
    id: "sofia",
    name: "Sofia",
    role: "Your pronunciation coach",
    personality: "Demanding but kind, detail-oriented",
    avatar: "🎙️",
    specialty: "Pronunciation and accent",
    greeting: "Hi! I'm Sofia. I'll help you sound like a native speaker. Listen carefully and repeat after me!",
    style: "strict",
    color: "purple",
    language: "en",
  },
  {
    id: "emma",
    name: "Emma",
    role: "Your travel buddy",
    personality: "Casual, adventurous, has visited 40+ countries",
    avatar: "✈️",
    specialty: "Travel and everyday English",
    greeting: "Hey! I'm Emma, your travel buddy. I've been everywhere, and I'll teach you the English you actually need on the road!",
    style: "casual",
    color: "rose",
    language: "en",
  },
];

export function getTutorById(id: string): Tutor | undefined {
  return tutors.find((t) => t.id === id);
}

export function getTutorsByStyle(style: Tutor["style"]): Tutor[] {
  return tutors.filter((t) => t.style === style);
}

export function getRandomTutor(): Tutor {
  return tutors[Math.floor(Math.random() * tutors.length)];
}
