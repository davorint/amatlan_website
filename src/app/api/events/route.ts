import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createEventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  content: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }).optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().default('MXN'),
  maxCapacity: z.number().min(1).optional(),
  featured: z.boolean().default(false),
})

// GET /api/events - List events with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')
    const upcoming = searchParams.get('upcoming')
    const tags = searchParams.get('tags')?.split(',')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    
    if (featured !== null) where.featured = featured === 'true'
    if (active !== null) where.active = active === 'true'
    if (tags?.length) where.tags = { hasSome: tags }
    
    // Filter upcoming events
    if (upcoming === 'true') {
      where.startDate = { gte: new Date() }
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        _count: {
          select: {
            attendees: {
              where: {
                status: { in: ['REGISTERED', 'CONFIRMED'] }
              }
            }
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { startDate: 'asc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.event.count({ where })

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get events error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/events - Create new event
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

    // Check permissions - only facilitators and admins can create events
    if (userRole !== 'FACILITATOR' && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to create events' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = createEventSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const eventData = validationResult.data

    // Check if slug is unique
    const existingEvent = await prisma.event.findUnique({
      where: { slug: eventData.slug }
    })

    if (existingEvent) {
      return NextResponse.json(
        { error: 'Event with this slug already exists' },
        { status: 409 }
      )
    }

    // Validate dates
    const startDate = new Date(eventData.startDate)
    const endDate = eventData.endDate ? new Date(eventData.endDate) : null

    if (endDate && endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        title: eventData.title,
        slug: eventData.slug,
        description: eventData.description,
        content: eventData.content,
        startDate,
        endDate,
        location: eventData.location,
        images: eventData.images || [],
        tags: eventData.tags || [],
        price: eventData.price,
        currency: eventData.currency,
        maxCapacity: eventData.maxCapacity,
        featured: eventData.featured,
      },
      include: {
        _count: {
          select: {
            attendees: {
              where: {
                status: { in: ['REGISTERED', 'CONFIRMED'] }
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      event,
      message: 'Event created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}