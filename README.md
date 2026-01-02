# Happy New 2026 - Interactive Mood Experience

A premium, full-stack web application that creates a personalized journey into 2026. Users enter their name, choose their mood, and experience a stunning countdown with mood-specific animations and effects.

## ✨ Features

### User Journey
1. **Identity** (`/enter`): Enter your name to begin
2. **Mood Selection** (`/mood`): Choose from 4 unique moods
3. **Experience** (`/experience`): Personalized countdown with your name and mood
4. **Celebration**: Confetti animation at midnight!

### 🎭 Mood System
Each mood delivers a unique visual experience:

| Mood | Message | Background Effect |
|------|---------|-------------------|
| 🔥 **Ambitious** | Build. Push. Win. | Physics-based Ballpit |
| 🌿 **Calm** | Stay calm. Stay focused. | Fluid SplashCursor |
| 🚀 **Bold** | No limits. | Morphing BlobCursor |
| 🌙 **Minimal** | 2026 begins. | Ethereal LightRays |

### Backend
- **User Registration**: Names stored in PostgreSQL
- **Mood Persistence**: User mood choices saved
- **Admin Dashboard**: `/users` page to view all registrations

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **GSAP** (advanced animations)

### 3D/WebGL Backgrounds
- **Three.js** + **@react-three/fiber**
- **OGL** (lightweight WebGL)

### Backend
- **Prisma ORM**
- **Vercel Postgres**
- **Next.js API Routes**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Vercel account (for Postgres)

### Installation

1. **Clone and install**:
```bash
cd "Happy New 2026"
npm install
```

2. **Connect Vercel Postgres**:
```bash
vercel link
vercel env pull .env
```

3. **Push database schema**:
```bash
npx prisma db push
```

4. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start your journey!

## 📂 Project Structure

```
app/
├── api/
│   ├── register/route.ts      # POST: Register user
│   └── users/
│       ├── route.ts           # GET: List all users
│       └── [id]/mood/route.ts # PATCH: Update mood
├── enter/page.tsx             # Name input
├── mood/page.tsx              # Mood selection
├── experience/page.tsx        # Countdown + effects
├── users/page.tsx             # Admin page
└── layout.tsx

components/
├── click-spark.tsx            # Click interaction
├── shiny-text.tsx             # Metallic text effect
├── text-type.tsx              # Typing animation
├── countdown.tsx              # Countdown timer
├── confetti.tsx               # Celebration effect
├── three-background.tsx       # Background orchestrator
├── ballpit.tsx                # Ambitious mood
├── splash-cursor.tsx          # Calm mood
├── blob-cursor.tsx            # Bold mood
└── light-rays.tsx             # Minimal mood

lib/
├── prisma.ts                  # Database client
├── mood-config.ts             # Mood definitions
└── utils.ts

prisma/
└── schema.prisma              # Database schema
```

## 🗄️ Database Setup

### Local Development (SQLite)
By default, the project is configured to use **SQLite** for easy local testing.
The database file is created at `prisma/dev.db`.

### Production Deployment (Vercel Postgres)
Before deploying to Vercel, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  mood      String?  // ambitious | calm | bold | minimal
  createdAt DateTime @default(now())
}
```

## 🌐 API Endpoints

### POST `/api/register`
Register a new user.
```json
{ "name": "Ahmed" }
→ { "success": true, "user": { "id": 1, "name": "Ahmed" } }
```

### PATCH `/api/users/[id]/mood`
Update user's mood.
```json
{ "mood": "bold" }
→ { "success": true, "user": { "id": 1, "mood": "bold" } }
```

### GET `/api/users`
List all registered users (admin).

## 🚢 Deployment (Vercel)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. **Import in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository

3. **Add Vercel Postgres**:
   - Go to **Storage** tab
   - Click **Create Database** → **Postgres** → **Create**
   - Environment variables are auto-injected

4. **Deploy**:
   - Vercel will run `prisma generate && next build`
   - Your app is live!

## 🎨 Customization

### Environment Variables
```bash
POSTGRES_PRISMA_URL=...      # Connection pooling
POSTGRES_URL_NON_POOLING=... # Direct connection (migrations)
```

### Modify Moods
Edit `lib/mood-config.ts` to customize colors, messages, and effects.

## 📄 License

Open source for personal and educational use.

---

**Happy New 2026!** 🎉 *One user. One mood. One journey.*
