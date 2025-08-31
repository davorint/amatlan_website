import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createGuideSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  content: z.string(),
  category: z.enum(['MEDITATION', 'CEREMONY', 'HEALING', 'NATURE', 'CULTURE', 'PREPARATION']),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  audioUrl: z.string().url().optional(),
  duration: z.number().min(1).optional(), // in minutes
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('BEGINNER'),
  featured: z.boolean().default(false),
})

// GET /api/guides - List guides with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    const tags = searchParams.get('tags')?.split(',')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: {
      category?: string
      difficulty?: string
      featured?: boolean
      published?: boolean
      tags?: { hasSome: string[] }
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' }
        description?: { contains: string; mode: 'insensitive' }
        content?: { contains: string; mode: 'insensitive' }
      }>
    } = {}
    
    if (category) where.category = category
    if (difficulty) where.difficulty = difficulty
    if (featured !== null) where.featured = featured === 'true'
    if (published !== null) where.published = published === 'true'
    if (tags?.length) where.tags = { hasSome: tags }
    
    // Search in title, description, and content
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const guides = await prisma.guide.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        tags: true,
        images: true,
        audioUrl: true,
        duration: true,
        difficulty: true,
        featured: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.guide.count({ where })

    return NextResponse.json({
      success: true,
      guides,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: unknown) {
    console.error('Get guides error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/guides - Create new guide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userRole } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check permissions - only facilitators and admins can create guides
    if (userRole !== 'FACILITATOR' && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to create guides' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = createGuideSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const guideData = validationResult.data

    // Check if slug is unique
    const existingGuide = await prisma.guide.findUnique({
      where: { slug: guideData.slug }
    })

    if (existingGuide) {
      return NextResponse.json(
        { error: 'Guide with this slug already exists' },
        { status: 409 }
      )
    }

    // Create guide
    const guide = await prisma.guide.create({
      data: {
        title: guideData.title,
        slug: guideData.slug,
        description: guideData.description,
        content: guideData.content,
        category: guideData.category,
        tags: guideData.tags || [],
        images: guideData.images || [],
        audioUrl: guideData.audioUrl,
        duration: guideData.duration,
        difficulty: guideData.difficulty,
        featured: guideData.featured,
        published: true,
      }
    })

    return NextResponse.json({
      success: true,
      guide,
      message: 'Guide created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create guide error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}