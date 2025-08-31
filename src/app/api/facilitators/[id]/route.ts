import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateFacilitatorSchema = z.object({
  bio: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  socialMedia: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
  verified: z.boolean().optional(),
  subscriptionPlan: z.enum(['FREE', 'BASIC', 'PREMIUM']).optional(),
})

// GET /api/facilitators/[id] - Get facilitator profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const facilitator = await prisma.facilitator.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            createdAt: true,
          }
        },
        experiences: {
          include: {
            reviews: {
              select: {
                rating: true,
                title: true,
                content: true,
                user: {
                  select: {
                    name: true,
                    avatar: true,
                  }
                },
                createdAt: true,
              },
              orderBy: { createdAt: 'desc' },
              take: 10
            },
            _count: {
              select: {
                reviews: true,
                bookings: {
                  where: { status: 'CONFIRMED' }
                }
              }
            }
          },
          orderBy: [
            { featured: 'desc' },
            { createdAt: 'desc' }
          ]
        },
        _count: {
          select: {
            experiences: {
              where: { active: true }
            }
          }
        }
      }
    })

    if (!facilitator) {
      return NextResponse.json(
        { error: 'Facilitator not found' },
        { status: 404 }
      )
    }

    // Calculate average rating across all experiences
    const allReviews = facilitator.experiences.flatMap(exp => exp.reviews)
    const averageRating = allReviews.length > 0 
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length 
      : 0

    const facilitatorWithStats = {
      ...facilitator,
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: allReviews.length,
        totalExperiences: facilitator._count.experiences,
        totalBookings: facilitator.experiences.reduce((sum, exp) => sum + exp._count.bookings, 0)
      }
    }

    return NextResponse.json({
      success: true,
      facilitator: facilitatorWithStats
    })

  } catch (error) {
    console.error('Get facilitator profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/facilitators/[id] - Update facilitator profile
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

    // Check if facilitator exists
    const existingFacilitator = await prisma.facilitator.findUnique({
      where: { id: params.id }
    })

    if (!existingFacilitator) {
      return NextResponse.json(
        { error: 'Facilitator not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingFacilitator.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only update your own facilitator profile' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateFacilitatorSchema.safeParse(body)
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

    // Only admins can verify facilitators or change subscription plans
    if (!isAdmin) {
      delete updateData.verified
      delete updateData.subscriptionPlan
    }

    // Update facilitator
    const facilitator = await prisma.facilitator.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          }
        },
        _count: {
          select: {
            experiences: {
              where: { active: true }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      facilitator,
      message: 'Facilitator profile updated successfully'
    })

  } catch (error) {
    console.error('Update facilitator profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/facilitators/[id] - Delete facilitator profile
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

    // Check if facilitator exists
    const existingFacilitator = await prisma.facilitator.findUnique({
      where: { id: params.id }
    })

    if (!existingFacilitator) {
      return NextResponse.json(
        { error: 'Facilitator not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingFacilitator.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only delete your own facilitator profile' },
        { status: 403 }
      )
    }

    // Check if facilitator has active experiences or bookings
    const activeExperiences = await prisma.experience.count({
      where: { 
        facilitatorId: params.id, 
        active: true 
      }
    })

    const activeBookings = await prisma.booking.count({
      where: {
        experience: {
          facilitatorId: params.id
        },
        status: { in: ['PENDING', 'CONFIRMED'] }
      }
    })

    if (activeExperiences > 0 || activeBookings > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete facilitator profile with active experiences or bookings. Please deactivate all experiences and resolve pending bookings first.' 
        },
        { status: 400 }
      )
    }

    // Delete facilitator and update user role
    await prisma.$transaction([
      prisma.facilitator.delete({
        where: { id: params.id }
      }),
      prisma.user.update({
        where: { id: existingFacilitator.userId },
        data: { role: 'VISITOR' }
      })
    ])

    return NextResponse.json({
      success: true,
      message: 'Facilitator profile deleted successfully'
    })

  } catch (error) {
    console.error('Delete facilitator error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}