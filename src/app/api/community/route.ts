import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  type: z.enum(['DISCUSSION', 'STORY', 'QUESTION', 'GUIDE']).default('DISCUSSION'),
})

// GET /api/community - List community posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    const tags = searchParams.get('tags')?.split(',')
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: {
      type?: string
      featured?: boolean
      published?: boolean
      tags?: { hasSome: string[] }
      userId?: string
    } = {}
    
    if (type) where.type = type
    if (featured !== null) where.featured = featured === 'true'
    if (published !== null) where.published = published === 'true'
    if (tags?.length) where.tags = { hasSome: tags }
    if (userId) where.userId = userId

    const posts = await prisma.communityPost.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.communityPost.count({ where })

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: unknown) {
    console.error('Get community posts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/community - Create new community post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Validate input data
    const validationResult = createPostSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { title, content, images, tags, type } = validationResult.data

    // Create community post
    const post = await prisma.communityPost.create({
      data: {
        userId,
        title,
        content,
        images: images || [],
        tags: tags || [],
        type,
        published: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      post,
      message: 'Community post created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create community post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}