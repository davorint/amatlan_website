# Magic Amatlán 🌟

**Spiritual Wellness Directory for Amatlán de Quetzalcóatl, Morelos, Mexico**

A luxurious, immersive web platform showcasing transformative spiritual experiences, sacred Temazcal ceremonies, healing retreats, and mystical nature-based activities in the sacred heart of Mexico. Built with cutting-edge technology and an ethereal minimalism design philosophy.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-orange?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.23.12-purple?logo=framer&logoColor=white)](https://motion.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## ✨ Features

### 🎯 **Core Experience Platform**
- **Sacred Experiences**: Temazcales, Spiritual Retreats, Eco-Lodges, Traditional Healers, Nature Ceremonies
- **Facilitator Hub**: Comprehensive dashboard for spiritual guides and experience providers
- **Community Sanctuary**: Events calendar, spiritual forum, transformation stories, wisdom guides
- **Intuitive Discovery**: Advanced search with spiritual filters and sacred location mapping
- **Seamless Reservations**: Integrated booking system with secure payment processing
- **Authentic Reviews**: Community-driven rating system for genuine experiences
- **Bilingual Harmony**: Full Spanish/English support with cultural sensitivity

### 🚀 **Technical Excellence**
- **Luxury Design System**: Glass morphism with prismatic orange color palette and kinetic typography
- **Modern Architecture**: Next.js 15.5 App Router with React 19 Server Components
- **Type-Safe Development**: Complete TypeScript implementation with strict mode
- **Premium Animations**: Motion (Framer Motion 12.23+) with physics-based interactions
- **Database Power**: PostgreSQL with Prisma ORM for scalable data management
- **Component Library**: shadcn/ui with custom Amatlan spiritual design tokens
- **API First**: RESTful endpoints with TypeScript validation and error handling
- **Performance Optimized**: Image optimization, lazy loading, and edge computing ready

## 🛠 **Technology Stack**

### **Frontend Excellence**
| Technology | Version | Purpose |
|------------|---------|----------|
| **Next.js** | `15.5.2` | Full-stack React framework with App Router |
| **React** | `19.1.0` | UI library with Server Components |
| **TypeScript** | `5.0+` | Type-safe development |
| **Tailwind CSS** | `4.1.12` | Utility-first styling with custom design system |
| **Motion** | `12.23.12` | Physics-based animations and micro-interactions |
| **next-intl** | `4.3.5` | Internationalization with URL-based routing |
| **Lucide React** | `0.542.0` | Beautiful, consistent icons |

### **Backend & Database**
| Technology | Version | Purpose |
|------------|---------|----------|
| **Prisma** | `6.15.0` | Type-safe database ORM and migrations |
| **PostgreSQL** | Latest | Production-ready relational database |
| **API Routes** | Native | RESTful API with Next.js route handlers |

### **UI Components & Design**
| Component | Purpose |
|-----------|----------|
| **shadcn/ui** | Accessible, customizable component library |
| **Radix UI** | Unstyled, accessible primitives |
| **Class Variance Authority** | Component variant management |
| **Tailwind Merge** | Conflict-free utility class merging |

### **Development Tools**
- **ESLint** with Next.js configuration
- **TypeScript** strict mode with path mapping
- **tw-animate-css** for advanced CSS animations
- **Prisma Studio** for database visualization

## 🚀 **Quick Start Guide**

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** `20.0+` (LTS recommended)
- **npm** `10.0+` or **pnpm** `8.0+`
- **PostgreSQL** database (local or cloud)

> 💡 **Recommended**: Use [Neon](https://neon.tech) for serverless PostgreSQL

### **Installation**

#### **1. Clone & Install**
```bash
# Clone the repository
git clone https://github.com/your-org/magic-amatlan-website.git
cd magic-amatlan-website

# Install dependencies
npm install
```

#### **2. Environment Configuration**
```bash
# Create environment file
cp .env.example .env.local
```

**Required Environment Variables:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/amatlan_db"

# Authentication (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional APIs
WEATHER_API_KEY="your-openweather-api-key"        # Weather integration
MAPBOX_ACCESS_TOKEN="your-mapbox-token"           # Interactive maps
STRIPE_SECRET_KEY="sk_test_..."                   # Payment processing
RESEND_API_KEY="re_..."                           # Email notifications
```

#### **3. Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data (optional)
npm run db:seed

# Open Prisma Studio (optional)
npm run db:studio
```

#### **4. Start Development**
```bash
# Start development server
npm run dev

# Open your browser
open http://localhost:3000
```

🎉 **You're ready!** The application will be running with hot-reload enabled.

### **Verification Checklist**
- [ ] Home page loads with spiritual animations
- [ ] Language switching works (ES/EN)
- [ ] Database connection successful
- [ ] API endpoints respond correctly
- [ ] Mobile responsive design functions

## 📁 Project Structure

```
/amatlan_website
├── /src                     # Source code directory
│   ├── /app                 # Next.js 15 App Router
│   │   ├── /[locale]        # Internationalized routes (es/en)
│   │   │   ├── /temazcales  # Temazcal experiences
│   │   │   ├── /retreats    # Spiritual retreats  
│   │   │   ├── /eco-stays   # Sustainable accommodations
│   │   │   ├── /healers     # Traditional healers
│   │   │   ├── /nature      # Nature experiences
│   │   │   ├── /events      # Community events
│   │   │   ├── /guides      # Knowledge hub
│   │   │   ├── /community   # Forum and stories
│   │   │   ├── /facilitators # Provider management
│   │   │   ├── page.tsx     # Homepage
│   │   │   └── layout.tsx   # Locale layout
│   │   ├── /api             # API routes
│   │   └── globals.css      # Global styles
│   ├── /components          # React components
│   │   ├── /ui             # shadcn/ui components
│   │   ├── /layout         # Header, Footer, Navigation
│   │   ├── /homepage       # Homepage components
│   │   └── /experiences    # Experience-related components
│   ├── /i18n               # Internationalization
│   │   ├── routing.ts      # Route configurations
│   │   └── request.ts      # Server-side i18n config
│   ├── /messages           # Translation files
│   │   ├── es.json         # Spanish translations
│   │   └── en.json         # English translations
│   ├── /lib                # Utility libraries
│   │   ├── utils.ts        # shadcn/ui utilities
│   │   ├── prisma.ts       # Prisma client
│   │   └── /api            # API helpers
│   └── middleware.ts       # Next-intl middleware
├── /prisma                 # Database schema and migrations
├── /public                 # Static assets
├── /data                   # Sample data for development
└── /docs                   # Documentation
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Run database migrations

## 🗄 Database Schema

The application uses a comprehensive Prisma schema with the following main models:

### Core Models
- **User**: User accounts and authentication
- **Facilitator**: Experience providers and their details
- **Experience**: Main content (temazcales, retreats, etc.)
- **Review**: User reviews and ratings
- **Booking**: Reservation management

### Content Models
- **Event**: Community events and calendar
- **Guide**: Educational content and articles
- **BlogPost**: Journal and blog entries
- **CommunityPost**: Forum discussions

### Configuration
- **SiteConfig**: Application settings and configuration

## 🎨 Theming

The application uses custom Amatlan-inspired colors:

```css
/* Brand Colors */
--color-earth-brown: oklch(0.5 0.1 30);
--color-nature-green: oklch(0.6 0.15 130);
--color-spiritual-gold: oklch(0.8 0.12 65);
--color-water-blue: oklch(0.7 0.08 220);
--color-sunset-orange: oklch(0.7 0.15 45);
```

## 🔌 API Endpoints

### Experiences
- `GET /api/experiences` - List experiences with filtering
- `GET /api/experiences/[id]` - Get single experience
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/[id]` - Update experience
- `DELETE /api/experiences/[id]` - Deactivate experience

### Weather
- `GET /api/weather` - Get current weather for Amatlán

More endpoints available for events, facilitators, community, etc.

## 🌍 Internationalization

The website supports both Spanish (default) and English with full URL localization:

### URL Structure
- **Spanish (Default)**: `/es/temazcales`, `/es/retiros`, `/es/sanadores`
- **English**: `/en/temazcales`, `/en/retreats`, `/en/healers`

### Language Switching
- Language selector in the header (desktop and mobile)
- Automatic locale detection based on browser preferences
- Persistent language preference across sessions

### Adding Translations
1. Update translation files in `/messages/`:
   - `es.json` for Spanish
   - `en.json` for English
2. Use the `useTranslations` hook in components
3. Add new routes to `/i18n/routing.ts` if needed

### Translation Example
```tsx
import { useTranslations } from 'next-intl'

function MyComponent() {
  const t = useTranslations('Navigation')
  return <span>{t('home')}</span> // "Inicio" (ES) or "Home" (EN)
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm run start
   ```

## 📱 Features Roadmap

### Phase 1 (Current)
- ✅ Basic website structure
- ✅ Experience listings and details
- ✅ Responsive design
- ✅ API foundation

### Phase 2 (Next)
- 🔄 User authentication
- 🔄 Booking system
- 🔄 Payment integration
- 🔄 Email notifications

### Phase 3 (Future)
- 📅 Calendar integration
- 🗺️ Interactive maps
- 📱 Mobile app
- 🔍 Advanced search

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: info@magicamatlan.mx
- Documentation: `/docs` folder

## 🙏 Acknowledgments

- **Amatlán Community**: For inspiration and cultural guidance
- **shadcn/ui**: For beautiful UI components
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
