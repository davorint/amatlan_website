import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/events/[id]/register - Register for event
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    const { userId } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if event exists and is active
    const event = await prisma.event.findUnique({
      where: { id: params.id },
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

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    if (!event.active) {
      return NextResponse.json(
        { error: 'Event is no longer active' },
        { status: 400 }
      )
    }

    // Check if event has passed
    if (event.startDate < new Date()) {
      return NextResponse.json(
        { error: 'Cannot register for past events' },
        { status: 400 }
      )
    }

    // Check capacity
    if (event.maxCapacity && event._count.attendees >= event.maxCapacity) {
      return NextResponse.json(
        { error: 'Event is at full capacity' },
        { status: 400 }
      )
    }

    // Check if user is already registered
    const existingRegistration = await prisma.eventAttendee.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId: params.id
        }
      }
    })

    if (existingRegistration) {
      if (existingRegistration.status === 'CANCELLED') {
        // Reactivate cancelled registration
        const registration = await prisma.eventAttendee.update({
          where: {
            userId_eventId: {
              userId,
              eventId: params.id
            }
          },
          data: {
            status: 'REGISTERED'
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            },
            event: {
              select: {
                id: true,
                title: true,
                startDate: true,
                location: true,
              }
            }
          }
        })

        return NextResponse.json({
          success: true,
          registration,
          message: 'Successfully re-registered for event'
        })
      } else {
        return NextResponse.json(
          { error: 'You are already registered for this event' },
          { status: 409 }
        )
      }
    }

    // Create new registration
    const registration = await prisma.eventAttendee.create({
      data: {
        userId,
        eventId: params.id,
        status: 'REGISTERED'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        event: {
          select: {
            id: true,
            title: true,
            startDate: true,
            location: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      registration,
      message: 'Successfully registered for event'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Event registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id]/register - Unregister from event
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    const { userId } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if registration exists
    const existingRegistration = await prisma.eventAttendee.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId: params.id
        }
      }
    })

    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'You are not registered for this event' },
        { status: 404 }
      )
    }

    if (existingRegistration.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Registration is already cancelled' },
        { status: 400 }
      )
    }

    // Update status to cancelled instead of hard delete
    await prisma.eventAttendee.update({
      where: {
        userId_eventId: {
          userId,
          eventId: params.id
        }
      },
      data: {
        status: 'CANCELLED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unregistered from event'
    })

  } catch (error: unknown) {
    console.error('Event unregistration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}