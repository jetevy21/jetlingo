export interface LessonStep {
  type: "intro" | "vocabulary" | "dialogue" | "exercise" | "quiz";
  title: string;
  content?: string;
  tutorTip?: string;
  items?: VocabularyItem[];
  dialogue?: DialogueLine[];
  questions?: QuizQuestion[];
}

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  translation: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  category: string;
  cefrLevel: string;
  estimatedMinutes: number;
  tutorId: string;
  language: string;
  steps: LessonStep[];
}

export const lessonsData: Record<string, LessonData> = {
  "1": {
    id: "1",
    title: "Salutations et présentations",
    description: "Apprenez à saluer et à vous présenter dans des situations formelles et informelles.",
    category: "Conversation",
    cefrLevel: "A1",
    estimatedMinutes: 10,
    tutorId: "profesor-carlos",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Dans cette leçon, vous allez apprendre à dire bonjour, à vous présenter et à avoir une conversation de base en espagnol.",
        tutorTip: "¡Hola! Je suis Carlos, ton guide pour cette leçon. Les salutations sont la porte d'entrée de toute langue. Maîtrise-les, et tu pourras parler à n'importe qui en Espagne !",
      },
      {
        type: "vocabulary",
        title: "Vocabulaire",
        tutorTip: "Écoute bien la prononciation. En espagnol, les voyelles sont toujours claires — pas de secrets !",
        items: [
          { word: "Hola", translation: "Bonjour", pronunciation: "OH-lah", example: "¡Hola! ¿Cómo estás?", exampleTranslation: "Bonjour ! Comment vas-tu ?" },
          { word: "Buenos días", translation: "Bonjour (matin)", pronunciation: "BWEH-nohs DEE-ahs", example: "Buenos días, señora.", exampleTranslation: "Bonjour, madame." },
          { word: "Buenas tardes", translation: "Bonjour (après-midi)", pronunciation: "BWEH-nahs TAR-dehs", example: "Buenas tardes, ¿cómo está usted?", exampleTranslation: "Bon après-midi, comment allez-vous ?" },
          { word: "Buenas noches", translation: "Bonsoir", pronunciation: "BWEH-nahs NOH-chehs", example: "Buenas noches, hasta mañana.", exampleTranslation: "Bonsoir, à demain." },
          { word: "Me llamo...", translation: "Je m'appelle...", pronunciation: "meh YAH-moh", example: "Me llamo Carlos.", exampleTranslation: "Je m'appelle Carlos." },
          { word: "¿Cómo te llamas?", translation: "Comment t'appelles-tu ?", pronunciation: "KOH-moh teh YAH-mahs", example: "Hola, ¿cómo te llamas? — Me llamo María.", exampleTranslation: "Bonjour, comment t'appelles-tu ? — Je m'appelle María." },
          { word: "Mucho gusto", translation: "Enchanté", pronunciation: "MOO-choh GOOS-toh", example: "Mucho gusto, soy Ana.", exampleTranslation: "Enchanté, je suis Ana." },
          { word: "Adiós", translation: "Au revoir", pronunciation: "ah-DYOHS", example: "Adiós, nos vemos mañana.", exampleTranslation: "Au revoir, à demain." },
        ],
      },
      {
        type: "dialogue",
        title: "Dialogue",
        tutorTip: "Regarde comment Carlos et María passent du 'tú' au 'usted'. En espagnol, le niveau de formalité change tout !",
        dialogue: [
          { speaker: "Carlos", text: "¡Hola! Buenos días.", translation: "Bonjour ! " },
          { speaker: "María", text: "¡Hola! Buenos días. ¿Cómo te llamas?", translation: "Bonjour ! Comment t'appelles-tu ?" },
          { speaker: "Carlos", text: "Me llamo Carlos. ¿Y tú?", translation: "Je m'appelle Carlos. Et toi ?" },
          { speaker: "María", text: "Me llamo María. Mucho gusto, Carlos.", translation: "Je m'appelle María. Enchanté, Carlos." },
          { speaker: "Carlos", text: "Mucho gusto, María. ¿Cómo estás?", translation: "Enchanté, María. Comment vas-tu ?" },
          { speaker: "María", text: "Estoy bien, gracias. ¿Y tú?", translation: "Je vais bien, merci. Et toi ?" },
          { speaker: "Carlos", text: "Muy bien, gracias.", translation: "Très bien, merci." },
        ],
      },
      {
        type: "exercise",
        title: "Exercice",
        tutorTip: "María te lance un petit défi. Essaie de répondre avant de regarder les options !",
        questions: [
          { question: "Comment dit-on 'Bonjour' en espagnol (le matin) ?", options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"], correctIndex: 1, explanation: "Buenos días se dit le matin." },
          { question: "Comment dit-on 'Je m'appelle' en espagnol ?", options: ["Me llamo", "Yo soy", "Mi nombre", "Me nommo"], correctIndex: 0, explanation: "Me llamo signifie 'Je m'appelle'." },
        ],
      },
      {
        type: "quiz",
        title: "Quiz final",
        tutorTip: "Dernier test avant de passer à la leçon suivante. Tu gères !",
        questions: [
          { question: "Quelle est la forme correcte pour dire 'Bonjour' l'après-midi ?", options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hola"], correctIndex: 1, explanation: "Buenas tardes se dit l'après-midi." },
          { question: "Complétez : '¿Cómo ___ llamas?'", options: ["te", "me", "se", "le"], correctIndex: 0, explanation: "On dit '¿Cómo te llamas?' pour demander le prénom." },
          { question: "Que signifie 'Mucho gusto' ?", options: ["Au revoir", "Merci beaucoup", "Enchanté", "De rien"], correctIndex: 2, explanation: "Mucho gusto = Enchanté." },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    title: "Verbes réguliers au présent",
    description: "Maîtrisez la conjugaison au présent des verbes réguliers en -ar, -er et -ir.",
    category: "Grammaire",
    cefrLevel: "A1",
    estimatedMinutes: 15,
    tutorId: "diego-vocabulario",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Le présent de l'indicatif est le temps le plus utilisé en espagnol. Vous allez apprendre à conjuguer les trois types de verbes réguliers.",
        tutorTip: "Salut ! Je suis Diego. La grammaire espagnole est logique — une fois que tu connais les terminaisons, tu peux conjuguer des centaines de verbes. C'est comme une recette de cuisine !",
      },
      {
        type: "vocabulary",
        title: "Les terminaisons",
        tutorTip: "Astuce mnémotechnique : -o (yo), -as (tú), -a (él), -amos (nosotros), -an (ellos). Répète 3 fois !",
        items: [
          { word: "Yo -o", translation: "Je -e", pronunciation: "YOH", example: "Yo hablo.", exampleTranslation: "Je parle." },
          { word: "Tú -as/-es/-es", translation: "Tu -es/-es/-is", pronunciation: "TOO", example: "Tú hablas.", exampleTranslation: "Tu parles." },
          { word: "Él/Ella -a/-e/-e", translation: "Il/Elle -e/-e/-it", pronunciation: "EHL/EH-yah", example: "Él habla.", exampleTranslation: "Il parle." },
          { word: "Nosotros -amos/-emos/-imos", translation: "Nous -ons/-ons/-issons", pronunciation: "noh-SOH-trohs", example: "Nosotros hablamos.", exampleTranslation: "Nous parlons." },
          { word: "Ellos/Ellas -an/-en/-en", translation: "Ils/Elles -ent/-ent/-ent", pronunciation: "EH-yohs/EH-yahs", example: "Ellos hablan.", exampleTranslation: "Ils parlent." },
        ],
      },
      {
        type: "vocabulary",
        title: "Verbes -ar (hablar = parler)",
        tutorTip: "Les verbes en -ar sont les plus courants en espagnol. Si tu maîtrises 'hablar', tu as déjà un bon niveau !",
        items: [
          { word: "hablo", translation: "je parle", pronunciation: "AH-bloh", example: "Yo hablo español.", exampleTranslation: "Je parle espagnol." },
          { word: "hablas", translation: "tu parles", pronunciation: "AH-blahs", example: "¿Tú hablas inglés?", exampleTranslation: "Tu parles anglais ?" },
          { word: "habla", translation: "il/elle parle", pronunciation: "AH-blah", example: "Ella habla rápido.", exampleTranslation: "Elle parle vite." },
          { word: "hablamos", translation: "nous parlons", pronunciation: "ah-BLAH-mohs", example: "Nosotros hablamos juntos.", exampleTranslation: "Nous parlons ensemble." },
          { word: "hablan", translation: "ils/elles parlent", pronunciation: "AH-blahn", example: "Ellos hablan fuerte.", exampleTranslation: "Ils parlent fort." },
        ],
      },
      {
        type: "vocabulary",
        title: "Verbes -er (comer = manger)",
        items: [
          { word: "como", translation: "je mange", pronunciation: "KOH-moh", example: "Yo como una manzana.", exampleTranslation: "Je mange une pomme." },
          { word: "comes", translation: "tu manges", pronunciation: "KOH-mehs", example: "¿Tú comes pizza?", exampleTranslation: "Tu manges de la pizza ?" },
          { word: "come", translation: "il/elle mange", pronunciation: "KOH-meh", example: "Él come mucho.", exampleTranslation: "Il mange beaucoup." },
        ],
      },
      {
        type: "vocabulary",
        title: "Verbes -ir (vivir = vivre)",
        items: [
          { word: "vivo", translation: "je vis", pronunciation: "VEE-voh", example: "Yo vivo en Madrid.", exampleTranslation: "Je vis à Madrid." },
          { word: "vives", translation: "tu vis", pronunciation: "VEE-vehs", example: "¿Dónde vives?", exampleTranslation: "Où vis-tu ?" },
          { word: "vive", translation: "il/elle vit", pronunciation: "VEE-veh", example: "Ella vive con su familia.", exampleTranslation: "Elle vit avec sa famille." },
        ],
      },
      {
        type: "exercise",
        title: "Exercice",
        tutorTip: "Diego test ta mémoire. Essaie de conjuguer sans regarder les terminaisons !",
        questions: [
          { question: "Conjuguez 'hablar' pour 'yo' :", options: ["hablas", "hablo", "habla", "hablan"], correctIndex: 1, explanation: "Yo hablo (je parle)." },
          { question: "Conjuguez 'comer' pour 'tú' :", options: ["como", "comes", "come", "comen"], correctIndex: 1, explanation: "Tú comes (tu manges)." },
          { question: "Conjuguez 'vivir' pour 'nosotros' :", options: ["vivo", "vives", "vivimos", "viven"], correctIndex: 2, explanation: "Nosotros vivimos (nous vivons)." },
        ],
      },
      {
        type: "quiz",
        title: "Quiz final",
        questions: [
          { question: "Quelle est la terminaison pour 'yo' avec les verbes -ar ?", options: ["-as", "-o", "-a", "-an"], correctIndex: 1, explanation: "Yo hablo (terminaison -o)." },
          { question: "Conjuguez 'comer' pour 'ellos' :", options: ["como", "comes", "come", "comen"], correctIndex: 3, explanation: "Ellos comen (ils mangent)." },
          { question: "Comment dit-on 'Nous parlons' en espagnol ?", options: ["Nosotros hablas", "Nosotros hablamos", "Nosotros hablan", "Nosotros habla"], correctIndex: 1, explanation: "Nosotros hablamos." },
        ],
      },
    ],
  },
  "3": {
    id: "3",
    title: "Commander au restaurant",
    description: "Apprenez à commander, poser des questions sur les ingrédients et gérer les régimes alimentaires.",
    category: "Conversation",
    cefrLevel: "A2",
    estimatedMinutes: 12,
    tutorId: "maria-conversacion",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Dans cette leçon, vous allez apprendre à commander au restaurant, demander le menu et poser des questions sur les allergènes.",
        tutorTip: "¡Hola amigos! Je suis María. Au restaurant, c'est là qu'on voit si on a vraiment appris la langue. Pas de panique — les serveurs sont toujours patients avec les touristes !",
      },
      {
        type: "vocabulary",
        title: "Vocabulaire du restaurant",
        tutorTip: "En Espagne, on dîne tard — le restaurant est vide à 19h et complet à 22h. Adapte-toi !",
        items: [
          { word: "La cuenta", translation: "L'addition", pronunciation: "lah KWEHN-tah", example: "La cuenta, por favor.", exampleTranslation: "L'addition, s'il vous plaît." },
          { word: "El menú", translation: "Le menu", pronunciation: "el meh-NOO", example: "¿Puedo ver el menú?", exampleTranslation: "Puis-je voir le menu ?" },
          { word: "Pedir", translation: "Commander", pronunciation: "peh-DEER", example: "Quisiera pedir la paella.", exampleTranslation: "Je voudrais commander la paella." },
          { word: "Delicioso", translation: "Délicieux", pronunciation: "deh-lee-see-OH-soh", example: "¡Está delicioso!", exampleTranslation: "C'est délicieux !" },
          { word: "Tengo hambre", translation: "J'ai faim", pronunciation: "TEHN-goh AHM-breh", example: "Tengo mucha hambre.", exampleTranslation: "J'ai très faim." },
          { word: "Tengo sed", translation: "J'ai soif", pronunciation: "TEHN-goh SEHD", example: "¿Qué va a tomar? — Tengo sed.", exampleTranslation: "Qu'est-ce que vous allez prendre ? — J'ai soif." },
        ],
      },
      {
        type: "dialogue",
        title: "Dialogue au restaurant",
        tutorTip: "Regarde : María utilise 'quisiera' (conditionnel) au lieu de 'quiero' (présent). C'est plus poli !",
        dialogue: [
          { speaker: "Serveur", text: "Buenas tardes. ¿Mesa para cuántos?", translation: "Bon après-midi. Table pour combien ?" },
          { speaker: "Client", text: "Mesa para dos, por favor.", translation: "Table pour deux, s'il vous plaît." },
          { speaker: "Serveur", text: "¿Qué desean tomar?", translation: "Qu'est-ce que vous voulez boire ?" },
          { speaker: "Client", text: "Una botella de agua, por favor.", translation: "Une bouteille d'eau, s'il vous plaît." },
          { speaker: "Serveur", text: "¿Ya saben qué van a comer?", translation: "Vous savez ce que vous allez manger ?" },
          { speaker: "Client", text: "Sí, quisiera pedir la paella de mariscos.", translation: "Oui, je voudrais commander la paella aux fruits de mer." },
          { speaker: "Serveur", text: "Excelente elección. ¿Algo más?", translation: "Excellente choix. Autre chose ?" },
          { speaker: "Client", text: "No, por ahora. Gracias.", translation: "Non, pour l'instant. Merci." },
        ],
      },
      {
        type: "exercise",
        title: "Exercice",
        questions: [
          { question: "Comment demandez-vous l'addition ?", options: ["El menú, por favor", "La cuenta, por favor", "Tengo hambre", "Quisiera pedir"], correctIndex: 1, explanation: "La cuenta, por favor = L'addition, s'il vous plaît." },
          { question: "Comment dites-vous 'Je voudrais commander' ?", options: ["Yo quiero comer", "Quisiera pedir", "Necesito la cuenta", "Tengo sed"], correctIndex: 1, explanation: "Quisiera pedir = Je voudrais commander." },
        ],
      },
      {
        type: "quiz",
        title: "Quiz final",
        questions: [
          { question: "Que signifie '¿Qué desean tomar?' ?", options: ["Que voulez-vous manger ?", "Que voulez-vous boire ?", "Où voulez-vous asseoir ?", "Comment allez-vous ?"], correctIndex: 1, explanation: "Tomar = boire (littéralement 'prendre')." },
          { question: "Comment dites-vous 'délicieux' en espagnol ?", options: ["Bueno", "Delicioso", "Rico", "Fresco"], correctIndex: 1, explanation: "Delicioso = délicieux." },
        ],
      },
    ],
  },
  "4": {
    id: "4",
    title: "Vocabulaire de la nourriture",
    description: "Enrichissez votre vocabulaire avec les mots essentiels liés à la nourriture et boissons.",
    category: "Vocabulaire",
    cefrLevel: "A2",
    estimatedMinutes: 8,
    tutorId: "mateo-juegos",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Apprenez les noms courants de nourriture et boissons en espagnol pour vos futures conversations au restaurant.",
        tutorTip: "¡Ey! Je suis Mateo, et aujourd'hui on va bouffer ! Enfin, apprendre les mots de la nourriture. C'est le vocabulaire le plus utile quand tu voyage en Espagne.",
      },
      {
        type: "vocabulary",
        title: "Les aliments",
        tutorTip: "Astuce : 'El pan' (le pain) est sacré en Espagne. On le met partout — même sur le riz !",
        items: [
          { word: "El pan", translation: "Le pain", pronunciation: "el pahn", example: "Quiero pan con mantequilla.", exampleTranslation: "Je veux du pain au beurre." },
          { word: "El arroz", translation: "Le riz", pronunciation: "el ah-ROHS", example: "El arroz está delicioso.", exampleTranslation: "Le riz est délicieux." },
          { word: "La leche", translation: "Le lait", pronunciation: "lah LEH-cheh", example: "Bebo leche por la mañana.", exampleTranslation: "Je bois du lait le matin." },
          { word: "El queso", translation: "Le fromage", pronunciation: "el KEH-soh", example: "Me gusta el queso manchego.", exampleTranslation: "J'aime le fromage manchego." },
          { word: "La fruta", translation: "Les fruits", pronunciation: "lah FROO-tah", example: "Como fruta todos los días.", exampleTranslation: "Je mange des fruits tous les jours." },
          { word: "El café", translation: "Le café", pronunciation: "el kah-FEH", example: "Un café con leche, por favor.", exampleTranslation: "Un café au lait, s'il vous plaît." },
        ],
      },
      {
        type: "exercise",
        title: "Exercice",
        questions: [
          { question: "Comment dit-on 'fromage' en espagnol ?", options: ["El pan", "El queso", "El arroz", "La fruta"], correctIndex: 1, explanation: "El queso = le fromage." },
          { question: "Que signifie 'La fruta' ?", options: ["La farine", "Les fruits", "La viande", "Le poisson"], correctIndex: 1, explanation: "La fruta = les fruits." },
        ],
      },
    ],
  },
  "5": {
    id: "5",
    title: "Demander son chemin",
    description: "Apprenez à demander et comprendre les directions dans une ville.",
    category: "Conversation",
    cefrLevel: "A2",
    estimatedMinutes: 14,
    tutorId: "carmen-business",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Savoir demander son chemin est essentiel quand on voyage. Cette leçon vous apprendra les expressions clés.",
        tutorTip: "Bonjour, je suis Carmen. Savoir se repérer dans une ville, c'est la clé de l'autonomie. En voyage d'affaires, tu n'auras pas toujours quelqu'un pour te guider.",
      },
      {
        type: "vocabulary",
        title: "Vocabulaire de la direction",
        tutorTip: "En Espagne, les adresses sont souvent données en 'cuadras' (pâtés de maisons). Ne confonds pas avec des kilomètres !",
        items: [
          { word: "¿Dónde está...?", translation: "Où est... ?", pronunciation: "DOHN-deh ehs-TAH", example: "¿Dónde está el baño?", exampleTranslation: "Où est la salle de bain ?" },
          { word: "A la derecha", translation: "À droite", pronunciation: "ah lah deh-REH-chah", example: "Gire a la derecha.", exampleTranslation: "Tournez à droite." },
          { word: "A la izquierda", translation: "À gauche", pronunciation: "ah lah ees-KYEHR-dah", example: "La tienda está a la izquierda.", exampleTranslation: "Le magasin est à gauche." },
          { word: "Todo recto", translation: "Tout droit", pronunciation: "TOH-doh RREK-toh", example: "Siga todo recto.", exampleTranslation: "Allez tout droit." },
          { word: "Cerca", translation: "Près", pronunciation: "SEHR-kah", example: "Está cerca del parque.", exampleTranslation: "C'est près du parc." },
          { word: "Lejos", translation: "Loin", pronunciation: "LEH-hohs", example: "Está lejos de aquí.", exampleTranslation: "C'est loin d'ici." },
        ],
      },
      {
        type: "dialogue",
        title: "Demander son chemin",
        dialogue: [
          { speaker: "Touriste", text: "Disculpe, ¿dónde está la estación de tren?", translation: "Excusez-moi, où est la gare ?" },
          { speaker: "Habitant", text: "Siga todo recto, dos cuadras.", translation: "Allez tout droit, deux blocs." },
          { speaker: "Touriste", text: "¿Está lejos?", translation: "C'est loin ?" },
          { speaker: "Habitant", text: "No, está cerca. A la derecha del supermercado.", translation: "Non, c'est près. À droite du supermarché." },
          { speaker: "Touriste", text: "Muchas gracias.", translation: "Merci beaucoup." },
          { speaker: "Habitant", text: "De nada, buen viaje.", translation: "De rien, bon voyage." },
        ],
      },
      {
        type: "exercise",
        title: "Exercice",
        questions: [
          { question: "Comment demandez-vous 'Où est... ?' ?", options: ["¿Qué es...?", "¿Dónde está...?", "¿Cómo es...?", "¿Cuándo es...?"], correctIndex: 1, explanation: "¿Dónde está...? = Où est... ?" },
          { question: "Que signifie 'A la derecha' ?", options: ["À gauche", "En face", "À droite", "Derrière"], correctIndex: 2, explanation: "A la derecha = à droite." },
        ],
      },
    ],
  },
  "6": {
    id: "6",
    title: "Prononciation des voyelles",
    description: "Maîtrisez la prononciation correcte des sons voyelles espagnols.",
    category: "Prononciation",
    cefrLevel: "A1",
    estimatedMinutes: 10,
    tutorId: "sofia-pronunciacion",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "L'espagnol a 5 voyelles qui se prononcent toujours de la même façon. C'est l'une des langues les plus simples pour la prononciation.",
        tutorTip: "¡Hola! Soy Sofía. La prononciation, c'est mon domaine. Les voyelles espagnoles sont pures — pas de diphtongues, pas de sons bizarres. Écoute bien et répète après moi !",
      },
      {
        type: "vocabulary",
        title: "Les 5 voyelles espagnoles",
        tutorTip: "Conseil de Sofía : enregistre-toi et compare ta prononciation avec le modèle. C'est le meilleur moyen de progresser !",
        items: [
          { word: "A", translation: "Comme dans 'pâte'", pronunciation: "ah", example: "Madrid, agua, casa", exampleTranslation: "Madrid, eau, maison" },
          { word: "E", translation: "Comme dans 'léger'", pronunciation: "eh", example: "España, comer, mesa", exampleTranslation: "Espagne, manger, table" },
          { word: "I", translation: "Comme dans 'si'", pronunciation: "ee", example: "Español, vivir, chica", exampleTranslation: "Espagnol, vivre, fille" },
          { word: "O", translation: "Comme dans 'sauf'", pronunciation: "oh", example: "Hola, todo, ojo", exampleTranslation: "Bonjour, tout, œil" },
          { word: "U", translation: "Comme dans 'sucre'", pronunciation: "oo", example: "Uno, usar, luna", exampleTranslation: "Un, utiliser, lune" },
        ],
      },
      {
        type: "exercise",
        title: "Exercice de prononciation",
        questions: [
          { question: "Dans 'Madrid', comment se prononce le 'a' ?", options: ["Comme dans 'chat'", "Comme dans 'pâte'", "Comme dans 'date'", "Comme dans 'art'"], correctIndex: 1, explanation: "Le 'a' espagnol se prononce comme dans 'pâte'." },
          { question: "Dans 'Español', comment se prononce le 'e' ?", options: ["Comme dans 'et'", "Comme dans 'léger'", "Comme dans 'être'", "Comme dans 'je'"], correctIndex: 1, explanation: "Le 'e' espagnol se prononce comme dans 'léger'." },
        ],
      },
    ],
  },
  "7": {
    id: "7",
    title: "Préparation DELE A1",
    description: "Entraînez-vous avec des questions type examen pour la certification DELE A1.",
    category: "Examen",
    cefrLevel: "A1",
    estimatedMinutes: 20,
    tutorId: "carmen-business",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Le DELE A1 certifie que vous pouvez communiquer de manière basique. Cette leçon vous prépare avec des exercices types.",
        tutorTip: "Je suis Carmen. Le DELE A1, c'est ton premier ticket pour travailler dans un pays hispanophone. On va travailler sérieusement — pas de raccourcis !",
      },
      {
        type: "quiz",
        title: "Quiz DELE A1 - Partie 1",
        tutorTip: "Conseil Carmen : lis bien chaque question avant de répondre. En examen, les pièges sont subtils.",
        questions: [
          { question: "Quelle est la traduction de 'El libro' ?", options: ["Le stylo", "Le livre", "La table", "La chaise"], correctIndex: 1, explanation: "El libro = le livre." },
          { question: "Complétez : 'Yo ___ estudiante'", options: ["soy", "eres", "es", "somos"], correctIndex: 0, explanation: "Yo soy estudiante = Je suis étudiant." },
          { question: "Que signifie '¿Cuántos años tienes?' ?", options: ["Combien as-tu d'années ?", "Quelle heure est-il ?", "Où habites-tu ?", "Comment t'appelles-tu ?"], correctIndex: 0, explanation: "Combien as-tu d'années ? = Quel âge as-tu ?" },
        ],
      },
      {
        type: "quiz",
        title: "Quiz DELE A1 - Partie 2",
        questions: [
          { question: "Quelle est la négation correcte de 'Hablo inglés' ?", options: ["No hablo inglés", "No hablo no inglés", "Hablo no inglés", "Nunca hablo inglés"], correctIndex: 0, explanation: "On ajoute 'no' avant le verbe : No hablo inglés." },
          { question: "Que signifie 'Me gustan los animales' ?", options: ["Je n'aime pas les animaux", "J'aime les animaux", "Je crains les animaux", "Je veux des animaux"], correctIndex: 1, explanation: "Me gustan = J'aime (pluriel)." },
        ],
      },
    ],
  },
  "8": {
    id: "8",
    title: "Introduction au passé",
    description: "Apprenez les bases de la conjugaison au passé en espagnol.",
    category: "Grammaire",
    cefrLevel: "A2",
    estimatedMinutes: 15,
    tutorId: "diego-vocabulario",
    language: "es",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Le passé composé (pretérito indefinido) permet de parler d'actions passées. C'est un temps essentiel à maîtriser.",
        tutorTip: "Re-bonjour ! C'est encore Diego. Le passé composé, c'est le temps de l'action terminée. 'Ayer hablé' = 'Hier j'ai parlé'. Simple, non ?",
      },
      {
        type: "vocabulary",
        title: "Passé des verbes -ar",
        tutorTip: "Astuce : le passé des verbes -ar utilise -é, -aste, -ó, -amos, -aron. C'est régulier — pas de surprises !",
        items: [
          { word: "hablé", translation: "j'ai parlé", pronunciation: "ah-BLEH", example: "Ayer hablé con María.", exampleTranslation: "Hier j'ai parlé avec María." },
          { word: "hablaste", translation: "tu as parlé", pronunciation: "ah-BLAHS-teh", example: "¿Hablaste con el profesor?", exampleTranslation: "As-tu parlé au professeur ?" },
          { word: "habló", translation: "il/elle a parlé", pronunciation: "ah-BLOH", example: "Ella habló mucho.", exampleTranslation: "Elle a beaucoup parlé." },
        ],
      },
      {
        type: "vocabulary",
        title: "Passé des verbes -er/-ir",
        items: [
          { word: "comí", translation: "j'ai mangé", pronunciation: "koh-MEE", example: "Ayer comí paella.", exampleTranslation: "Hier j'ai mangé de la paella." },
          { word: "viví", translation: "j'ai vécu", pronunciation: "vee-VEE", example: "Viví en España dos años.", exampleTranslation: "J'ai vécu en Espagne deux ans." },
        ],
      },
      {
        type: "exercise",
        title: "Exercice",
        questions: [
          { question: "Conjuguez 'hablar' au passé pour 'yo' :", options: ["hablé", "hablaba", "hablaré", "hablo"], correctIndex: 0, explanation: "Yo hablé (j'ai parlé)." },
          { question: "Conjuguez 'comer' au passé pour 'yo' :", options: ["como", "comí", "comía", "comeré"], correctIndex: 1, explanation: "Yo comí (j'ai mangé)." },
        ],
      },
      {
        type: "quiz",
        title: "Quiz final",
        questions: [
          { question: "Comment dit-on 'Hier j'ai parlé' en espagnol ?", options: ["Ayer hablo", "Ayer hablé", "Ayer hablaba", "Ayer hablaré"], correctIndex: 1, explanation: "Ayer hablé = Hier j'ai parlé." },
          { question: "Quel temps utilisez-vous pour 'Ayer comí paella' ?", options: ["Présent", "Passé composé", "Imparfait", "Futur"], correctIndex: 1, explanation: "C'est le passé composé (pretérito indefinido)." },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ENGLISH LESSONS
  // ══════════════════════════════════════════════════════════════

  "en-0": {
    id: "en-0",
    title: "English for Absolute Beginners",
    description: "Learn the alphabet, numbers, basic greetings, and practical conversations — no prior English needed.",
    category: "Conversation",
    cefrLevel: "A1",
    estimatedMinutes: 15,
    tutorId: "aria",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Welcome to English!",
        content: "This lesson is for complete beginners. We'll start from zero: the alphabet, basic numbers, greetings, and simple conversations you'll use every day.",
        tutorTip: "Hi there! I'm Aria, your English teacher. No worries if you've never spoken English before — everyone starts somewhere. Let's take this step by step together!",
      },
      {
        type: "vocabulary",
        title: "The English Alphabet",
        tutorTip: "English has 26 letters. Listen carefully to the pronunciation — some sound different from French!",
        items: [
          { word: "A", translation: "La", pronunciation: "ey", example: "A is for Apple.", exampleTranslation: "A pour Pomme." },
          { word: "B", translation: "Be", pronunciation: "bee", example: "B is for Book.", exampleTranslation: "B pour Livre." },
          { word: "C", translation: "Cé", pronunciation: "see", example: "C is for Cat.", exampleTranslation: "C pour Chat." },
          { word: "D", translation: "Dé", pronunciation: "dee", example: "D is for Dog.", exampleTranslation: "D pour Chien." },
          { word: "E", translation: "E", pronunciation: "ee", example: "E is for Elephant.", exampleTranslation: "E pour Éléphant." },
          { word: "F", translation: "Eff", pronunciation: "ef", example: "F is for Fish.", exampleTranslation: "F pour Poisson." },
          { word: "G", translation: "Gé", pronunciation: "jee", example: "G is for Girl.", exampleTranslation: "G pour Fille." },
          { word: "H", translation: "Hache", pronunciation: "eytch", example: "H is for House.", exampleTranslation: "H pour Maison." },
        ],
      },
      {
        type: "vocabulary",
        title: "Numbers 1-10",
        tutorTip: "These are the most important numbers. Practice saying them out loud!",
        items: [
          { word: "One", translation: "Un", pronunciation: "wun", example: "I have one cat.", exampleTranslation: "J'ai un chat." },
          { word: "Two", translation: "Deux", pronunciation: "too", example: "There are two books.", exampleTranslation: "Il y a deux livres." },
          { word: "Three", translation: "Trois", pronunciation: "three", example: "Three coffees, please.", exampleTranslation: "Trois cafés, s'il vous plaît." },
          { word: "Four", translation: "Quatre", pronunciation: "for", example: "Four apples.", exampleTranslation: "Quatre pommes." },
          { word: "Five", translation: "Cinq", pronunciation: "fye", example: "Five minutes.", exampleTranslation: "Cinq minutes." },
          { word: "Six", translation: "Six", pronunciation: "siks", example: "Six people.", exampleTranslation: "Six personnes." },
          { word: "Seven", translation: "Sept", pronunciation: "SEH-vun", example: "Seven days in a week.", exampleTranslation: "Sept jours dans une semaine." },
          { word: "Eight", translation: "Huit", pronunciation: "eyt", example: "Eight o'clock.", exampleTranslation: "Huit heures." },
          { word: "Nine", translation: "Neuf", pronunciation: "nyne", example: "Nine months.", exampleTranslation: "Neuf mois." },
          { word: "Ten", translation: "Dix", pronunciation: "ten", example: "Ten years old.", exampleTranslation: "Dix ans." },
        ],
      },
      {
        type: "vocabulary",
        title: "Basic Greetings",
        tutorTip: "These are the phrases you'll use every day. Master them first!",
        items: [
          { word: "Hello", translation: "Bonjour", pronunciation: "heh-LOH", example: "Hello! How are you?", exampleTranslation: "Bonjour ! Comment vas-tu ?" },
          { word: "Good morning", translation: "Bonjour (matin)", pronunciation: "good MOR-ning", example: "Good morning, everyone.", exampleTranslation: "Bonjour à tous." },
          { word: "Good evening", translation: "Bonsoir", pronunciation: "good EE-ving", example: "Good evening, nice to meet you.", exampleTranslation: "Bonsoir, enchanté." },
          { word: "Goodbye", translation: "Au revoir", pronunciation: "good-BY", example: "Goodbye, see you tomorrow.", exampleTranslation: "Au revoir, à demain." },
          { word: "Please", translation: "S'il vous plaît", pronunciation: "pleez", example: "Water, please.", exampleTranslation: "De l'eau, s'il vous plaît." },
          { word: "Thank you", translation: "Merci", pronunciation: "thank yoo", example: "Thank you very much.", exampleTranslation: "Merci beaucoup." },
          { word: "Sorry", translation: "Pardon", pronunciation: "SOR-ee", example: "Sorry, I don't understand.", exampleTranslation: "Pardon, je ne comprends pas." },
          { word: "Excuse me", translation: "Excusez-moi", pronunciation: "ik-SKYOOZ mee", example: "Excuse me, where is the bathroom?", exampleTranslation: "Excusez-moi, où sont les toilettes ?" },
        ],
      },
      {
        type: "vocabulary",
        title: "Introducing Yourself",
        tutorTip: "These phrases help you meet new people. Start with 'My name is...'!",
        items: [
          { word: "My name is...", translation: "Je m'appelle...", pronunciation: "my name iz", example: "My name is Ahmed.", exampleTranslation: "Je m'appelle Ahmed." },
          { word: "I am from...", translation: "Je viens de...", pronunciation: "eye am from", example: "I am from Senegal.", exampleTranslation: "Je viens du Sénégal." },
          { word: "How are you?", translation: "Comment vas-tu ?", pronunciation: "how ar yoo", example: "Hi, how are you?", exampleTranslation: "Salut, comment vas-tu ?" },
          { word: "I'm fine, thank you", translation: "Je vais bien, merci", pronunciation: "eye-um fyn thank yoo", example: "I'm fine, thank you. And you?", exampleTranslation: "Je vais bien, merci. Et toi ?" },
          { word: "Nice to meet you", translation: "Enchanté(e)", pronunciation: "nys to meet yoo", example: "Nice to meet you, I'm Fatou.", exampleTranslation: "Enchanté, je suis Fatou." },
          { word: "See you later", translation: "À plus tard", pronunciation: "see yoo LAY-ter", example: "See you later, bye!", exampleTranslation: "À plus tard, au revoir !" },
        ],
      },
      {
        type: "dialogue",
        title: "Basic Conversation",
        tutorTip: "Practice this dialogue with a friend. Start slow, then speed up!",
        dialogue: [
          { speaker: "Aria", text: "Hello! My name is Aria. What's your name?", translation: "Bonjour ! Je m'appelle Aria. Comment t'appelles-tu ?" },
          { speaker: "You", text: "Hello! My name is Fatou.", translation: "Bonjour ! Je m'appelle Fatou." },
          { speaker: "Aria", text: "Nice to meet you, Fatou. How are you?", translation: "Enchanté, Fatou. Comment vas-tu ?" },
          { speaker: "You", text: "I'm fine, thank you. And you?", translation: "Je vais bien, merci. Et toi ?" },
          { speaker: "Aria", text: "I'm great, thanks! Where are you from?", translation: "Je vais très bien, merci ! D'où viens-tu ?" },
          { speaker: "You", text: "I am from Senegal.", translation: "Je viens du Sénégal." },
          { speaker: "Aria", text: "That's wonderful! See you later, Fatou.", translation: "C'est merveilleux ! À plus tard, Fatou." },
          { speaker: "You", text: "Goodbye, Aria! Thank you.", translation: "Au revoir, Aria ! Merci." },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Quick check! Try to answer before looking at the options.",
        questions: [
          { question: "How do you say 'Bonjour' in English (in the morning)?", options: ["Good night", "Good morning", "Good afternoon", "Hello"], correctIndex: 1, explanation: "Good morning is used in the morning." },
          { question: "How do you say 'Merci' in English?", options: ["Please", "Sorry", "Thank you", "Hello"], correctIndex: 2, explanation: "Thank you = Merci." },
          { question: "How do you say 'Je m'appelle' in English?", options: ["My name is", "I am", "My name", "I'm called"], correctIndex: 0, explanation: "My name is = Je m'appelle." },
          { question: "What number is 'Five'?", options: ["Trois", "Quatre", "Cinq", "Six"], correctIndex: 2, explanation: "Five = Cinq." },
        ],
      },
      {
        type: "quiz",
        title: "Final Quiz",
        tutorTip: "Final challenge! You've learned the basics. Congrats!",
        questions: [
          { question: "How do you say 'Au revoir' in English?", options: ["Hello", "Goodbye", "Thank you", "Please"], correctIndex: 1, explanation: "Goodbye = Au revoir." },
          { question: "What does 'I am from Senegal' mean?", options: ["Je suis au Sénégal", "Je viens du Sénégal", "J'habite au Sénégal", "Je vais au Sénégal"], correctIndex: 1, explanation: "I am from = Je viens de." },
          { question: "How do you ask someone's name?", options: ["How are you?", "Where are you from?", "What's your name?", "How old are you?"], correctIndex: 2, explanation: "What's your name? = Comment t'appelles-tu ?" },
          { question: "Complete: 'I ___ fine, thank you.'", options: ["am", "is", "are", "be"], correctIndex: 0, explanation: "I am fine." },
        ],
      },
    ],
  },
  "en-1": {
    id: "en-1",
    title: "Greetings & Introductions",
    description: "Learn how to greet people and introduce yourself in English.",
    category: "Conversation",
    cefrLevel: "A1",
    estimatedMinutes: 10,
    tutorId: "aria",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "In this lesson, you will learn how to say hello, introduce yourself, and have a basic conversation in English.",
        tutorTip: "Hi there! I'm Aria, your guide for this lesson. Greetings are the gateway to any conversation. Master them, and you can talk to anyone!",
      },
      {
        type: "vocabulary",
        title: "Vocabulary",
        tutorTip: "Listen carefully to the pronunciation. English has many vowel sounds — take your time!",
        items: [
          { word: "Hello", translation: "Bonjour", pronunciation: "heh-LOH", example: "Hello! How are you?", exampleTranslation: "Bonjour ! Comment vas-tu ?" },
          { word: "Good morning", translation: "Bonjour (matin)", pronunciation: "good MOR-ning", example: "Good morning, everyone.", exampleTranslation: "Bonjour à tous." },
          { word: "Good afternoon", translation: "Bon après-midi", pronunciation: "good AF-ter-noon", example: "Good afternoon, how can I help you?", exampleTranslation: "Bon après-midi, comment puis-je vous aider ?" },
          { word: "Good evening", translation: "Bonsoir", pronunciation: "good EE-ving", example: "Good evening, nice to meet you.", exampleTranslation: "Bonsoir, enchanté." },
          { word: "My name is...", translation: "Je m'appelle...", pronunciation: "my name iz", example: "My name is John.", exampleTranslation: "Je m'appelle John." },
          { word: "What's your name?", translation: "Comment t'appelles-tu ?", pronunciation: "wots your neym", example: "Hi, what's your name? — My name is Sarah.", exampleTranslation: "Salut, comment t'appelles-tu ? — Je m'appelle Sarah." },
          { word: "Nice to meet you", translation: "Enchanté(e)", pronunciation: "nys to meet you", example: "Nice to meet you, I'm David.", exampleTranslation: "Enchanté, je suis David." },
          { word: "Goodbye", translation: "Au revoir", pronunciation: "good-BY", example: "Goodbye, see you tomorrow.", exampleTranslation: "Au revoir, à demain." },
        ],
      },
      {
        type: "dialogue",
        title: "Dialogue",
        tutorTip: "Watch how they go from formal to casual. In English, 'How are you?' is often just a greeting — not a real question!",
        dialogue: [
          { speaker: "Aria", text: "Hello! Good morning.", translation: "Bonjour ! Bonjour (matin)." },
          { speaker: "James", text: "Hello! Good morning. What's your name?", translation: "Bonjour ! Bonjour. Comment t'appelles-tu ?" },
          { speaker: "Aria", text: "My name is Aria. And you?", translation: "Je m'appelle Aria. Et toi ?" },
          { speaker: "James", text: "My name is James. Nice to meet you, Aria.", translation: "Je m'appelle James. Enchanté, Aria." },
          { speaker: "Aria", text: "Nice to meet you too, James. How are you?", translation: "Moi aussi, enchanté James. Comment vas-tu ?" },
          { speaker: "James", text: "I'm great, thank you. And you?", translation: "Je vais bien, merci. Et toi ?" },
          { speaker: "Aria", text: "I'm wonderful, thanks!", translation: "Je vais merveilleusement, merci !" },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Quick check! Try to answer before looking at the options.",
        questions: [
          { question: "How do you say 'Bonjour' in English (in the morning)?", options: ["Good night", "Good morning", "Good afternoon", "Hello"], correctIndex: 1, explanation: "Good morning is used in the morning." },
          { question: "How do you say 'Je m'appelle' in English?", options: ["My name is", "I am", "My name", "I'm called"], correctIndex: 0, explanation: "My name is = Je m'appelle." },
        ],
      },
      {
        type: "quiz",
        title: "Final Quiz",
        tutorTip: "Last test before moving on. You got this!",
        questions: [
          { question: "What is the correct way to say 'Bonjour' in the afternoon?", options: ["Good night", "Good afternoon", "Good morning", "Hello"], correctIndex: 1, explanation: "Good afternoon is used in the afternoon." },
          { question: "Complete: 'What's ___ name?'", options: ["your", "my", "his", "her"], correctIndex: 0, explanation: "We say 'What's your name?' to ask someone's name." },
          { question: "What does 'Nice to meet you' mean?", options: ["Au revoir", "Merci beaucoup", "Enchanté", "De rien"], correctIndex: 2, explanation: "Nice to meet you = Enchanté." },
        ],
      },
    ],
  },
  "en-2": {
    id: "en-2",
    title: "Present Simple Tense",
    description: "Master the present simple tense for daily routines and facts.",
    category: "Grammar",
    cefrLevel: "A1",
    estimatedMinutes: 15,
    tutorId: "james",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "The present simple tense is the most used tense in English. You will learn to form positive sentences, negatives, and questions.",
        tutorTip: "Hello! I'm James, your grammar guide. English grammar is simpler than French — no conjugations to memorize! Just add -s for he/she/it.",
      },
      {
        type: "vocabulary",
        title: "Subject Pronouns",
        tutorTip: "Memorize these first. They're the building blocks of every sentence!",
        items: [
          { word: "I", translation: "Je", pronunciation: "eye", example: "I am a student.", exampleTranslation: "Je suis étudiant." },
          { word: "You", translation: "Tu/Vous", pronunciation: "yoo", example: "You are very kind.", exampleTranslation: "Tu es très gentil." },
          { word: "He/She/It", translation: "Il/Elle", pronunciation: "hee/sheh/it", example: "She is my friend.", exampleTranslation: "Elle est mon amie." },
          { word: "We", translation: "Nous", pronunciation: "wee", example: "We are happy.", exampleTranslation: "Nous sommes heureux." },
          { word: "They", translation: "Ils/Elles", pronunciation: "they", example: "They are from Paris.", exampleTranslation: "Ils viennent de Paris." },
        ],
      },
      {
        type: "vocabulary",
        title: "Regular Verbs",
        tutorTip: "Only add -s for he/she/it. All other subjects use the base form.",
        items: [
          { word: "I work", translation: "Je travaille", pronunciation: "eye wuhk", example: "I work every day.", exampleTranslation: "Je travaille tous les jours." },
          { word: "You work", translation: "Tu travailles", pronunciation: "yoo wuhk", example: "You work too much.", exampleTranslation: "Tu travailles trop." },
          { word: "He works", translation: "Il travaille", pronunciation: "hee wuhks", example: "He works at a bank.", exampleTranslation: "Il travaille dans une banque." },
          { word: "We live", translation: "Nous vivons", pronunciation: "wee liv", example: "We live in London.", exampleTranslation: "Nous vivons à Londres." },
          { word: "They speak", translation: "Ils parlent", pronunciation: "they speak", example: "They speak English.", exampleTranslation: "Ils parlent anglais." },
        ],
      },
      {
        type: "vocabulary",
        title: "Negatives & Questions",
        tutorTip: "For negatives, add 'don't' before the verb. For questions, move 'Do' to the start.",
        items: [
          { word: "I don't work", translation: "Je ne travaille pas", pronunciation: "eye dont wuhk", example: "I don't work on Sundays.", exampleTranslation: "Je ne travaille pas le dimanche." },
          { word: "He doesn't work", translation: "Il ne travaille pas", pronunciation: "hee duh-znt wuhk", example: "He doesn't speak French.", exampleTranslation: "Il ne parle pas français." },
          { word: "Do you work?", translation: "Travailles-tu ?", pronunciation: "do yoo wuhk", example: "Do you work here?", exampleTranslation: "Travailles-tu ici ?" },
          { word: "Does he work?", translation: "Travaille-t-il ?", pronunciation: "duh-z hee wuhk", example: "Does he work on Mondays?", exampleTranslation: "Travaille-t-il le lundi ?" },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "James challenges you. Try to answer without looking!",
        questions: [
          { question: "Conjugate 'work' for 'he' :", options: ["work", "works", "working", "worked"], correctIndex: 1, explanation: "He works (with -s)." },
          { question: "Form the negative: 'I ___ like coffee'", options: ["don't", "doesn't", "am not", "not"], correctIndex: 0, explanation: "I don't like = Je n'aime pas." },
          { question: "Form the question: '___ you speak English?'", options: ["Are", "Do", "Is", "Does"], correctIndex: 1, explanation: "Do you speak English?" },
        ],
      },
      {
        type: "quiz",
        title: "Final Quiz",
        tutorTip: "Final challenge. Pay attention to -s rules!",
        questions: [
          { question: "Which is correct for 'she'?", options: ["She work", "She works", "She working", "She workes"], correctIndex: 1, explanation: "She works (add -s for he/she/it)." },
          { question: "Complete: 'They ___ from Canada.'", options: ["is", "are", "am", "be"], correctIndex: 1, explanation: "They are from Canada." },
          { question: "What does 'He doesn't play' mean?", options: ["Il joue", "Il ne joue pas", "Il jouera", "Il a joué"], correctIndex: 1, explanation: "He doesn't play = Il ne joue pas." },
        ],
      },
],
  },
  "en-3": {
    id: "en-3",
    title: "Ordering Food & Drinks",
    description: "Practice ordering at restaurants and cafes in English.",
    category: "Conversation",
    cefrLevel: "A1",
    estimatedMinutes: 12,
    tutorId: "kenji",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "In this lesson, you will learn how to order food and drinks, ask about ingredients, and handle special requests at a restaurant.",
        tutorTip: "Hey! I'm Sofia. Ordering food is one of the most useful skills when traveling. Don't be shy — servers are always happy to help!",
      },
      {
        type: "vocabulary",
        title: "Restaurant Vocabulary",
        tutorTip: "In English-speaking countries, 'tip' (pourboire) is expected — usually 15-20%!",
        items: [
          { word: "The bill/check", translation: "L'addition", pronunciation: "thee bil/chek", example: "Can I have the bill, please?", exampleTranslation: "L'addition, s'il vous plaît." },
          { word: "The menu", translation: "Le menu", pronunciation: "thee MEN-yoo", example: "Can I see the menu?", exampleTranslation: "Puis-je voir le menu ?" },
          { word: "To order", translation: "Commander", pronunciation: "toh OR-der", example: "I'd like to order, please.", exampleTranslation: "Je voudrais commander, s'il vous plaît." },
          { word: "Delicious", translation: "Délicieux", pronunciation: "deh-LISH-us", example: "This is delicious!", exampleTranslation: "C'est délicieux !" },
          { word: "I'm hungry", translation: "J'ai faim", pronunciation: "eye-um HUN-gree", example: "I'm very hungry.", exampleTranslation: "J'ai très faim." },
          { word: "I'm thirsty", translation: "J'ai soif", pronunciation: "eye-um THUR-stee", example: "I'm thirsty. What do you have?", exampleTranslation: "J'ai soif. Qu'est-ce que vous avez ?" },
        ],
      },
      {
        type: "dialogue",
        title: "Restaurant Dialogue",
        tutorTip: "Notice how 'Could I...' is more polite than 'I want...'. Politeness matters!",
        dialogue: [
          { speaker: "Waiter", text: "Good evening. Table for two?", translation: "Bonsoir. Table pour deux ?" },
          { speaker: "Customer", text: "Yes, a table for two, please.", translation: "Oui, une table pour deux, s'il vous plaît." },
          { speaker: "Waiter", text: "Here are your menus. What would you like to drink?", translation: "Voici vos menus. Qu'est-ce que vous voudriez boire ?" },
          { speaker: "Customer", text: "A bottle of water, please.", translation: "Une bouteille d'eau, s'il vous plaît." },
          { speaker: "Waiter", text: "Are you ready to order food?", translation: "Êtes-vous prêts à commander ?" },
          { speaker: "Customer", text: "Yes, I'd like the grilled chicken, please.", translation: "Oui, je voudrais le poulet grillé, s'il vous plaît." },
          { speaker: "Waiter", text: "Excellent choice. Anything else?", translation: "Excellente choix. Autre chose ?" },
          { speaker: "Customer", text: "No, that's all for now. Thank you.", translation: "Non, c'est tout pour l'instant. Merci." },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Sofia tests you! Try to answer before looking at the options.",
        questions: [
          { question: "How do you ask for the bill?", options: ["The menu, please", "The bill, please", "I'm hungry", "I'd like to order"], correctIndex: 1, explanation: "The bill, please = L'addition, s'il vous plaît." },
          { question: "How do you say 'Je voudrais commander'?", options: ["I want to order", "I'd like to order", "I need the bill", "I'm thirsty"], correctIndex: 1, explanation: "I'd like to order = Je voudrais commander (more polite)." },
        ],
      },
      {
        type: "quiz",
        title: "Final Quiz",
        tutorTip: "Last round! Remember: politeness is key in English.",
        questions: [
          { question: "What does 'What would you like to drink?' mean?", options: ["Que voulez-vous manger ?", "Que voulez-vous boire ?", "Où voulez-vous asseoir ?", "Comment allez-vous ?"], correctIndex: 1, explanation: "Drink = boire." },
          { question: "How do you say 'délicieux' in English?", options: ["Good", "Delicious", "Tasty", "Fresh"], correctIndex: 1, explanation: "Delicious = délicieux." },
        ],
      },
    ],
  },
  "en-4": {
    id: "en-4",
    title: "Numbers & Counting",
    description: "Learn numbers, prices, and how to count in English.",
    category: "Vocabulary",
    cefrLevel: "A1",
    estimatedMinutes: 8,
    tutorId: "kenji",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Learn the essential numbers from 1 to 100 and how to use them in everyday situations like shopping and giving your phone number.",
        tutorTip: "Hi! I'm Kenji. Numbers are the foundation of communication. Once you master them, shopping and phone calls become easy!",
      },
      {
        type: "vocabulary",
        title: "Numbers 1-20",
        tutorTip: "English numbers are irregular up to 20. After that, they follow a pattern!",
        items: [
          { word: "one", translation: "un", pronunciation: "wun", example: "I have one brother.", exampleTranslation: "J'ai un frère." },
          { word: "two", translation: "deux", pronunciation: "too", example: "There are two cats.", exampleTranslation: "Il y a deux chats." },
          { word: "three", translation: "trois", pronunciation: "three", example: "Three coffees, please.", exampleTranslation: "Trois cafés, s'il vous plaît." },
          { word: "five", translation: "cinq", pronunciation: "fye", example: "Five minutes left.", exampleTranslation: "Il reste cinq minutes." },
          { word: "ten", translation: "dix", pronunciation: "ten", example: "I'm ten years old.", exampleTranslation: "J'ai dix ans." },
          { word: "twenty", translation: "vingt", pronunciation: "TWEHN-tee", example: "It costs twenty dollars.", exampleTranslation: "Ça coûte vingt dollars." },
        ],
      },
      {
        type: "vocabulary",
        title: "Numbers 20-100",
        tutorTip: "Pattern: twenty-one, twenty-two... thirty, forty, fifty... Easy!",
        items: [
          { word: "thirty", translation: "trente", pronunciation: "THUR-tee", example: "She is thirty years old.", exampleTranslation: "Elle a trente ans." },
          { word: "forty", translation: "quarante", pronunciation: "FOR-tee", example: "Forty students in the class.", exampleTranslation: "Quarante étudiants dans la classe." },
          { word: "fifty", translation: "cinquante", pronunciation: "FIF-tee", example: "Fifty percent off!", exampleTranslation: "Cinquante pour cent de réduction !" },
          { word: "hundred", translation: "cent", pronunciation: "HUN-dred", example: "One hundred people came.", exampleTranslation: "Cent personnes sont venues." },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Kenji's challenge: count without looking!",
        questions: [
          { question: "How do you say 'trois' in English?", options: ["two", "three", "thirty", "twelve"], correctIndex: 1, explanation: "Three = trois." },
          { question: "How do you say 'cinquante' in English?", options: ["fifteen", "fifty", "five", "fifth"], correctIndex: 1, explanation: "Fifty = cinquante." },
        ],
      },
    ],
  },
  "en-5": {
    id: "en-5",
    title: "Past Simple Tense",
    description: "Talk about past events and experiences.",
    category: "Grammar",
    cefrLevel: "A2",
    estimatedMinutes: 15,
    tutorId: "james",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "The past simple tense allows you to talk about completed actions in the past. It's essential for storytelling and sharing experiences.",
        tutorTip: "James here again! The past simple is your best friend for talking about holidays, childhood, and last weekend. Let's learn the rules!",
      },
      {
        type: "vocabulary",
        title: "Regular Past Tense (-ed)",
        tutorTip: "Most verbs just add -ed. But watch out for spelling rules: study → studied, play → played.",
        items: [
          { word: "I worked", translation: "J'ai travaillé", pronunciation: "eye wuhkt", example: "I worked yesterday.", exampleTranslation: "J'ai travaillé hier." },
          { word: "You studied", translation: "Tu as étudié", pronunciation: "yoo STU-deed", example: "You studied very hard.", exampleTranslation: "Tu as beaucoup étudié." },
          { word: "She played", translation: "Elle a joué", pronunciation: "sheh playd", example: "She played tennis yesterday.", exampleTranslation: "Elle a joué au tennis hier." },
          { word: "We watched", translation: "Nous avons regardé", pronunciation: "wee wotcht", example: "We watched a movie.", exampleTranslation: "Nous avons regardé un film." },
          { word: "They visited", translation: "Ils ont visité", pronunciation: "they VIH-ziht-ed", example: "They visited London.", exampleTranslation: "Ils ont visité Londres." },
        ],
      },
      {
        type: "vocabulary",
        title: "Irregular Past Tense",
        tutorTip: "These don't follow rules — you just have to memorize them. But don't worry, the most common ones are only about 20!",
        items: [
          { word: "went (go)", translation: "suis allé(e)", pronunciation: "went", example: "I went to the store.", exampleTranslation: "Je suis allé au magasin." },
          { word: "ate (eat)", translation: "ai mangé", pronunciation: "eyt", example: "We ate pizza last night.", exampleTranslation: "Nous avons mangé de la pizza hier soir." },
          { word: "had (have)", translation: "ai eu", pronunciation: "had", example: "She had a great time.", exampleTranslation: "Elle a passé un bon moment." },
          { word: "said (say)", translation: "ai dit", pronunciation: "sed", example: "He said hello.", exampleTranslation: "Il a dit bonjour." },
          { word: "made (make)", translation: "ai fait", pronunciation: "meyd", example: "I made a cake.", exampleTranslation: "J'ai fait un gâteau." },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Test your memory! Regular or irregular?",
        questions: [
          { question: "What is the past of 'work'?", options: ["workt", "worked", "working", "works"], correctIndex: 1, explanation: "Regular verb: work → worked." },
          { question: "What is the past of 'go'?", options: ["goed", "went", "goed", "goned"], correctIndex: 1, explanation: "Irregular: go → went." },
          { question: "What is the past of 'eat'?", options: ["eated", "eat", "ate", "eating"], correctIndex: 2, explanation: "Irregular: eat → ate." },
        ],
      },
      {
        type: "quiz",
        title: "Final Quiz",
        tutorTip: "James' final test. Focus on irregular verbs!",
        questions: [
          { question: "Complete: 'Yesterday I ___ to the park.'", options: ["go", "went", "going", "goed"], correctIndex: 1, explanation: "Went = passé de go." },
          { question: "What does 'She visited Paris' mean?", options: ["Elle visite Paris", "Elle a visité Paris", "Elle visite Paris demain", "Elle visite souvent Paris"], correctIndex: 1, explanation: "Visited = a visité (passé)." },
        ],
      },
    ],
  },
  "en-6": {
    id: "en-6",
    title: "Travel Vocabulary",
    description: "Essential vocabulary for traveling in English-speaking countries.",
    category: "Vocabulary",
    cefrLevel: "A2",
    estimatedMinutes: 10,
    tutorId: "emma",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Master the essential vocabulary for traveling: airport, hotel, directions, and transportation.",
        tutorTip: "Hey! I'm Emma, your travel buddy. I've been to 40+ countries, and I can tell you: these words will save your life at the airport!",
      },
      {
        type: "vocabulary",
        title: "Airport Vocabulary",
        tutorTip: "At the airport, always listen for 'gate' (porte) and 'boarding time' (heure d'embarquement).",
        items: [
          { word: "Boarding pass", translation: "Carte d'embarquement", pronunciation: "BOR-ding pass", example: "Here's my boarding pass.", exampleTranslation: "Voici ma carte d'embarquement." },
          { word: "Gate", translation: "Porte", pronunciation: "geyt", example: "The gate is B12.", exampleTranslation: "La porte est B12." },
          { word: "Luggage", translation: "Bagages", pronunciation: "LUH-gij", example: "Where can I get my luggage?", exampleTranslation: "Où puis-je récupérer mes bagages ?" },
          { word: "Flight", translation: "Vol", pronunciation: "flyt", example: "My flight is at 3 PM.", exampleTranslation: "Mon vol est à 15h." },
          { word: "Customs", translation: "Douane", pronunciation: "KUH-stumz", example: "You need to go through customs.", exampleTranslation: "Vous devez passer par la douane." },
        ],
      },
      {
        type: "vocabulary",
        title: "Hotel Vocabulary",
        tutorTip: "Key phrase: 'I have a reservation under the name...' — they'll understand immediately!",
        items: [
          { word: "Reservation", translation: "Réservation", pronunciation: "reh-zur-VAY-shun", example: "I have a reservation under Smith.", exampleTranslation: "J'ai une réservation au nom de Smith." },
          { word: "Room key", translation: "Clé de chambre", pronunciation: "room kee", example: "Can I have my room key?", exampleTranslation: "Puis-je avoir la clé de ma chambre ?" },
          { word: "Check out", translation: "Départ", pronunciation: "chek out", example: "What time is check out?", exampleTranslation: "À quelle heure est le départ ?" },
          { word: "Wi-Fi", translation: "Wi-Fi", pronunciation: "WY-fye", example: "Is there Wi-Fi in the room?", exampleTranslation: "Y a-t-il du Wi-Fi dans la chambre ?" },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Emma's travel quiz! How well do you know airport vocabulary?",
        questions: [
          { question: "What is a 'boarding pass'?", options: ["Passeport", "Carte d'embarquement", "Billet de train", "Carte d'identité"], correctIndex: 1, explanation: "Boarding pass = carte d'embarquement." },
          { question: "What does 'check out' mean at a hotel?", options: ["Arrivée", "Départ", "Petit-déjeuner", "Réservation"], correctIndex: 1, explanation: "Check out = départ de l'hôtel." },
        ],
      },
    ],
  },
  "en-7": {
    id: "en-7",
    title: "Conditionals (If Clauses)",
    description: "Learn to express conditions and hypothetical situations.",
    category: "Grammar",
    cefrLevel: "B1",
    estimatedMinutes: 14,
    tutorId: "james",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Conditionals allow you to talk about possibilities, hypothetical situations, and their consequences.",
        tutorTip: "James here! Conditionals are where English gets really powerful. You can talk about dreams, regrets, and future possibilities. Let's unlock this!",
      },
      {
        type: "vocabulary",
        title: "First Conditional (Real Future)",
        tutorTip: "First conditional = real possibility. If + present, will + base verb.",
        items: [
          { word: "If it rains, I will stay home.", translation: "S'il pleut, je resterai à la maison.", pronunciation: "if it raynz, eye wil stay home", example: "If it rains tomorrow, I will stay home.", exampleTranslation: "S'il pleut demain, je resterai à la maison." },
          { word: "If you study, you will pass.", translation: "Si tu étudies, tu réussiras.", pronunciation: "if yoo STUD-ee, yoo wil pass", example: "If you study hard, you will pass the exam.", exampleTranslation: "Si tu étudies beaucoup, tu réussiras l'examen." },
          { word: "If we leave now, we will arrive on time.", translation: "Si nous partons maintenant, nous arriverons à l'heure.", pronunciation: "if wee leave now, wee wil uh-RYVE on tyhm", example: "If we leave now, we will arrive on time.", exampleTranslation: "Si nous partons maintenant, nous arriverons à l'heure." },
        ],
      },
      {
        type: "vocabulary",
        title: "Second Conditional (Unreal Present)",
        tutorTip: "Second conditional = imaginary situation. If + past, would + base verb.",
        items: [
          { word: "If I had money, I would travel.", translation: "Si j'avais de l'argent, je voyagerais.", pronunciation: "if eye had MUN-nee, eye wud TRAV-el", example: "If I had more money, I would travel the world.", exampleTranslation: "Si j'avais plus d'argent, je voyagerais à travers le monde." },
          { word: "If I were you, I would apologize.", translation: "Si j'étais toi, je m'excuserais.", pronunciation: "if eye were yoo, eye wud uh-POL-uh-jyz", example: "If I were you, I would apologize.", exampleTranslation: "Si j'étais toi, je m'excuserais." },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "James challenges you: first or second conditional?",
        questions: [
          { question: "Complete: 'If it ___ tomorrow, I will bring an umbrella.'", options: ["rains", "rained", "would rain", "will rain"], correctIndex: 0, explanation: "First conditional: if + present simple." },
          { question: "Complete: 'If I ___ a car, I would drive to work.'", options: ["have", "had", "would have", "will have"], correctIndex: 1, explanation: "Second conditional: if + past simple." },
        ],
      },
      {
        type: "quiz",
        title: "Final Quiz",
        tutorTip: "Final conditional test. First or second?",
        questions: [
          { question: "Which is correct?", options: ["If I will see him, I will say hello", "If I see him, I will say hello", "If I see him, I would say hello", "If I saw him, I will say hello"], correctIndex: 1, explanation: "First conditional: if + present, will + base verb." },
          { question: "What does 'If I were you' express?", options: ["A real situation", "An imaginary situation", "A past event", "A future plan"], correctIndex: 1, explanation: "Second conditional = imaginary/hypothetical." },
        ],
      },
    ],
  },
  "en-8": {
    id: "en-8",
    title: "Business English Essentials",
    description: "Professional communication for the workplace.",
    category: "Conversation",
    cefrLevel: "B1",
    estimatedMinutes: 12,
    tutorId: "kenji",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Master professional English for emails, meetings, and presentations in the workplace.",
        tutorTip: "Hi! I'm Kenji. Business English is different from casual English. Let me show you the key phrases that make you sound professional.",
      },
      {
        type: "vocabulary",
        title: "Email Phrases",
        tutorTip: "In business emails, always start with 'Dear' (formal) or 'Hi' (semi-formal). Never 'Hey'!",
        items: [
          { word: "Dear Sir/Madam", translation: "Madame, Monsieur", pronunciation: "deer sir/MAD-um", example: "Dear Sir, I am writing to inquire about...", exampleTranslation: "Madame, Monsieur, je vous écris pour me renseigner sur..." },
          { word: "I am writing to...", translation: "Je vous écris pour...", pronunciation: "eye am RIT-ing to", example: "I am writing to confirm our meeting.", exampleTranslation: "Je vous écris pour confirmer notre réunion." },
          { word: "Please find attached", translation: "Veuillez trouver ci-joint", pronunciation: "pleez fyend uh-TACH-t", example: "Please find attached the report.", exampleTranslation: "Veuillez trouver ci-joint le rapport." },
          { word: "I look forward to hearing from you", translation: "J'attends votre réponse avec impatience", pronunciation: "eye luk FUR-werd to", example: "Thank you for your time. I look forward to hearing from you.", exampleTranslation: "Merci pour votre temps. J'attends votre réponse avec impatience." },
          { word: "Best regards", translation: "Cordialement", pronunciation: "best ree-GARDZ", example: "Best regards, John", exampleTranslation: "Cordialement, Jean" },
        ],
      },
      {
        type: "vocabulary",
        title: "Meeting Phrases",
        tutorTip: "In meetings, 'Could I interrupt?' is more polite than 'Stop!' 😄",
        items: [
          { word: "Let's get started", translation: "Commençons", pronunciation: "lets get STAR-ted", example: "Let's get started with the agenda.", exampleTranslation: "Commençons avec l'ordre du jour." },
          { word: "I agree with...", translation: "Je suis d'accord avec...", pronunciation: "eye uh-GREE with", example: "I agree with Sarah's proposal.", exampleTranslation: "Je suis d'accord avec la proposition de Sarah." },
          { word: "Could I interrupt?", translation: "Puis-je interrompre ?", pronunciation: "kood eye in-tuh-RUHMPT", example: "Could I interrupt for a moment?", exampleTranslation: "Puis-je interrompre un instant ?" },
          { word: "Let's move on to...", translation: "Passons à...", pronunciation: "lets move on to", example: "Let's move on to the next topic.", exampleTranslation: "Passons au sujet suivant." },
          { word: "To sum up", translation: "En résumé", pronunciation: "too sum up", example: "To sum up, we need to increase sales.", exampleTranslation: "En résumé, nous devons augmenter les ventes." },
        ],
      },
      {
        type: "exercise",
        title: "Exercise",
        tutorTip: "Kenji's business challenge! Professional or too casual?",
        questions: [
          { question: "Which is the most professional email opening?", options: ["Hey!", "Dear Sir/Madam", "Hi there!", "What's up?"], correctIndex: 1, explanation: "Dear Sir/Madam is the most formal and professional." },
          { question: "How do you politely disagree in a meeting?", options: ["You're wrong!", "I disagree completely", "I see your point, but I think...", "No way!"], correctIndex: 2, explanation: "Professional disagreement acknowledges the other person first." },
        ],
      },
    ],
  },

  // ── BUSINESS ENGLISH FOR AFRICAN FRANCOPHONE PROFESSIONALS ──

  "be-1": {
    id: "be-1",
    title: "Professional Email Writing",
    description: "Master the art of writing clear, professional emails in English for business communication.",
    category: "Business English",
    cefrLevel: "B1",
    estimatedMinutes: 15,
    tutorId: "james-business",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "In international business, email is the primary communication tool. Writing clear, professional emails in English is essential for your career. Today we'll learn the key structures and phrases used in business emails worldwide.",
        tutorTip: "Bonjour ! I'm James, your Business English coach. As a French speaker working in international business, you'll write dozens of emails daily. Let me show you exactly how to structure them for maximum impact.",
      },
      {
        type: "vocabulary",
        title: "Email Openings & Closings",
        tutorTip: "The opening and closing set the tone. In English business culture, being too casual can seem unprofessional. Always match the formality to your relationship.",
        items: [
          { word: "Dear Mr./Ms. [Name]", translation: "Cher/Chère M./Mme [Nom]", pronunciation: "dear misterr miss name", example: "Dear Mr. Johnson, I hope this email finds you well.", exampleTranslation: "Cher M. Johnson, j'espère que ce mail vous trouve en bonne santé." },
          { word: "I am writing to...", translation: "Je vous écris pour...", pronunciation: "eye am RIT-ing too", example: "I am writing to inquire about your services.", exampleTranslation: "Je vous écris pour me renseigner sur vos services." },
          { word: "Please find attached...", translation: "Veuillez trouver ci-joint...", pronunciation: "pleez fine ah-TATCHD", example: "Please find attached the quarterly report.", exampleTranslation: "Veuillez trouver ci-joint le rapport trimestriel." },
          { word: "I look forward to hearing from you.", translation: "J'attends votre réponse avec impatience.", pronunciation: "eye look frr-wurd too heer-ing from yoo", example: "Thank you for your time. I look forward to hearing from you.", exampleTranslation: "Merci pour votre temps. J'attends votre réponse avec impatience." },
          { word: "Best regards,", translation: "Cordialement,", pronunciation: "best ree-gardz", example: "Best regards,\nJean-Pierre Dupont", exampleTranslation: "Cordialement,\nJean-Pierre Dupont" },
        ],
      },
      {
        type: "vocabulary",
        title: "Requesting & Following Up",
        tutorTip: "In English business culture, directness is valued but politeness is essential. Use softening phrases to sound professional, not demanding.",
        items: [
          { word: "Could you please...", translation: "Pourriez-vous s'il vous plaît...", pronunciation: "kood yoo pleez", example: "Could you please send me the updated proposal?", exampleTranslation: "Pourriez-vous m'envoyer la proposition mise à jour ?" },
          { word: "I would appreciate it if...", translation: "Je vous saurais gré de...", pronunciation: "eye wud uh-PREE-shee-ate it if", example: "I would appreciate it if you could respond by Friday.", exampleTranslation: "Je vous saurais gré de bien vouloir répondre vendredi." },
          { word: "Just a gentle reminder", translation: "Un petit rappel", pronunciation: "just uh JEN-tul ri-MYN-dur", example: "Just a gentle reminder about the deadline.", exampleTranslation: "Un petit rappel concernant la date limite." },
          { word: "Please don't hesitate to...", translation: "N'hésitez pas à...", pronunciation: "pleez doant HEZ-i-tate too", example: "Please don't hesitate to contact me if you have questions.", exampleTranslation: "N'hésitez pas à me contacter si vous avez des questions." },
          { word: "I apologize for the delay.", translation: "Je m'excuse pour le retard.", pronunciation: "eye uh-POL-uh-juze for thuh dih-LAY", example: "I apologize for the delay in my response.", exampleTranslation: "Je m'excuse pour le retard dans ma réponse." },
        ],
      },
      {
        type: "exercise",
        title: "Email Scenarios",
        tutorTip: "James's challenge! Practice writing the right email for each situation.",
        questions: [
          { question: "You need to request information from a supplier. What's the best opening?", options: ["Give me the info!", "Dear Sir, I am writing to inquire about...", "Hey, I need some info", "Info please"], correctIndex: 1, explanation: "Professional email openings state your purpose clearly and politely." },
          { question: "Your client hasn't replied for a week. How do you follow up?", options: ["Why haven't you replied?", "Just a gentle reminder about our previous conversation.", "URGENT: Reply now!", "Where is my answer?"], correctIndex: 1, explanation: "Gentle reminders maintain relationships while getting results." },
          { question: "You need to attach a document. Which phrase is most professional?", options: ["Here's the file", "Please find attached the document you requested.", "Check this out", "Document attached"], correctIndex: 1, explanation: "Please find attached is the standard professional phrase." },
        ],
      },
      {
        type: "dialogue",
        title: "Real-World Email Exchange",
        dialogue: [
          { speaker: "Amina (You)", text: "Dear Mr. Thompson, I am writing to follow up on our meeting last Tuesday regarding the Abidjan project. As discussed, please find attached the revised budget proposal.", translation: "Cher M. Thompson, je vous écris pour faire suite à notre réunion de mardi dernier concernant le projet Abidjan. Comme convenu, veuillez trouver ci-joint la proposition budgétaire révisée." },
          { speaker: "Mr. Thompson (Reply)", text: "Dear Amina, Thank you for the prompt follow-up. The budget looks reasonable. Could we schedule a call to discuss the timeline?", translation: "Chère Amina, Merci pour le suivi rapide. Le budget semble raisonnable. Pourrions-nous planifier un appel pour discuter du calendrier ?" },
        ],
        tutorTip: "Notice how Amina references the previous meeting and includes the attachment. This is the standard follow-up format in international business.",
      },
    ],
  },

  "be-2": {
    id: "be-2",
    title: "Meeting & Presentation Skills",
    description: "Learn to confidently participate in and lead business meetings in English.",
    category: "Business English",
    cefrLevel: "B1",
    estimatedMinutes: 18,
    tutorId: "james-business",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Whether it's a Zoom call with colleagues in London or a boardroom presentation in Dakar, meetings are where decisions happen. Today we'll master the language of effective business meetings.",
        tutorTip: "Bonjour! I'm James. In my 15 years in international business, I've seen talented professionals held back by not knowing the right meeting phrases. Let's change that for you!",
      },
      {
        type: "vocabulary",
        title: "Opening a Meeting",
        tutorTip: "The first 2 minutes set the tone. A strong opening shows leadership and professionalism.",
        items: [
          { word: "Welcome everyone. Let's get started.", translation: "Bienvenue à tous. Commençons.", pronunciation: "wel-kum ev-ree-wun lets get STAR-ted", example: "Welcome everyone. Let's get started with today's agenda.", exampleTranslation: "Bienvenue à tous. Commençons avec l'ordre du jour d'aujourd'hui." },
          { word: "The purpose of today's meeting is...", translation: "L'objectif de la réunion d'aujourd'hui est...", pronunciation: "thuh PUR-pus of tuh-days mee-ting iz", example: "The purpose of today's meeting is to review the Q3 results.", exampleTranslation: "L'objectif de la réunion d'aujourd'hui est de revoir les résultats du T3." },
          { word: "Let me outline the agenda.", translation: "Permettez-moi de présenter l'ordre du jour.", pronunciation: "lets mee OUT-line thuh uh-JEN-duh", example: "Let me outline the agenda for today.", exampleTranslation: "Permettez-moi de présenter l'ordre du jour pour aujourd'hui." },
          { word: "Any questions before we begin?", translation: "Des questions avant de commencer ?", pronunciation: "en-ee KWES-chunz be-fore wee be-gin", example: "Any questions before we begin?", exampleTranslation: "Des questions avant de commencer ?" },
        ],
      },
      {
        type: "vocabulary",
        title: "Contributing & Disagreeing Politely",
        tutorTip: "In English-speaking business culture, you can disagree — but you must do it diplomatically. The key is to acknowledge first, then present your view.",
        items: [
          { word: "I see your point, but...", translation: "Je vois votre point de vue, mais...", pronunciation: "eye see yoor poynt but", example: "I see your point, but I think we should consider the local market.", exampleTranslation: "Je vois votre point de vue, mais je pense que nous devrions considérer le marché local." },
          { word: "That's a valid point. However...", translation: "C'est un point pertinent. Cependant...", pronunciation: "thats uh VAL-id poynt how-ev-ur", example: "That's a valid point. However, our data shows something different.", exampleTranslation: "C'est un point pertinent. Cependant, nos données montrent quelque chose de différent." },
          { word: "I'd like to add...", translation: "J'aimerais ajouter...", pronunciation: "eye-lyke too add", example: "I'd like to add that we also need to consider the budget.", exampleTranslation: "J'aimerais ajouter que nous devons aussi considérer le budget." },
          { word: "Could we circle back to this later?", translation: "Pourrions-nous y revenir plus tard ?", pronunciation: "kood wee SUR-kul bak too this LAYT-ur", example: "Could we circle back to this later? It needs more discussion.", exampleTranslation: "Pourrions-nous y revenir plus tard ? Cela nécessite plus de discussion." },
          { word: "To summarize what we've discussed...", translation: "Pour résumer ce que nous avons discuté...", pronunciation: "too SUM-uh-ryze what wev duh-SCUHST", example: "To summarize, we need to increase our presence in West Africa.", exampleTranslation: "Pour résumer, nous devons accroître notre présence en Afrique de l'Ouest." },
        ],
      },
      {
        type: "exercise",
        title: "Meeting Scenarios",
        tutorTip: "Real situations you'll face in international meetings!",
        questions: [
          { question: "Your colleague proposes an idea you disagree with. What's the best response?", options: ["That's wrong!", "I see your point, but I think we should consider...", "No, I don't like that", "Absolutely not"], correctIndex: 1, explanation: "Professional disagreement acknowledges the other person's view first." },
          { question: "You need to get back on topic after a tangent. What do you say?", options: ["Stop talking about that!", "Could we circle back to the main topic?", "This is boring", "Let's talk about something else"], correctIndex: 1, explanation: "Circle back is the standard way to redirect a meeting professionally." },
          { question: "The meeting is running over time. How do you address this?", options: ["Hurry up!", "We're running short on time. Could we table the rest for next meeting?", "This is taking too long", "Let's skip everything"], correctIndex: 1, explanation: "Acknowledging time constraints shows awareness and respect for everyone's schedule." },
        ],
      },
      {
        type: "dialogue",
        title: "Meeting Scenario: Project Review",
        dialogue: [
          { speaker: "Amina (You)", text: "Good morning everyone. Welcome to the quarterly review. The purpose of today's meeting is to discuss our progress on the Abidjan office expansion.", translation: "Bonjour à tous. Bienvenue à la revue trimestrielle. L'objectif de la réunion d'aujourd'hui est de discuter de nos progrès sur l'expansion du bureau d'Abidjan." },
          { speaker: "David (UK)", text: "Thanks Amina. I've reviewed the numbers and I think we're ahead of schedule.", translation: "Merci Amina. J'ai examiné les chiffres et je pense que nous sommes en avance sur le planning." },
          { speaker: "Amina (You)", text: "That's great to hear, David. I see your point about the timeline. However, I'd like to add that we still need to finalize the local permits.", translation: "C'est excellent à entendre, David. Je vois votre point sur le calendrier. Cependant, j'aimerais ajouter que nous devons encore finaliser les permis locaux." },
        ],
        tutorTip: "Amina opens with purpose, acknowledges David's input, and adds her concern diplomatically. This is the model of effective meeting communication.",
      },
    ],
  },

  "be-3": {
    id: "be-3",
    title: "Negotiation & Deal-Making",
    description: "Master the language of business negotiation to close deals confidently.",
    category: "Business English",
    cefrLevel: "B2",
    estimatedMinutes: 20,
    tutorId: "james-business",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Negotiation is where value is created. Whether you're negotiating a contract, salary, or partnership terms, the right language can make or break the deal. Today we'll learn the essential phrases for successful business negotiations.",
        tutorTip: "Bonjour! Negotiation in English follows specific patterns. I'll teach you the exact phrases used by international deal-makers. These work whether you're in Paris, Abidjan, or New York.",
      },
      {
        type: "vocabulary",
        title: "Opening Negotiations",
        tutorTip: "A strong negotiation opening sets the tone and establishes your position without being aggressive.",
        items: [
          { word: "We're looking for a mutually beneficial partnership.", translation: "Nous cherchons un partenariat mutuellement bénéfique.", pronunciation: "weer LOO-king for uh MOO-chu-uh-lee bee-NEF-i-sheent PAHT-nur-ship", example: "We're looking for a mutually beneficial partnership.", exampleTranslation: "Nous cherchons un partenariat mutuellement bénéfique." },
          { word: "What would you propose?", translation: "Que proposeriez-vous ?", pronunciation: "wud yoo pruh-POH-z", example: "Given our requirements, what would you propose?", exampleTranslation: "Compte tenu de nos exigences, que proposeriez-vous ?" },
          { word: "Our budget allows for...", translation: "Notre budget prévoit...", pronunciation: "are BUD-jit uh-LOWS for", example: "Our budget allows for up to $50,000 for this project.", exampleTranslation: "Notre budget prévoit jusqu'à 50 000 $ pour ce projet." },
          { word: "That's within our range.", translation: "C'est dans notre fourchette.", pronunciation: "thats with-IN are RAYNJ", example: "Your proposal of $45,000 — that's within our range.", exampleTranslation: "Votre proposition de 45 000 $ — c'est dans notre fourchette." },
          { word: "We need to find a middle ground.", translation: "Nous devons trouver un compromis.", pronunciation: "wee need too find uh MID-ul groun", example: "We need to find a middle ground that works for both sides.", exampleTranslation: "Nous devons trouver un compromis qui convient aux deux parties." },
        ],
      },
      {
        type: "vocabulary",
        title: "Making Concessions & Closing",
        tutorTip: "The art of negotiation is knowing what to give up and when to close. These phrases will help you make strategic concessions.",
        items: [
          { word: "If you can..., then we could...", translation: "Si vous pouvez..., alors nous pourrions...", pronunciation: "if yoo can then wee kood", example: "If you can deliver by March, then we could increase the order.", exampleTranslation: "Si vous pouvez livrer en mars, alors nous pourrions augmenter la commande." },
          { word: "That's our best offer.", translation: "C'est notre meilleure offre.", pronunciation: "thats are best OFF-ur", example: "I'm afraid that's our best offer on this project.", exampleTranslation: "Je crains que ce soit notre meilleure offre pour ce projet." },
          { word: "We have a deal.", translation: "Nous avons un accord.", pronunciation: "wee hav uh deel", example: "Thank you for the negotiation. We have a deal.", exampleTranslation: "Merci pour la négociation. Nous avons un accord." },
          { word: "Let's put this in writing.", translation: "Mettons cela par écrit.", pronunciation: "lets put this in RY-ting", example: "We have a deal. Let's put this in writing.", exampleTranslation: "Nous avons un accord. Mettons cela par écrit." },
          { word: "I'll have my team send the contract.", translation: "Je ferai envoyer le contrat par mon équipe.", pronunciation: "eye-lee hav mee team send thuh KON-trakt", example: "Excellent. I'll have my team send the contract by tomorrow.", exampleTranslation: "Excellent. Je ferai envoyer le contrat par mon équipe demain." },
        ],
      },
      {
        type: "exercise",
        title: "Negotiation Scenarios",
        tutorTip: "Real negotiation situations you'll face in international business!",
        questions: [
          { question: "A supplier offers a price above your budget. How do you respond?", options: ["That's too expensive!", "I appreciate the proposal, but that's above our budget. Could we explore alternatives?", "No way!", "I won't pay that"], correctIndex: 1, explanation: "Professional negotiation acknowledges the offer while clearly stating your constraints." },
          { question: "You want to close the deal but need a small concession. What do you say?", options: ["Take it or leave it!", "If you can include delivery, we could sign today.", "Just give me a discount", "I demand better terms"], correctIndex: 1, explanation: "Conditional language (if...then) is the foundation of strategic negotiation." },
          { question: "The other party asks for something you can't give. How do you handle it?", options: ["Impossible!", "I understand your request, but that's beyond our current scope. However, we could...", "Not a chance", "Forget it"], correctIndex: 1, explanation: "Acknowledging + redirecting is more effective than outright rejection." },
        ],
      },
      {
        type: "dialogue",
        title: "Negotiation: Supplier Contract",
        dialogue: [
          { speaker: "Amina (You)", text: "Thank you for the proposal, Mr. Chen. The quality of your products meets our requirements. However, the price point is above our budget.", translation: "Merci pour la proposition, M. Chen. La qualité de vos produits répond à nos exigences. Cependant, le prix est au-dessus de notre budget." },
          { speaker: "Mr. Chen", text: "I understand your concern. What budget range did you have in mind?", translation: "Je comprends votre préoccupation. Quelle fourchette de budget aviez-vous en tête ?" },
          { speaker: "Amina (You)", text: "Our budget allows for up to $30 per unit for an order of 10,000. If you can meet that, we could sign the contract this week.", translation: "Notre budget prévoit jusqu'à 30 $ par unité pour une commande de 10 000. Si vous pouvez nous offrir cela, nous pourrions signer le contrat cette semaine." },
          { speaker: "Mr. Chen", text: "That's a significant order. If you can commit to 15,000 units, I can offer $30 per unit.", translation: "C'est une commande importante. Si vous pouvez vous engager sur 15 000 unités, je peux offrir 30 $ par unité." },
          { speaker: "Amina (You)", text: "Let's find a middle ground. How about 12,000 units at $30, with delivery by March 15th?", translation: "Trouvons un compromis. Qu'en diriez-vous de 12 000 unités à 30 $, avec livraison d'ici le 15 mars ?" },
          { speaker: "Mr. Chen", text: "You have a deal.", translation: "Vous avez un accord." },
          { speaker: "Amina (You)", text: "Excellent. Let's put this in writing.", translation: "Excellent. Mettons cela par écrit." },
        ],
        tutorTip: "Notice Amina's negotiation technique: acknowledge the offer, state constraints, propose alternatives, find middle ground, and close firmly. This is the exact pattern used by top negotiators.",
      },
    ],
  },

  "be-4": {
    id: "be-4",
    title: "Business Travel & Networking",
    description: "Navigate airports, hotels, and business dinners with confidence in English.",
    category: "Business English",
    cefrLevel: "B1",
    estimatedMinutes: 15,
    tutorId: "james-business",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "International business often means traveling. Whether you're at an airport in Dubai, a hotel in London, or a business dinner in New York, the right English phrases will help you navigate every situation with confidence.",
        tutorTip: "Bonjour! Business travel is where opportunities happen. I'll teach you the exact phrases you need at airports, hotels, and networking events.",
      },
      {
        type: "vocabulary",
        title: "Airport & Hotel",
        tutorTip: "These are the most common situations during business travel. Master these phrases and you'll travel stress-free.",
        items: [
          { word: "I have a reservation under...", translation: "J'ai une réservation au nom de...", pronunciation: "eye hav uh reh-zur-VAY-shun un-der", example: "I have a reservation under Dupont for tonight.", exampleTranslation: "J'ai une réservation au nom de Dupont pour ce soir." },
          { word: "Could I get a wake-up call at...?", translation: "Pourrais-je avoir un réveil à...?", pronunciation: "kood eye get uh WAYK-up kol at", example: "Could I get a wake-up call at 6 AM?", exampleTranslation: "Pourrais-je avoir un réveil à 6 heures ?" },
          { word: "I'd like to check out, please.", translation: "Je voudrais régler ma note, s'il vous plaît.", pronunciation: "eye-lyke too check owt pleez", example: "Good morning. I'd like to check out, please.", exampleTranslation: "Bonjour. Je voudrais régler ma note, s'il vous plaît." },
          { word: "Is there a business center?", translation: "Y a-t-il un centre d'affaires ?", pronunciation: "iz thair uh BIZ-niss SEN-tur", example: "Is there a business center where I can print some documents?", exampleTranslation: "Y a-t-il un centre d'affaires où je peux imprimer des documents ?" },
        ],
      },
      {
        type: "vocabulary",
        title: "Networking Events",
        tutorTip: "Business dinners and networking events are where relationships are built. The right opening lines make all the difference.",
        items: [
          { word: "Hi, I'm [Name] from [Company].", translation: "Bonjour, je suis [Nom] de [Entreprise].", pronunciation: "hi eye-am name from kom-puh-nee", example: "Hi, I'm Amina from West Africa Industries.", exampleTranslation: "Bonjour, je suis Amina de West Africa Industries." },
          { word: "What do you do?", translation: "Que faites-vous dans la vie ?", pronunciation: "wut doo yoo doo", example: "What do you do at the company?", exampleTranslation: "Que faites-vous dans l'entreprise ?" },
          { word: "I'm in charge of...", translation: "Je suis responsable de...", pronunciation: "eye-m in charj of", example: "I'm in charge of business development for West Africa.", exampleTranslation: "Je suis responsable du développement commercial pour l'Afrique de l'Ouest." },
          { word: "Let's exchange cards.", translation: "Échangeons nos cartes.", pronunciation: "lets ex-SHAYNJ kardz", example: "It was great meeting you. Let's exchange cards.", exampleTranslation: "C'était un plaisir de vous rencontrer. Échangeons nos cartes." },
          { word: "Would you like to continue this over coffee?", translation: "Aimeriez-vous poursuivre cela autour d'un café ?", pronunciation: "wud yoo lyke too kuhn-TIN-yoo this oh-ver KOF-ee", example: "This is interesting. Would you like to continue this over coffee?", exampleTranslation: "C'est intéressant. Aimeriez-vous poursuivre cela autour d'un café ?" },
        ],
      },
      {
        type: "exercise",
        title: "Travel & Networking Scenarios",
        tutorTip: "Real situations you'll face on business trips!",
        questions: [
          { question: "You arrive at a hotel but your reservation isn't found. What do you say?", options: ["This is unacceptable!", "I have a reservation under Dupont. Could you check again?", "Where is my room?", "I booked already!"], correctIndex: 1, explanation: "Staying calm and providing clear information resolves issues faster." },
          { question: "You meet someone at a networking event. What's the best way to start a conversation?", options: ["Nice to meet you. What do you do?", "Hey, what's up?", "Are you important?", "Tell me about yourself"], correctIndex: 0, explanation: "Professional networking starts with a clear introduction and genuine curiosity." },
          { question: "You want to follow up after meeting a potential client. What do you say?", options: ["Remember me?", "It was great meeting you. Would you like to schedule a call to discuss further?", "Call me back", "We should talk more"], correctIndex: 1, explanation: "A clear, specific follow-up request is more effective than a vague suggestion." },
        ],
      },
      {
        type: "dialogue",
        title: "Networking at a Business Conference",
        dialogue: [
          { speaker: "Amina (You)", text: "Hi, I'm Amina from West Africa Industries. I noticed your presentation on supply chain solutions. Very impressive.", translation: "Bonjour, je suis Amina de West Africa Industries. J'ai remarqué votre présentation sur les solutions de chaîne d'approvisionnement. Très impressionnant." },
          { speaker: "Sarah (UK)", text: "Thank you! I'm Sarah from Global Logistics. What do you do at West Africa Industries?", translation: "Merci ! Je suis Sarah de Global Logistics. Que faites-vous chez West Africa Industries ?" },
          { speaker: "Amina (You)", text: "I'm in charge of business development for West Africa. We're expanding our distribution network and your solutions could be a great fit.", translation: "Je suis responsable du développement commercial pour l'Afrique de l'Ouest. Nous développons notre réseau de distribution et vos solutions pourraient être un excellent choix." },
          { speaker: "Sarah (UK)", text: "That sounds very interesting. Would you like to continue this over coffee?", translation: "Cela semble très intéressant. Aimeriez-vous poursuivre cela autour d'un café ?" },
        ],
        tutorTip: "Amina leads with a compliment (shows she paid attention), introduces herself clearly, and states the potential opportunity. This is a textbook networking opening.",
      },
    ],
  },

  "be-5": {
    id: "be-5",
    title: "Presentations & Pitches",
    description: "Deliver compelling business presentations and pitch your ideas with impact.",
    category: "Business English",
    cefrLevel: "B2",
    estimatedMinutes: 20,
    tutorId: "james-business",
    language: "en",
    steps: [
      {
        type: "intro",
        title: "Introduction",
        content: "Presentations and pitches are where you sell your ideas, products, and vision. Whether you're presenting quarterly results to your board or pitching a new partnership, the right delivery can transform your career.",
        tutorTip: "Bonjour! A great presentation isn't about perfect English — it's about structure, confidence, and clear communication. I'll teach you the exact framework used by top executives.",
      },
      {
        type: "vocabulary",
        title: "Opening & Structure",
        tutorTip: "The first 30 seconds determine whether your audience listens or zones out. Start strong.",
        items: [
          { word: "Good morning/afternoon. Thank you for being here.", translation: "Bonjour/Bonsoir. Merci d'être présents.", pronunciation: "gud MOR-ning af-ter-noon thangk yoo for being heer", example: "Good morning. Thank you for being here today.", exampleTranslation: "Bonjour. Merci d'être présents aujourd'hui." },
          { word: "Today I'd like to present...", translation: "Aujourd'hui, j'aimerais vous présenter...", pronunciation: "tuh-DAY eye-lyke too prez-ENT", example: "Today I'd like to present our expansion plan for West Africa.", exampleTranslation: "Aujourd'hui, j'aimerais vous présenter notre plan d'expansion pour l'Afrique de l'Ouest." },
          { word: "Let me walk you through...", translation: "Permettez-moi de vous guider à travers...", pronunciation: "lets mee wok yoo throo", example: "Let me walk you through the key highlights.", exampleTranslation: "Permettez-moi de vous guider à travers les points clés." },
          { word: "As you can see on this slide...", translation: "Comme vous pouvez le voir sur cette diapositive...", pronunciation: "az yoo kan see on thys syd", example: "As you can see on this slide, revenue grew 25%.", exampleTranslation: "Comme vous pouvez le voir sur cette diapositive, le revenu a augmenté de 25 %." },
        ],
      },
      {
        type: "vocabulary",
        title: "Engaging & Closing Strong",
        tutorTip: "The best presenters keep the audience engaged throughout and end with a clear call to action.",
        items: [
          { word: "Let me share a quick example.", translation: "Permettez-moi de partager un exemple rapide.", pronunciation: "lets mee share uh KWIK ig-ZAM-pul", example: "Let me share a quick example from our Abidjan office.", exampleTranslation: "Permettez-moi de partager un exemple rapide de notre bureau d'Abidjan." },
          { word: "The key takeaway is...", translation: "Le point essentiel à retenir est...", pronunciation: "thuh kee TAYK-way iz", example: "The key takeaway is that our model is scalable.", exampleTranslation: "Le point essentiel à retenir est que notre modèle est évolutif." },
          { word: "In conclusion...", translation: "En conclusion...", pronunciation: "in kun-kloo-ZHUN", example: "In conclusion, this partnership will benefit both organizations.", exampleTranslation: "En conclusion, ce partenariat bénéficiera aux deux organisations." },
          { word: "Thank you. I'm happy to take any questions.", translation: "Merci. Je suis disponible pour répondre à vos questions.", pronunciation: "thangk yoo eye-m HAP-ee too take en-ee KWES-chunz", example: "Thank you for your attention. I'm happy to take any questions.", exampleTranslation: "Merci pour votre attention. Je suis disponible pour répondre à vos questions." },
        ],
      },
      {
        type: "exercise",
        title: "Presentation Scenarios",
        tutorTip: "Real presentation situations for African francophone professionals!",
        questions: [
          { question: "You're presenting to the board. How do you start?", options: ["So, um, let me start...", "Good morning. Thank you for being here. Today I'd like to present...", "Hey everyone!", "Let me tell you a story"], correctIndex: 1, explanation: "A strong opening with gratitude and clear purpose establishes credibility." },
          { question: "A slide has complex data. How do you help the audience understand?", options: ["Just look at this!", "As you can see on this slide, the key point is that revenue grew 25%.", "It's complicated", "Skip this one"], correctIndex: 1, explanation: "Guiding the audience through data with a clear takeaway is essential." },
          { question: "You're ending your presentation. What's the strongest closing?", options: ["That's it, I guess", "In conclusion, this opportunity will transform our market position. Thank you. I'm happy to take any questions.", "Any questions?", "Done!"], correctIndex: 1, explanation: "A strong closing summarizes the key message and invites engagement." },
        ],
      },
      {
        type: "dialogue",
        title: "Board Presentation: West Africa Expansion",
        dialogue: [
          { speaker: "Amina (You)", text: "Good morning, everyone. Thank you for being here. Today I'd like to present our expansion plan for West Africa — a $2 billion opportunity we cannot afford to miss.", translation: "Bonjour à tous. Merci d'être présents. Aujourd'hui, j'aimerais vous présenter notre plan d'expansion pour l'Afrique de l'Ouest — un marché de 2 milliards de dollars que nous ne pouvons pas nous permettre de rater." },
          { speaker: "Amina (You)", text: "Let me walk you through three key areas. First, market opportunity. As you can see on this slide, West Africa has 400 million consumers with a growing middle class.", translation: "Permettez-moi de vous guider à travers trois domaines clés. Premièrement, l'opportunité de marché. Comme vous pouvez le voir sur cette diapositive, l'Afrique de l'Ouest compte 400 millions de consommateurs avec une classe moyenne en pleine croissance." },
          { speaker: "Amina (You)", text: "Let me share a quick example. Our pilot in Côte d'Ivoire achieved 150% ROI within 12 months. The key takeaway is that our model works, and it's ready to scale.", translation: "Permettez-moi de partager un exemple rapide. Notre projet pilote en Côte d'Ivoire a atteint un retour sur investissement de 150 % en 12 mois. Le point essentiel est que notre modèle fonctionne et qu'il est prêt à être déployé à grande échelle." },
          { speaker: "Amina (You)", text: "In conclusion, I'm proposing a $50 million investment over 3 years. This will position us as the market leader. Thank you for your attention. I'm happy to take any questions.", translation: "En conclusion, je propose un investissement de 50 millions de dollars sur 3 ans. Cela nous positionnera comme leader du marché. Merci pour votre attention. Je suis disponible pour répondre à vos questions." },
        ],
        tutorTip: "This presentation follows the exact structure: Opening → Context → Data → Example → Key Takeaway → Call to Action → Questions. This framework works for any business presentation.",
      },
    ],
  },

  "be-6": {
    id: "be-6",
    title: "Financial English",
    description: "Master financial vocabulary for budgets, reports, and quarterly reviews.",
    category: "Business English",
    cefrLevel: "B1",
    language: "en",
    tutorId: "james",
    estimatedMinutes: 25,
    steps: [
      {
        type: "vocabulary",
        title: "Financial Vocabulary",
        tutorTip: "These terms appear in every financial meeting. Master them to discuss budgets and reports confidently.",
        items: [
          { word: "Revenue", translation: "Chiffre d'affaires", pronunciation: "REH-ven-yoo", example: "Our revenue grew 15% year-over-year.", exampleTranslation: "Notre chiffre d'affaires a augmenté de 15 % d'une année sur l'autre." },
          { word: "Profit margin", translation: "Marge bénéficiaire", pronunciation: "PROH-fit MAR-jin", example: "We need to improve our profit margin by 3 points.", exampleTranslation: "Nous devons améliorer notre marge bénéficiaire de 3 points." },
          { word: "Cash flow", translation: "Flux de trésorerie", pronunciation: "KASH floh", example: "Positive cash flow is essential for growth.", exampleTranslation: "Un flux de trésorerie positif est essentiel pour la croissance." },
          { word: "Budget", translation: "Budget", pronunciation: "BUH-jet", example: "We're over budget by $50,000 this quarter.", exampleTranslation: "Nous dépassons le budget de 50 000 $ ce trimestre." },
          { word: "Quarterly report", translation: "Rapport trimestriel", pronunciation: "KWOR-ter-lee ri-PORT", example: "The quarterly report shows strong growth in Africa.", exampleTranslation: "Le rapport trimestriel montre une forte croissance en Afrique." },
          { word: "Break-even point", translation: "Seuil de rentabilité", pronunciation: "BREK-EE-vun point", example: "We expect to reach break-even by Q3.", exampleTranslation: "Nous prévoyons d'atteindre le seuil de rentabilité au T3." },
          { word: "Return on investment (ROI)", translation: "Retour sur investissement", pronunciation: "ri-TURN on in-VEST-munt", example: "Our ROI was 150% in the first year.", exampleTranslation: "Notre retour sur investissement était de 150 % la première année." },
          { word: "Forecast", translation: "Prévision", pronunciation: "FOR-kast", example: "Our forecast predicts 20% growth next year.", exampleTranslation: "Nos prévisions prédisent une croissance de 20 % l'année prochaine." },
        ],
      },
      {
        type: "exercise",
        title: "Financial Scenarios",
        tutorTip: "Real financial discussions you'll face in international business!",
        questions: [
          { question: "Your CFO asks about Q2 performance. What's the best response?", options: ["It was good", "Q2 revenue grew 12% to $2.3M, with profit margins improving by 2 points.", "I don't know", "We made money"], correctIndex: 1, explanation: "Financial discussions require specific numbers and comparisons." },
          { question: "You need to request a budget increase. How do you present it?", options: ["We need more money", "Based on our ROI analysis, an additional $100K investment would generate $300K in revenue.", "Give us budget", "Money please"], correctIndex: 1, explanation: "Budget requests should be backed by data and projected returns." },
          { question: "A stakeholder asks about cash flow concerns. What do you say?", options: ["No problem", "We've implemented cost controls and expect positive cash flow by Q3.", "Cash flow is fine", "Don't worry"], correctIndex: 1, explanation: "Addressing concerns with specific actions and timelines builds confidence." },
        ],
      },
      {
        type: "dialogue",
        title: "Quarterly Board Meeting",
        dialogue: [
          { speaker: "Amina (CFO)", text: "Good morning. Q2 revenue was $4.2 million, up 18% from last year. Our profit margin improved to 22%, and cash flow remains positive.", translation: "Bonjour. Le chiffre d'affaires du T2 était de 4,2 millions de dollars, en hausse de 18 % par rapport à l'année dernière. Notre marge bénéficiaire s'est améliorée à 22 %, et le flux de trésorerie reste positif." },
          { speaker: "Board Member", text: "Excellent. What about the West Africa expansion? Are we on track?", translation: "Excellent. Qu'en est-il de l'expansion en Afrique de l'Ouest ? Sommes-nous dans les temps ?" },
          { speaker: "Amina (CFO)", text: "Yes. We've invested $2 million so far, and we're projecting break-even by Q4. The ROI in Côte d'Ivoire already exceeds 150%.", translation: "Oui. Nous avons investi 2 millions de dollars jusqu'à présent, et nous prévoyons d'atteindre le seuil de rentabilité d'ici le T4. Le retour sur investissement en Côte d'Ivoire dépasse déjà 150 %." },
          { speaker: "Board Member", text: "What's the forecast for next year?", translation: "Quelle est la prévision pour l'année prochaine ?" },
          { speaker: "Amina (CFO)", text: "Based on current trends, we forecast $20 million in revenue with 25% profit margins. I've prepared a detailed breakdown in the attached report.", translation: "D'après les tendances actuelles, nous prévoyons 20 millions de dollars de chiffre d'affaires avec des marges bénéficiaires de 25 %. J'ai préparé une ventilation détaillée dans le rapport ci-joint." },
        ],
        tutorTip: "Amina leads with the most important number (revenue), then supports with margins and cash flow. This top-down approach is expected in board meetings.",
      },
    ],
  },

  "be-7": {
    id: "be-7",
    title: "HR & People Management",
    description: "Learn English for hiring, performance reviews, and team management.",
    category: "Business English",
    cefrLevel: "B1",
    language: "en",
    tutorId: "james",
    estimatedMinutes: 25,
    steps: [
      {
        type: "vocabulary",
        title: "HR Vocabulary",
        tutorTip: "HR English is essential for managers and team leads. These terms appear in hiring, reviews, and team meetings.",
        items: [
          { word: "Onboarding", translation: "Intégration", pronunciation: "ON-bar-ding", example: "We have a structured onboarding program for new hires.", exampleTranslation: "Nous avons un programme d'intégration structuré pour les nouveaux employés." },
          { word: "Performance review", translation: "Évaluation de performance", pronunciation: "per-FOR-munce ri-VYOO", example: "Your performance review is scheduled for Friday.", exampleTranslation: "Votre évaluation de performance est prévue pour vendredi." },
          { word: "KPI (Key Performance Indicator)", translation: "ICP (Indicateur Clé de Performance)", pronunciation: "KAY-PEE-EYE", example: "We track 5 KPIs for each team member.", exampleTranslation: "Nous suivons 5 ICP pour chaque membre de l'équipe." },
          { word: "Talent retention", translation: "Rétention des talents", pronunciation: "TAL-unt ri-TEN-shun", example: "Talent retention is a priority for us.", exampleTranslation: "La rétention des talents est une priorité pour nous." },
          { word: "Remote work", translation: "Télétravail", pronunciation: "REE-mot WURK", example: "Our remote work policy applies to all positions.", exampleTranslation: "Notre politique de télétravail s'applique à tous les postes." },
          { word: "Team building", translation: "Renforcement d'équipe", pronunciation: "TEEM BIL-ding", example: "We organize team building activities quarterly.", exampleTranslation: "Nous organisons des activités de renforcement d'équipe chaque trimestre." },
          { word: "Job description", translation: "Description de poste", pronunciation: "JOB dee-SKRIP-shun", example: "The job description includes salary range and benefits.", exampleTranslation: "La description de poste comprend la fourchette de salaire et les avantages." },
          { word: "Conflict resolution", translation: "Résolution de conflits", pronunciation: "KON-flikt res-oh-LOO-shun", example: "Conflict resolution skills are essential for managers.", exampleTranslation: "Les compétences en résolution de conflits sont essentielles pour les managers." },
        ],
      },
      {
        type: "exercise",
        title: "HR Scenarios",
        tutorTip: "Real HR situations for managers working in international teams!",
        questions: [
          { question: "You're conducting a performance review. How do you start?", options: ["You need to work harder", "Thank you for your contributions this quarter. Let's review your achievements and areas for growth.", "How's work?", "Let's talk"], correctIndex: 1, explanation: "Starting with appreciation creates a constructive atmosphere for feedback." },
          { question: "A team member wants to work remotely. How do you respond?", options: ["No way", "I understand. Let me review our remote work policy and discuss how we can make this work for both you and the team.", "Not possible", "Fine, whatever"], correctIndex: 1, explanation: "Acknowledging the request and proposing a collaborative solution shows leadership." },
          { question: "Two team members have a conflict. How do you handle it?", options: ["Figure it out yourselves", "Let's schedule a meeting with both of you to understand each perspective and find a resolution.", "Not my problem", "I'll pick one side"], correctIndex: 1, explanation: "Mediating conflicts requires listening to all parties and finding common ground." },
        ],
      },
      {
        type: "dialogue",
        title: "Performance Review Meeting",
        dialogue: [
          { speaker: "James (Manager)", text: "Thank you for meeting with me, Amina. Let's review your performance this quarter. First, your achievements — you exceeded your KPIs by 20% and successfully led the Abidjan project.", translation: "Merci de m'avoir rencontré, Amina. Passons en revue votre performance ce trimestre. D'abord, vos réalisations — vous avez dépassé vos ICP de 20 % et avez dirigé avec succès le projet Abidjan." },
          { speaker: "Amina", text: "Thank you, James. I'm proud of what we accomplished.", translation: "Merci, James. Je suis fier de ce que nous avons accompli." },
          { speaker: "James (Manager)", text: "You should be. Now, for areas of growth — I'd like to see you develop your presentation skills for board meetings. Would you be interested in a leadership training program?", translation: "Vous devriez l'être. Maintenant, pour les axes d'amélioration — j'aimerais vous voir développer vos compétences en présentation pour les réunions de conseil. Seriez-vous intéressé par un programme de formation en leadership ?" },
          { speaker: "Amina", text: "Absolutely. I've been wanting to improve my board presentation skills. Could we also discuss the possibility of mentoring junior team members?", translation: "Absolument. J'ai voulu améliorer mes compétences en présentation au conseil. Pourrions-nous aussi discuter de la possibilité d'encadrer les membres juniors de l'équipe ?" },
          { speaker: "James (Manager)", text: "That's a great idea. Let's add mentoring to your development plan. I'll also update your job description to reflect your expanded responsibilities.", translation: "C'est une excellente idée. Ajoutons l'encadrement à votre plan de développement. Je vais également mettre à jour votre description de poste pour refléter vos responsabilités élargies." },
        ],
        tutorTip: "Notice how James balances praise with constructive feedback. He ends with concrete next steps. This is the standard format for effective performance reviews.",
      },
    ],
  },

  "be-8": {
    id: "be-8",
    title: "Marketing & Sales English",
    description: "Master marketing pitches, client proposals, and sales conversations.",
    category: "Business English",
    cefrLevel: "B1",
    language: "en",
    tutorId: "james",
    estimatedMinutes: 25,
    steps: [
      {
        type: "vocabulary",
        title: "Marketing & Sales Vocabulary",
        tutorTip: "These terms are essential for marketing meetings, sales pitches, and client discussions.",
        items: [
          { word: "Value proposition", translation: "Proposition de valeur", pronunciation: "VAL-yoo prop-oh-ZI-shun", example: "Our value proposition is clear: faster delivery at lower cost.", exampleTranslation: "Notre proposition de valeur est claire : livraison plus rapide à moindre coût." },
          { word: "Target audience", translation: "Public cible", pronunciation: "TAR-get AW-dee-uns", example: "Our target audience is young professionals in West Africa.", exampleTranslation: "Notre public cible est les jeunes professionnels d'Afrique de l'Ouest." },
          { word: "Market share", translation: "Part de marché", pronunciation: "MAR-ket share", example: "We've gained 5% market share in the last year.", exampleTranslation: "Nous avons gagné 5 % de part de marché au cours de la dernière année." },
          { word: "Conversion rate", translation: "Taux de conversion", pronunciation: "kun-VUR-zhun rayt", example: "Our conversion rate improved from 3% to 7%.", exampleTranslation: "Notre taux de conversion est passé de 3 % à 7 %." },
          { word: "Brand awareness", translation: "Notoriété de marque", pronunciation: "BRAND uh-WAIR-nis", example: "Brand awareness increased by 40% after the campaign.", exampleTranslation: "La notoriété de marque a augmenté de 40 % après la campagne." },
          { word: "Cold calling", translation: "Prospection à froid", pronunciation: "KOLD KAW-ling", example: "We use cold calling to reach new clients.", exampleTranslation: "Nous utilisons la prospection à froid pour atteindre de nouveaux clients." },
          { word: "Client proposal", translation: "Proposition client", pronunciation: "KLY-unt proh-PO-zishun", example: "I've prepared a client proposal for the Dakar project.", exampleTranslation: "J'ai préparé une proposition client pour le projet de Dakar." },
          { word: "Upselling", translation: "Vente additionnelle", pronunciation: "UP-sel-ing", example: "Upselling existing clients is more efficient than acquiring new ones.", exampleTranslation: "La vente additionnelle aux clients existants est plus efficace que l'acquisition de nouveaux clients." },
        ],
      },
      {
        type: "exercise",
        title: "Marketing & Sales Scenarios",
        tutorTip: "Real marketing and sales situations for professionals in international business!",
        questions: [
          { question: "You're pitching to a potential client. How do you open?", options: ["Buy our product", "Thank you for your time. Based on your challenges, we've developed a solution that addresses your specific needs.", "Hello, we sell things", "Here's our price"], correctIndex: 1, explanation: "Effective pitches start by acknowledging the client's needs, not by pushing the product." },
          { question: "A client says your price is too high. How do you respond?", options: ["Fine, we'll lower it", "I understand. Let me show you the ROI our clients achieve — it typically pays for itself within 6 months.", "Then don't buy", "Our price is fair"], correctIndex: 1, explanation: "Reframing price as an investment with measurable returns is more effective than discounting." },
          { question: "You need to follow up after a sales meeting. What's best?", options: ["Did you decide?", "Thank you for the meeting. I've attached a customized proposal based on our discussion.", "Call me back", "Any news?"], correctIndex: 1, explanation: "Following up with personalized materials shows professionalism and genuine interest." },
        ],
      },
      {
        type: "dialogue",
        title: "Sales Pitch to a New Client",
        dialogue: [
          { speaker: "Amina (You)", text: "Good morning, Mr. Diallo. Thank you for meeting with us. Before I present our solution, I'd like to understand your biggest challenge right now.", translation: "Bonjour, M. Diallo. Merci de nous avoir rencontrés. Avant de vous présenter notre solution, j'aimerais comprendre votre plus grand défi actuellement." },
          { speaker: "Mr. Diallo", text: "Our main challenge is reaching customers in rural areas. Traditional marketing doesn't work there.", translation: "Notre principal défi est d'atteindre les clients en zones rurales. Le marketing traditionnel ne fonctionne pas là-bas." },
          { speaker: "Amina (You)", text: "That's exactly where we can help. Our value proposition is mobile-first marketing — we reach 85% of mobile users in West Africa. Our conversion rate is 7%, compared to the industry average of 3%.", translation: "C'est exactement là que nous pouvons aider. Notre proposition de valeur est le marketing mobile-first — nous atteignons 85 % des utilisateurs mobiles en Afrique de l'Ouest. Notre taux de conversion est de 7 %, contre une moyenne du secteur de 3 %." },
          { speaker: "Mr. Diallo", text: "Impressive numbers. What about pricing?", translation: "Des chiffres impressionnants. Qu'en est-il des prix ?" },
          { speaker: "Amina (You)", text: "Our packages start at $5,000 per month. Based on your target audience of 2 million potential customers, the ROI would be approximately 300% within the first year. I've prepared a detailed proposal with a custom marketing plan for your specific market.", translation: "Nos forfaits commencent à 5 000 $ par mois. Compte tenu de votre public cible de 2 millions de clients potentiels, le retour sur investissement serait d'environ 300 % la première année. J'ai préparé une proposition détaillée avec un plan marketing personnalisé pour votre marché spécifique." },
        ],
        tutorTip: "Amina's approach is textbook sales: Listen first → Understand the problem → Present the solution with data → Address price with ROI → Close with a customized proposal. This framework works for any sales pitch.",
      },
    ],
  },
};
