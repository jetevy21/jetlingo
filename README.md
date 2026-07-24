# JetLingo - AI Language Learning Platform

JetLingo is an innovative AI-powered language learning platform that combines conversational AI with personalized learning experiences. Practice real conversations with AI avatars, get instant feedback on pronunciation and grammar, and track your progress as you master a new language.

## Features

- **AI Conversation Practice**: Chat with unique AI avatars that adapt to your learning level and style
- **Pronunciation Feedback**: Real-time speech analysis with detailed scoring and improvement suggestions
- **Grammar Corrections**: Instant identification and explanation of grammar mistakes
- **Vocabulary Building**: Context-aware vocabulary suggestions and a personal dictionary
- **Personalized Learning Paths**: Lessons tailored to your goals (travel, work, exams, culture)
- **Progress Tracking**: Detailed statistics including streak, XP, and weekly progress
- **Multiple Languages**: Support for English, Spanish, French, Portuguese, German, Italian, Japanese, Korean, and Chinese
- **CEFR Level Assessment**: Automatic level determination and progression tracking
- **Subscription Tiers**: Free, Premium, Family, and Lifetime options

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI API for conversation generation
- **Authentication**: JWT with refresh tokens
- **State Management**: Zustand
- **UI Components**: shadcn/ui, Lucide icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jetlingo.git
   cd jetlingo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   cp apps/web/.env.example apps/web/.env
   ```

4. Configure your database and API keys in the `.env` files

5. Generate database schema:
   ```bash
   npm run db:generate
   ```

6. Run migrations:
   ```bash
   npm run db:migrate
   ```

7. Start the development servers:
   ```bash
   npm run dev
   ```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jetlingo

# Authentication
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Server
PORT=4000
NODE_ENV=development
```

### Frontend (.env)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:4000

# App
NEXT_PUBLIC_APP_NAME=JetLingo
```

## Project Structure

```
jetlingo/
├── apps/
│   ├── web/              # Next.js frontend application
│   └── backend/          # Express.js backend API
├── packages/
│   └── shared/           # Shared types, schemas, and utilities
├── package.json          # Root package.json with workspaces
├── tsconfig.base.json    # Base TypeScript configuration
└── README.md
```

### Shared Package

The `@jetlingo/shared` package contains:

- **types.ts**: TypeScript interfaces and types shared between frontend and backend
- **schemas.ts**: Zod validation schemas for API inputs
- **constants.ts**: Application constants (languages, levels, avatars, topics)
- **utils.ts**: Utility functions for formatting, styling, and common operations

## Contributing

We welcome contributions to JetLingo! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features when applicable
- Update documentation if needed
- Ensure all tests pass before submitting PR

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use functional components with hooks in React
- Keep components small and focused
- Extract reusable logic into custom hooks or utilities

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

- Check the [Issues](https://github.com/yourusername/jetlingo/issues) page
- Create a new issue with detailed information
- Join our community discussions

## Acknowledgments

- OpenAI for providing the AI conversation capabilities
- The open-source community for amazing tools and libraries
- All contributors who help improve JetLingo
