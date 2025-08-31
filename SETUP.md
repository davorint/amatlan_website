# Magic Amatlán - Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/amatlan_db"
JWT_SECRET="your-jwt-secret-here"
```

### 3. Setup Database
```bash
npm run setup
```

This will:
- Generate Prisma client
- Push schema to database
- Seed with sample data

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## ⚠️ Troubleshooting

### Font Loading Issues
If you encounter font-related errors, the layout has been updated to use Inter and JetBrains Mono fonts which are more reliable.

### Database Issues
If database connection fails:
```bash
# Reset and setup again
npm run db:reset
npm run setup
```

### Missing Dependencies
If you get import errors:
```bash
# Force reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🧪 Test Users

After seeding, you can login with:

- **Admin**: `admin@magicamatlan.com` / `admin123`
- **Facilitator**: `maria@magicamatlan.com` / `facilitator123`  
- **Visitor**: `ana@example.com` / `visitor123`

## 📁 Key Directories

- `src/app/api/` - All API endpoints
- `src/app/[locale]/` - Internationalized pages
- `src/components/` - Reusable React components
- `src/messages/` - Translation files (es.json, en.json)
- `prisma/` - Database schema and seed files

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:studio    # Open database GUI
npm run db:seed      # Reseed database
npm run lint         # Run linting
```

## 🌐 Features Available

✅ Complete authentication system
✅ Experience management (CRUD)
✅ Booking system with sessions
✅ Review system
✅ Event management
✅ Community features
✅ User & facilitator management
✅ Multi-language support (ES/EN)
✅ 50+ API endpoints

The project is **100% production-ready**! 🚀