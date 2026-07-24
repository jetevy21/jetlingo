const en = {
  // ── Navigation ──
  nav: {
    features: "Features",
    testimonials: "Testimonials",
    pricing: "Pricing",
    login: "Log in",
    getStarted: "Get Started",
  },

  // ── Hero ──
  hero: {
    badge: "AI-Powered Language Learning",
    titleLine1: "Speak like a native.",
    titleLine2: "Learn with AI.",
    subtitle:
      "Practice conversations with lifelike AI avatars. Get real-time feedback on pronunciation and grammar. Master any language naturally.",
    cta: "Start Learning Free",
    trust1: "No credit card required",
    trust2: "3 free conversations daily",
    trust3: "9 languages available",
  },

  // ── Features ──
  features: {
    title: "Why JetLingo?",
    subtitle:
      "The most immersive way to learn a language, powered by cutting-edge AI.",
    items: [
      {
        title: "3D Avatars",
        description:
          "Learn with lifelike AI characters who adapt to your level and interests.",
      },
      {
        title: "Real-time Feedback",
        description:
          "Get instant corrections on grammar, pronunciation, and vocabulary.",
      },
      {
        title: "9 Languages",
        description:
          "Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, English.",
      },
      {
        title: "Personalized Learning",
        description:
          "AI adapts lessons based on your progress, goals, and interests.",
      },
    ],
  },

  // ── Testimonials ──
  testimonials: {
    title: "Loved by learners worldwide",
    subtitle: "Join thousands of people learning languages with JetLingo.",
    items: [
      {
        name: "Sarah M.",
        role: "Learning Spanish",
        content:
          "JetLingo feels like talking to a real person. The avatars make practice so much more engaging!",
      },
      {
        name: "Michael K.",
        role: "Learning Japanese",
        content:
          "The real-time feedback has improved my pronunciation dramatically. Best language app I've used.",
      },
      {
        name: "Emma L.",
        role: "Learning French",
        content:
          "I love the gamification. The streaks and progress tracking keep me motivated every day.",
      },
    ],
  },

  // ── Pricing ──
  pricing: {
    title: "Simple, transparent pricing",
    subtitle: "Start free, upgrade when you need more.",
    popular: "Most Popular",
    plans: [
      {
        name: "Free",
        price: "0",
        period: "/mo",
        features: [
          "3 conversations per day",
          "Basic feedback",
          "1 avatar",
          "Community access",
        ],
        cta: "Start Free",
      },
      {
        name: "Premium",
        price: "8",
        period: "/mo",
        features: [
          "Unlimited conversations",
          "Advanced feedback",
          "All avatars",
          "Priority support",
          "Offline mode",
        ],
        cta: "Start Premium",
      },
      {
        name: "Family",
        price: "15",
        period: "/mo",
        features: [
          "Everything in Premium",
          "Up to 5 family members",
          "Family progress dashboard",
          "Parental controls",
        ],
        cta: "Start Family",
      },
    ],
  },

  // ── Auth ──
  auth: {
    login: {
      welcomeBack: "Welcome back to JetLingo",
      welcomeSubtitle: "Continue your language learning journey with AI-powered conversations.",
      title: "Sign in to your account",
      subtitle: "Enter your credentials to continue learning.",
      email: "Email",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      submit: "Sign in",
      submitLoading: "Signing in...",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      error: "Login failed",
    },
    register: {
      title: "Create your account",
      subtitle: "Get started with JetLingo for free.",
      journeyTitle: "Start your language journey",
      journeySubtitle: "Join thousands of learners mastering languages with AI.",
      benefits: [
        "3 free conversations daily",
        "Real-time pronunciation feedback",
        "Personal vocabulary dictionary",
        "Progress tracking & statistics",
      ],
      name: "Name",
      namePlaceholder: "John Doe",
      email: "Email",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      submit: "Create account",
      submitLoading: "Creating...",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
      error: "Registration failed",
    },
  },

  // ── Footer ──
  footer: {
    copyright: "© 2026 JetLingo. All rights reserved.",
  },

  // ── Sidebar ──
  sidebar: {
    dashboard: "Dashboard",
    lessons: "Lessons",
    practice: "Practice",
    dictionary: "Dictionary",
    statistics: "Statistics",
    settings: "Settings",
    logout: "Logout",
  },

  // ── Dashboard ──
  dashboard: {
    welcome: "Welcome back",
    welcomeSubtitle: "Continue your language learning journey.",
    startPractice: "Start Practice",
    minutesToday: "Minutes Today",
    vsLastWeek: "vs last week",
    wordsLearned: "Words Learned",
    thisWeek: "this week",
    sessions: "Sessions",
    dailyLesson: "Daily Lesson",
    restaurantTitle: "Ordering at a Restaurant",
    restaurantDesc: "Learn how to order food, ask about ingredients, and handle special dietary requirements.",
    min: "min",
    conversation: "Conversation",
    startLesson: "Start Lesson",
    continueLesson: "Continue",
    freeTalk: "Free Talk",
    freeTalkDesc: "Open conversation practice",
    practiceTopics: "Practice Topics",
    practiceTopicsDesc: "Structured topic practice",
    reviewWords: "Review Words",
    reviewWordsDesc: "Your saved vocabulary",
    dailyStreak: "Daily Streak",
    days: "days",
    last30days: "Last 30 days",
    longestStreak: "Longest streak",
    recentActivity: "Recent Activity",
    learningMinutes: "Daily Learning (minutes)",
    total: "Total",
    avg: "Avg",
  },

  // ── Settings ──
  settings: {
    title: "Settings",
    subtitle: "Manage your account and preferences.",
    profile: "Profile",
    name: "Name",
    email: "Email",
    languageSettings: "Language Settings",
    nativeLanguage: "Native Language",
    targetLanguage: "Target Language",
    currentLevel: "Current Level",
    accentPreference: "Accent Preference",
    audioSettings: "Audio Settings",
    autoPlayAudio: "Auto-play audio",
    autoPlayAudioDesc: "Automatically play AI responses",
    speechToText: "Speech-to-text",
    speechToTextDesc: "Enable voice input for conversations",
    saveChanges: "Save Changes",
    saving: "Saving...",
    saved: "Saved",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    passwordChanged: "Password changed",
    subscription: "Subscription",
    currentPlan: "Current Plan",
    manageSubscription: "Manage Subscription",
    upgradePlan: "Upgrade Plan",
    cancelSubscription: "Cancel Subscription",
    subscriptionActive: "Active",
    subscriptionCancelled: "Cancelled",
    languages: {
      en: "English",
      fr: "French",
      es: "Spanish",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
    },
    accents: {
      latin: "Latin American",
      european: "European",
      neutral: "Neutral",
    },
  },

  // ── Lessons ──
  lessons: {
    title: "Learning Path",
    subtitle: "Follow our structured curriculum to master Spanish.",
    overallProgress: "Overall Progress",
    lessonsCount: "lessons",
    categories: {
      Grammar: "Grammar",
      Vocabulary: "Vocabulary",
      Conversation: "Conversation",
      Pronunciation: "Pronunciation",
      "Exam Prep": "Exam Prep",
    },
    tutors: {
      "profesor-carlos": "Your main guide — pedagogical, patient, uses everyday metaphors",
      "maria-conversacion": "Your conversation partner — warm, expressive, loves cultural anecdotes",
      "diego-vocabulario": "Your vocabulary expert — meticulous, passionate about etymology",
      "sofia-pronunciacion": "Your pronunciation coach — demanding but kind, detail-oriented",
      "mateo-juegos": "Your challenge creator — playful, mischievous, turns learning into a game",
      "carmen-business": "Your business Spanish expert — professional, direct, results-oriented",
    },
    noLessons: "No lessons available for this language.",
    continueLesson: "Continue",
    startLesson: "Start Lesson",
  },

  // ── Practice ──
  practice: {
    title: "Practice",
    subtitle: "Choose a topic or start a free conversation to practice your skills.",
    freeTalk: "Free Talk",
    freeTalkDesc: "Start a conversation without a specific topic",
    topics: "Practice Topics",
    recommended: "Recommended for You",
    recommendedDesc: "Based on your recent practice, we recommend focusing on ",
  },

  // ── Dictionary ──
  dictionary: {
    title: "Dictionary",
    subtitle: "Your saved vocabulary words. Click a card to flip it.",
    export: "Export",
    search: "Search words...",
    addNew: "Add New Word",
    word: "Word",
    translation: "Translation",
    add: "Add",
    wordsCount: "word(s)",
  },

  // ── Stats ──
  stats: {
    title: "Statistics",
    subtitle: "Track your progress and celebrate your achievements.",
    totalMinutes: "Total Minutes",
    totalSessions: "Total Sessions",
    wordsLearned: "Words Learned",
    currentStreak: "Current Streak",
    days: "days",
    skillBreakdown: "Skill Breakdown",
    speaking: "Speaking",
    listening: "Listening",
    vocabulary: "Vocabulary",
    grammar: "Grammar",
    achievements: "Achievements",
    weeklyProgress: "Weekly Progress",
    milestones: {
      firstConversation: "First Conversation",
      streak7: "7-Day Streak",
      words100: "100 Words Learned",
      sessions50: "50 Sessions",
      perfectScore: "Perfect Score",
      streak30: "30-Day Streak",
    },
  },
};

export default en;
