# Found3r - AI Cofounder Platform

Found3r is a production-grade AI cofounder platform that enables entrepreneurs to build startups with autonomous AI agents. The platform provides specialized AI agents that work as technical cofounders, handling everything from frontend development to backend architecture.

## 🚀 Features

- **Autonomous AI Agents**: Specialized agents for frontend, backend, design, DevOps, and product management
- **Orchestrator System**: Intelligent workflow management that coordinates multiple agents
- **Real-time Collaboration**: Live updates and communication with AI agents
- **Project Management**: Complete project lifecycle from idea to deployment
- **Modern UI/UX**: Beautiful dark theme interface with glass morphism effects
- **Scalable Architecture**: Built with Next.js 15, TypeScript, and Convex for optimal performance

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database & functions)
- **Authentication**: Clerk
- **UI Components**: Radix UI, Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd found3r
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
   - `CLERK_SECRET_KEY` - Your Clerk secret key
   - `OPENAI_API_KEY` - OpenAI API key for AI agents
   - `ANTHROPIC_API_KEY` - Anthropic API key for Claude agents

4. **Set up Convex**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

```
found3r/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── landing/           # Landing page components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── agents/            # AI agent components
│   │   ├── orchestrator/      # Orchestrator components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   └── types/                 # TypeScript type definitions
├── convex/                    # Convex backend
│   ├── schema/                # Database schema
│   └── functions/             # Server functions
└── public/                    # Static assets
```

## 🤖 AI Agents

### Available Agents

1. **Frontend Agent**: Builds responsive user interfaces with React, Vue, and Angular
2. **Backend Agent**: Develops server-side architecture and APIs
3. **Design Agent**: Creates UI/UX designs and prototypes
4. **DevOps Agent**: Manages deployment pipelines and infrastructure
5. **Full-Stack Agent**: Handles complete application development
6. **Product Agent**: Defines product strategy and growth initiatives

### Agent Capabilities

- **Code Generation**: Write, review, and optimize code
- **Architecture Design**: Plan scalable system architecture
- **Testing**: Implement comprehensive test suites
- **Deployment**: Automate CI/CD pipelines
- **Documentation**: Generate technical documentation

## 🎯 Orchestrator System

The orchestrator manages complex development workflows by:

1. **Phase Management**: Breaking projects into manageable phases
2. **Agent Coordination**: Assigning tasks to appropriate agents
3. **Progress Tracking**: Real-time monitoring of development progress
4. **Error Handling**: Automatic recovery and fallback mechanisms
5. **Resource Optimization**: Efficient allocation of AI resources

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run convex:dev` - Start Convex development server
- `npm run convex:deploy` - Deploy Convex functions

### Environment Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Webhooks
CLERK_WEBHOOK_SECRET=whsec_...
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy Convex**
   ```bash
   npm run convex:deploy
   ```

3. **Start production server**
   ```bash
   npm run start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@found3r.ai
- 💬 Discord: [Join our community](https://discord.gg/found3r)
- 📖 Documentation: [docs.found3r.ai](https://docs.found3r.ai)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Convex](https://convex.dev/)
- Authentication by [Clerk](https://clerk.com/)
- UI components by [Shadcn/ui](https://ui.shadcn.com/)

---

**Found3r** - Build your startup with AI cofounders 🚀
