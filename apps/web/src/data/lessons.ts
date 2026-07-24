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
          { word: "Does he work?", options: ["Travaille-t-il ?"], pronunciation: "duh-z hee wuhk", example: "Does he work on Mondays?", exampleTranslation: "Travaille-t-il le lundi ?" },
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
};
