import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }).optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().optional(),
  maxCapacity: z.number().min(1).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
})

// GET /api/events/[id] - Get specific event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
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

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      event
    })

  } catch (error) {
    console.error('Get event error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(
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

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check permissions - only admins can edit any event
    // In future: add event creator/facilitator permissions
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to edit events' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateEventSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const updateData = validationResult.data

    // Check slug uniqueness if updating slug
    if (updateData.slug && updateData.slug !== existingEvent.slug) {
      const slugExists = await prisma.event.findUnique({
        where: { slug: updateData.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Event with this slug already exists' },
          { status: 409 }
        )
      }
    }

    // Validate dates if updating
    if (updateData.startDate || updateData.endDate) {
      const startDate = updateData.startDate ? new Date(updateData.startDate) : existingEvent.startDate
      const endDate = updateData.endDate ? new Date(updateData.endDate) : existingEvent.endDate

      if (endDate && endDate <= startDate) {
        return NextResponse.json(
          { error: 'End date must be after start date' },
          { status: 400 }
        )
      }
    }

    // Update event
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...updateData,
        startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
        endDate: updateData.endDate ? new Date(updateData.endDate) : undefined,
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
      message: 'Event updated successfully'
    })

  } catch (error) {
    console.error('Update event error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Soft delete event
export async function DELETE(
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

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check permissions - only admins can delete events
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete events' },
        { status: 403 }
      )
    }

    // Soft delete by setting active to false
    await prisma.event.update({
      where: { id: params.id },
      data: {
        active: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    })

  } catch (error) {
    console.error('Delete event error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}