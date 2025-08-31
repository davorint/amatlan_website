import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createSessionSchema = z.object({
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  maxCapacity: z.number().min(1).optional(),
  price: z.number().min(0).optional(),
})

// GET /api/experiences/[id]/sessions - List sessions for experience
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const upcoming = searchParams.get('upcoming')
    const available = searchParams.get('available')

    // Check if experience exists
    const experience = await prisma.experience.findUnique({
      where: { id: params.id }
    })

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    const where: {
      experienceId: string
      active?: boolean
      startTime?: { gte: Date }
      OR?: Array<{ maxCapacity: null } | { AND: Array<{ maxCapacity: { not: null }; currentCount: { lt: { maxCapacity: boolean } } }> }>
    } = { experienceId: params.id }
    
    if (active !== null) where.active = active === 'true'
    
    // Filter upcoming sessions
    if (upcoming === 'true') {
      where.startTime = { gte: new Date() }
    }
    
    // Filter available sessions (has capacity)
    if (available === 'true') {
      where.OR = [
        { maxCapacity: null }, // No capacity limit
        {
          AND: [
            { maxCapacity: { not: null } },
            { currentCount: { lt: { maxCapacity: true } } }
          ]
        }
      ]
    }

    const sessions = await prisma.experienceSession.findMany({
      where,
      include: {
        _count: {
          select: {
            bookings: {
              where: {
                status: { in: ['PENDING', 'CONFIRMED'] }
              }
            }
          }
        }
      },
      orderBy: { startTime: 'asc' }
    })

    return NextResponse.json({
      success: true,
      sessions
    })

  } catch (error: unknown) {
    console.error('Get experience sessions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/experiences/[id]/sessions - Create new session
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { userId, userRole } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if experience exists and user has permissions
    const experience = await prisma.experience.findUnique({
      where: { id: params.id },
      include: {
        facilitator: true
      }
    })

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isFacilitator = experience.facilitator.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isFacilitator && !isAdmin) {
      return NextResponse.json(
        { error: 'Only the experience facilitator can create sessions' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = createSessionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { startTime, endTime, maxCapacity, price } = validationResult.data

    // Validate dates
    const start = new Date(startTime)
    const end = endTime ? new Date(endTime) : null

    if (start < new Date()) {
      return NextResponse.json(
        { error: 'Session start time must be in the future' },
        { status: 400 }
      )
    }

    if (end && end <= start) {
      return NextResponse.json(
        { error: 'Session end time must be after start time' },
        { status: 400 }
      )
    }

    // Create session
    const session = await prisma.experienceSession.create({
      data: {
        experienceId: params.id,
        startTime: start,
        endTime: end,
        maxCapacity,
        price: price ?? experience.price,
        currentCount: 0,
        active: true,
      },
      include: {
        _count: {
          select: {
            bookings: {
              where: {
                status: { in: ['PENDING', 'CONFIRMED'] }
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      session,
      message: 'Session created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}