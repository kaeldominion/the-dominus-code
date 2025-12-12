# The Dominus Code - Digital Fortress

> F*ck Monogamy. Build A Dynasty.

A brutalist luxury website for Spencer Tarring's book "The Dominus Code" - designed as a digital Elysium, not just an author website.

## 🏰 Architecture

```
The Dominus Code/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # The Gate (Landing)
│   │   ├── armory/             # Products & Sales
│   │   ├── calibration/        # Sovereignty Test
│   │   ├── council/            # High-Ticket Mentorship
│   │   ├── oath/               # The Oath Wall
│   │   ├── auth/               # Login/Register
│   │   └── dashboard/          # Member Dashboard
│   ├── components/
│   │   ├── ui/                 # Core UI components
│   │   ├── landing/            # Landing page sections
│   │   └── navigation/         # Header, Footer
│   └── lib/                    # Utilities & helpers
├── prisma/                     # Database schema
├── public/
│   ├── images/                 # Book covers, photos
│   ├── textures/               # Background textures
│   └── audio/                  # Ambient audio
└── ...
```

## 🎨 Design System

### Colors
- **Gold**: `#e5c372` - Primary accent, luxury
- **Blood**: `#8a0303` - Secondary accent, power
- **Obsidian**: `#050505` - Background, depth
- **Slate**: `#e6e6e6` - Text secondary
- **Ivory**: `#ffffff` - Text primary

### Typography
- **Display**: Cinzel (headings, titles)
- **Body**: Cormorant Garamond (paragraphs)
- **Impact**: Bebas Neue (numbers, emphasis)

### Features
- **Red Pill Toggle**: Switch between "Realist" and "Dominus" modes
- **Live Protocol Dashboard**: Real-time status display
- **The Oath Wall**: Digital monument for book owners
- **Sovereignty Test**: 10-question assessment funnel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or SQLite for development)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
STRIPE_SECRET_KEY="sk_..."
STRIPE_PUBLISHABLE_KEY="pk_..."
NEXT_PUBLIC_N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/..."
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

## 📁 Required Assets

Place these in the `public/` folder:

### Images (`public/images/`)
- `book-cover.jpg` - The Dominus Code book cover (your uploaded image)
- `author.jpg` - Author photo (optional)

### Textures (`public/textures/`)
- `dark-stone.jpg` - Background texture (your uploaded stone image)

### Audio (`public/audio/`)
- `ambient.mp3` - Subtle ambient audio (optional)

## 🔧 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Database**: Prisma + PostgreSQL
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Icons**: Lucide React

## 📊 Funnel Strategy

1. **Traffic** → Social media (TikTok/X)
2. **Landing** → TheDominusCode.com
3. **Capture** → Sovereignty Test
4. **Nurture** → 7-Day Protocol PDF
5. **Convert** → Book + Bundles
6. **Upsell** → Dominus OS
7. **Backend** → The Council (Mentorship)

## 🎯 Key Features

### The Gate (Landing)
- Cinematic hero with phased reveal
- Manifesto video section
- Live Protocol Dashboard
- Oath Wall preview

### The Armory (Products)
- First Edition Hardback ($49)
- Protocol Edition Bundle ($149)
- Dominus OS Notion Pack ($79)
- AXIS Ethos merchandise

### The Calibration (Assessment)
- 10-question Sovereignty Test
- Score categories: Sovereign, Awakening, Dormant, Asleep
- Email capture for results
- 7-Day Protocol PDF delivery

### The Council (High-Ticket)
- $497/month or $4,997/year
- Monthly live sessions
- Private community
- Direct access to Spencer
- Quarterly 1-on-1 calls

### The Oath Wall
- Book code verification
- Digital signature
- Permanent monument
- Tribe building

## 🔐 Authentication

- Email/password registration
- Google OAuth (optional)
- Protected dashboard routes
- Member-only content

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- Touch-friendly interactions

## 🚢 Deployment

Recommended: Vercel

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📝 License

© 2024 Spencer Tarring. All rights reserved.

---

**Strengthen the bloodline. Protect the name.**
