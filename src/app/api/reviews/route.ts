import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createReviewSchema = z.object({
  experienceId: z.string().cuid(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().optional(),
  images: z.array(z.string().url()).optional(),
})

// GET /api/reviews - List reviews with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const experienceId = searchParams.get('experienceId')
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const verified = searchParams.get('verified')

    const where: {
      experienceId?: string
      userId?: string
      verified?: boolean
    } = {}
    if (experienceId) where.experienceId = experienceId
    if (userId) where.userId = userId
    if (verified !== null) where.verified = verified === 'true'

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        experience: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.review.count({ where })

    return NextResponse.json({
      success: true,
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: unknown) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create new review
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
    const validationResult = createReviewSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { experienceId, rating, title, content, images } = validationResult.data

    // Check if experience exists
    const experience = await prisma.experience.findUnique({
      where: { id: experienceId }
    })

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    // Check if user already reviewed this experience
    const existingReview = await prisma.review.findUnique({
      where: { 
        userId_experienceId: { 
          userId, 
          experienceId 
        } 
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this experience' },
        { status: 409 }
      )
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId,
        experienceId,
        rating,
        title,
        content,
        images: images || [],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        experience: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      review,
      message: 'Review created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}