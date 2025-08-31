import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateSessionSchema = z.object({
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  maxCapacity: z.number().min(1).optional(),
  price: z.number().min(0).optional(),
  active: z.boolean().optional(),
})

// GET /api/sessions/[id] - Get specific session
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await prisma.experienceSession.findUnique({
      where: { id: params.id },
      include: {
        experience: {
          select: {
            id: true,
            title: true,
            slug: true,
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
        bookings: {
          where: {
            status: { in: ['PENDING', 'CONFIRMED'] }
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
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

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      session
    })

  } catch (error) {
    console.error('Get session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/sessions/[id] - Update session
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

    // Check if session exists
    const existingSession = await prisma.experienceSession.findUnique({
      where: { id: params.id },
      include: {
        experience: {
          include: {
            facilitator: true
          }
        }
      }
    })

    if (!existingSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isFacilitator = existingSession.experience.facilitator.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isFacilitator && !isAdmin) {
      return NextResponse.json(
        { error: 'Only the experience facilitator can update sessions' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateSessionSchema.safeParse(body)
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

    // Validate dates if updating
    if (updateData.startTime || updateData.endTime) {
      const startTime = updateData.startTime ? new Date(updateData.startTime) : existingSession.startTime
      const endTime = updateData.endTime ? new Date(updateData.endTime) : existingSession.endTime

      if (startTime < new Date()) {
        return NextResponse.json(
          { error: 'Session start time must be in the future' },
          { status: 400 }
        )
      }

      if (endTime && endTime <= startTime) {
        return NextResponse.json(
          { error: 'Session end time must be after start time' },
          { status: 400 }
        )
      }
    }

    // Check capacity constraints if reducing maxCapacity
    if (updateData.maxCapacity !== undefined && updateData.maxCapacity < existingSession.currentCount) {
      return NextResponse.json(
        { 
          error: `Cannot reduce capacity below current bookings (${existingSession.currentCount})` 
        },
        { status: 400 }
      )
    }

    // Update session
    const session = await prisma.experienceSession.update({
      where: { id: params.id },
      data: {
        ...updateData,
        startTime: updateData.startTime ? new Date(updateData.startTime) : undefined,
        endTime: updateData.endTime ? new Date(updateData.endTime) : undefined,
      },
      include: {
        experience: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        },
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
      message: 'Session updated successfully'
    })

  } catch (error) {
    console.error('Update session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/sessions/[id] - Delete session
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

    // Check if session exists
    const existingSession = await prisma.experienceSession.findUnique({
      where: { id: params.id },
      include: {
        experience: {
          include: {
            facilitator: true
          }
        },
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

    if (!existingSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isFacilitator = existingSession.experience.facilitator.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isFacilitator && !isAdmin) {
      return NextResponse.json(
        { error: 'Only the experience facilitator can delete sessions' },
        { status: 403 }
      )
    }

    // Check if session has active bookings
    if (existingSession._count.bookings > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete session with active bookings. Please cancel all bookings first.` 
        },
        { status: 400 }
      )
    }

    // Delete session
    await prisma.experienceSession.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Session deleted successfully'
    })

  } catch (error) {
    console.error('Delete session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}