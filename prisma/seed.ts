import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@magicamatlan.com' },
    update: {},
    create: {
      email: 'admin@magicamatlan.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // Create facilitator users
  const facilitatorPassword = await bcrypt.hash('facilitator123', 12)
  const facilitator1 = await prisma.user.upsert({
    where: { email: 'maria@magicamatlan.com' },
    update: {},
    create: {
      email: 'maria@magicamatlan.com',
      password: facilitatorPassword,
      name: 'María González',
      role: 'FACILITATOR',
    },
  })

  const facilitator2 = await prisma.user.upsert({
    where: { email: 'carlos@magicamatlan.com' },
    update: {},
    create: {
      email: 'carlos@magicamatlan.com',
      password: facilitatorPassword,
      name: 'Carlos Mendoza',
      role: 'FACILITATOR',
    },
  })

  // Create facilitator profiles
  const facilitatorProfile1 = await prisma.facilitator.upsert({
    where: { userId: facilitator1.id },
    update: {},
    create: {
      userId: facilitator1.id,
      bio: 'Maestra de temazcal con más de 15 años de experiencia en ceremonias ancestrales mexicanas. Especializada en sanación emocional y purificación espiritual.',
      phone: '+52 777 123 4567',
      website: 'https://maria-temazcal.com',
      verified: true,
      subscriptionPlan: 'PREMIUM',
      socialMedia: {
        facebook: 'https://facebook.com/maria.temazcal',
        instagram: 'https://instagram.com/maria_temazcal',
      },
    },
  })

  const facilitatorProfile2 = await prisma.facilitator.upsert({
    where: { userId: facilitator2.id },
    update: {},
    create: {
      userId: facilitator2.id,
      bio: 'Guía espiritual y sanador tradicional. Especializado en retiros de meditación, ceremonias con plantas sagradas y conexión con la naturaleza.',
      phone: '+52 777 987 6543',
      website: 'https://carlos-healing.com',
      verified: true,
      subscriptionPlan: 'BASIC',
      socialMedia: {
        instagram: 'https://instagram.com/carlos_healing',
        website: 'https://carlos-healing.com',
      },
    },
  })

  // Create sample experiences
  const temazcalExperience = await prisma.experience.create({
    data: {
      title: 'Temazcal Tradicional de Luna Llena',
      slug: 'temazcal-tradicional-luna-llena',
      description: 'Ceremonia ancestral de purificación en temazcal sagrado bajo la luna llena',
      longDescription: 'Una experiencia transformadora que combina la sabiduría ancestral mexicana con la energía de la luna llena. En esta ceremonia de 3 horas, serás guiado através de un proceso de purificación física, emocional y espiritual en nuestro temazcal tradicional construido con técnicas prehispánicas.',
      category: 'TEMAZCAL',
      subcategory: 'Ceremonia Lunar',
      price: 1200,
      duration: '3 horas',
      capacity: 12,
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
      ],
      location: {
        lat: 18.9547,
        lng: -99.0921,
        address: 'Amatlán de Quetzalcóatl, Tepoztlán, Morelos'
      },
      tags: ['temazcal', 'ceremonia', 'luna llena', 'purificación', 'ancestral'],
      featured: true,
      facilitatorId: facilitatorProfile1.id,
    },
  })

  const retreatExperience = await prisma.experience.create({
    data: {
      title: 'Retiro de Sanación y Meditación (3 días)',
      slug: 'retiro-sanacion-meditacion-3-dias',
      description: 'Retiro transformador de 3 días en las montañas sagradas de Amatlán',
      longDescription: 'Un retiro profundo diseñado para reconectarte contigo mismo y con la naturaleza. Incluye meditaciones guiadas, caminatas sagradas, ceremonias de cacao, temazcal, y sesiones de sanación energética. Todo en un ambiente seguro y contenido.',
      category: 'RETREAT',
      subcategory: 'Retiro Residencial',
      price: 8500,
      duration: '3 días, 2 noches',
      capacity: 8,
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
      ],
      location: {
        lat: 18.9547,
        lng: -99.0921,
        address: 'Centro de Retiros Corazón Sagrado, Amatlán de Quetzalcóatl'
      },
      tags: ['retiro', 'meditación', 'sanación', 'naturaleza', 'transformación'],
      featured: true,
      facilitatorId: facilitatorProfile2.id,
    },
  })

  // Create sample visitor users
  const visitorPassword = await bcrypt.hash('visitor123', 12)
  const visitor1 = await prisma.user.create({
    data: {
      email: 'ana@example.com',
      password: visitorPassword,
      name: 'Ana Rodríguez',
      role: 'VISITOR',
    },
  })

  const visitor2 = await prisma.user.create({
    data: {
      email: 'pedro@example.com',
      password: visitorPassword,
      name: 'Pedro Martínez',
      role: 'VISITOR',
    },
  })

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        userId: visitor1.id,
        experienceId: temazcalExperience.id,
        rating: 5,
        title: 'Experiencia transformadora',
        content: 'El temazcal con María fue increíble. Sentí una purificación profunda y una conexión especial con mis ancestros. Altamente recomendado.',
        verified: true,
      },
      {
        userId: visitor2.id,
        experienceId: retreatExperience.id,
        rating: 5,
        title: 'Retiro que cambió mi vida',
        content: 'Los tres días con Carlos fueron un regalo para mi alma. Las meditaciones, las caminatas y sobre todo el temazcal me ayudaron a encontrar paz interior.',
        verified: true,
      },
    ],
  })

  // Create sample event
  const event = await prisma.event.create({
    data: {
      title: 'Ceremonia de Equinoccio de Primavera',
      slug: 'ceremonia-equinoccio-primavera-2025',
      description: 'Celebración ancestral del equinoccio de primavera con temazcal, danzas sagradas y medicina tradicional',
      content: 'Una celebración comunitaria especial para recibir la energía renovadora del equinoccio de primavera. Incluye ceremonia de temazcal grupal, danzas tradicionales, música ancestral, y un círculo de medicina con plantas sagradas locales.',
      startDate: new Date('2025-03-21T09:00:00.000Z'),
      endDate: new Date('2025-03-21T18:00:00.000Z'),
      location: {
        lat: 18.9547,
        lng: -99.0921,
        address: 'Plaza Central, Amatlán de Quetzalcóatl, Morelos'
      },
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
      ],
      tags: ['equinoccio', 'ceremonia', 'comunidad', 'primavera', 'ancestral'],
      price: 500,
      maxCapacity: 50,
      featured: true,
    },
  })

  // Create sample community posts
  await prisma.communityPost.createMany({
    data: [
      {
        userId: visitor1.id,
        title: 'Mi primera experiencia en un temazcal',
        content: 'Quiero compartir con ustedes mi primera experiencia en un temazcal aquí en Amatlán. Fue algo completamente nuevo para mí y realmente transformador...',
        tags: ['experiencia', 'temazcal', 'primera vez'],
        type: 'STORY',
        featured: false,
      },
      {
        userId: facilitator1.id,
        title: 'La importancia de la preparación antes de un temazcal',
        content: 'Como facilitadora de temazcal, quiero compartir algunas recomendaciones importantes para prepararse antes de entrar a la ceremonia...',
        tags: ['preparación', 'temazcal', 'consejos'],
        type: 'GUIDE',
        featured: true,
      },
    ],
  })

  // Create sample guides
  await prisma.guide.createMany({
    data: [
      {
        title: 'Guía de Preparación para tu Primer Temazcal',
        slug: 'guia-preparacion-primer-temazcal',
        description: 'Todo lo que necesitas saber antes de participar en tu primera ceremonia de temazcal',
        content: 'El temazcal es una ceremonia sagrada que requiere preparación física, mental y espiritual. Aquí te compartimos una guía completa...',
        category: 'PREPARATION',
        tags: ['temazcal', 'preparación', 'principiantes'],
        difficulty: 'BEGINNER',
        duration: 10,
        featured: true,
      },
      {
        title: 'Meditación Básica: Conecta con tu Respiración',
        slug: 'meditacion-basica-respiracion',
        description: 'Aprende las técnicas fundamentales de meditación centrada en la respiración',
        content: 'La meditación con respiración consciente es una práctica fundamental que nos ayuda a centrar la mente y conectar con nuestro interior...',
        category: 'MEDITATION',
        tags: ['meditación', 'respiración', 'mindfulness'],
        difficulty: 'BEGINNER',
        duration: 15,
        featured: false,
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: admin@magicamatlan.com (password: admin123)`)
  console.log(`🧘 Facilitators: maria@magicamatlan.com, carlos@magicamatlan.com (password: facilitator123)`)
  console.log(`👥 Visitors: ana@example.com, pedro@example.com (password: visitor123)`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })