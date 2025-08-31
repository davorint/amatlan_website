import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BookingStatus } from '@prisma/client'
import { z } from 'zod'

const createBookingSchema = z.object({
  experienceId: z.string().cuid(),
  sessionId: z.string().cuid().optional(),
  participants: z.number().min(1).max(20),
  specialRequests: z.string().optional(),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string(),
    name: z.string(),
  }),
})

// GET /api/bookings - List bookings with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const experienceId = searchParams.get('experienceId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: {
      userId?: string
      experienceId?: string
      status?: BookingStatus
    } = {}
    if (userId) where.userId = userId
    if (experienceId) where.experienceId = experienceId
    if (status) where.status = status as BookingStatus

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        experience: {
          select: {
            id: true,
            title: true,
            slug: true,
            images: true,
          }
        },
        session: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.booking.count({ where })

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: unknown) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create new booking
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
    const validationResult = createBookingSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { experienceId, sessionId, participants, specialRequests, contactInfo } = validationResult.data

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

    // Check session capacity if sessionId provided
    if (sessionId) {
      const session = await prisma.experienceSession.findUnique({
        where: { id: sessionId }
      })

      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        )
      }

      if (session.maxCapacity && session.currentCount + participants > session.maxCapacity) {
        return NextResponse.json(
          { error: 'Not enough spots available for this session' },
          { status: 400 }
        )
      }
    }

    // Calculate total price
    const unitPrice = sessionId ? 
      (await prisma.experienceSession.findUnique({ where: { id: sessionId } }))?.price || experience.price :
      experience.price

    const totalPrice = (unitPrice || 0) * participants

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        experienceId,
        sessionId,
        participants,
        totalPrice,
        specialRequests,
        contactInfo,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        experience: {
          select: {
            id: true,
            title: true,
            slug: true,
            images: true,
          }
        },
        session: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
          }
        }
      }
    })

    // Update session current count if sessionId provided
    if (sessionId) {
      await prisma.experienceSession.update({
        where: { id: sessionId },
        data: {
          currentCount: {
            increment: participants
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking created successfully'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}