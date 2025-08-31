import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
  participants: z.number().min(1).max(20).optional(),
  specialRequests: z.string().optional(),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string(),
    name: z.string(),
  }).optional(),
})

// GET /api/bookings/[id] - Get specific booking
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
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
            facilitator: {
              select: {
                id: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  }
                }
              }
            }
          }
        },
        session: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            maxCapacity: true,
            currentCount: true,
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      booking
    })

  } catch (error: unknown) {
    console.error('Get booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/bookings/[id] - Update booking
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    const { userId, userRole } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        experience: {
          include: {
            facilitator: true
          }
        },
        session: true
      }
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingBooking.userId === userId
    const isFacilitator = existingBooking.experience.facilitator?.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isFacilitator && !isAdmin) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateBookingSchema.safeParse(body)
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

    // Handle participant count changes for sessions
    if (updateData.participants && existingBooking.sessionId && updateData.participants !== existingBooking.participants) {
      const difference = updateData.participants - existingBooking.participants
      
      await prisma.experienceSession.update({
        where: { id: existingBooking.sessionId },
        data: {
          currentCount: {
            increment: difference
          }
        }
      })
    }

    // Handle cancellation - free up session spots
    if (updateData.status === 'CANCELLED' && existingBooking.sessionId && existingBooking.status !== 'CANCELLED') {
      await prisma.experienceSession.update({
        where: { id: existingBooking.sessionId },
        data: {
          currentCount: {
            decrement: existingBooking.participants
          }
        }
      })
    }

    // Update booking
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking updated successfully'
    })

  } catch (error: unknown) {
    console.error('Update booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - Cancel/Delete booking
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const body = await request.json()
    const { userId, userRole } = body // In real app, get from JWT token

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        experience: {
          include: {
            facilitator: true
          }
        }
      }
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingBooking.userId === userId
    const isFacilitator = existingBooking.experience.facilitator?.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isFacilitator && !isAdmin) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Free up session spots if applicable
    if (existingBooking.sessionId && existingBooking.status !== 'CANCELLED') {
      await prisma.experienceSession.update({
        where: { id: existingBooking.sessionId },
        data: {
          currentCount: {
            decrement: existingBooking.participants
          }
        }
      })
    }

    // Soft delete by updating status to CANCELLED instead of hard delete
    await prisma.booking.update({
      where: { id: params.id },
      data: {
        status: 'CANCELLED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully'
    })

  } catch (error: unknown) {
    console.error('Cancel booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}