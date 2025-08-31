import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createFacilitatorSchema = z.object({
  bio: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  socialMedia: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
})

// GET /api/facilitators - List facilitators
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const verified = searchParams.get('verified')
    const subscriptionPlan = searchParams.get('subscriptionPlan')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: {
      verified?: boolean
      subscriptionPlan?: string
    } = {}
    if (verified !== null) where.verified = verified === 'true'
    if (subscriptionPlan) where.subscriptionPlan = subscriptionPlan

    const facilitators = await prisma.facilitator.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            createdAt: true,
          }
        },
        experiences: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            featured: true,
            active: true,
            images: true,
          },
          where: { active: true },
          orderBy: { featured: 'desc' },
          take: 5
        },
        _count: {
          select: {
            experiences: {
              where: { active: true }
            }
          }
        }
      },
      orderBy: [
        { verified: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.facilitator.count({ where })

    return NextResponse.json({
      success: true,
      facilitators,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: unknown) {
    console.error('Get facilitators error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/facilitators - Register as facilitator
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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { facilitator: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user is already a facilitator
    if (user.facilitator) {
      return NextResponse.json(
        { error: 'User is already registered as a facilitator' },
        { status: 409 }
      )
    }

    // Validate input data
    const validationResult = createFacilitatorSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const facilitatorData = validationResult.data

    // Create facilitator profile and update user role
    const [facilitator] = await prisma.$transaction([
      prisma.facilitator.create({
        data: {
          userId,
          ...facilitatorData,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            }
          }
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { role: 'FACILITATOR' }
      })
    ])

    return NextResponse.json({
      success: true,
      facilitator,
      message: 'Facilitator profile created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create facilitator error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}