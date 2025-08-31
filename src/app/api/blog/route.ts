import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createBlogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
})

// GET /api/blog - List blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    const tags = searchParams.get('tags')?.split(',')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: { 
      category?: string
      featured?: boolean
      published?: boolean
      tags?: { hasSome: string[] }
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' }
        excerpt?: { contains: string; mode: 'insensitive' }
        content?: { contains: string; mode: 'insensitive' }
      }>
    } = {}
    
    if (category) where.category = category
    if (featured !== null) where.featured = featured === 'true'
    if (published !== null) where.published = published === 'true'
    if (tags?.length) where.tags = { hasSome: tags }
    
    // Search in title, excerpt, and content
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        category: true,
        featured: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.blogPost.count({ where })

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
    console.error('Get blog posts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create new blog post
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

    // Check permissions - only facilitators and admins can create blog posts
    if (userRole !== 'FACILITATOR' && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to create blog posts' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = createBlogPostSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const postData = validationResult.data

    // Check if slug is unique
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: postData.slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'Blog post with this slug already exists' },
        { status: 409 }
      )
    }

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        content: postData.content,
        coverImage: postData.coverImage,
        images: postData.images || [],
        tags: postData.tags || [],
        category: postData.category,
        featured: postData.featured,
        published: postData.published,
        publishedAt: postData.published ? new Date() : null,
      }
    })

    return NextResponse.json({
      success: true,
      post,
      message: 'Blog post created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}