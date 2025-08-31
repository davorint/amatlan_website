import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const experience = await prisma.experience.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ],
        active: true
      },
      include: {
        facilitator: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                avatar: true,
              }
            }
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        sessions: {
          where: {
            active: true,
            startTime: {
              gte: new Date()
            }
          },
          orderBy: {
            startTime: 'asc'
          }
        }
      }
    })

    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating = experience.reviews.length > 0
      ? experience.reviews.reduce((sum, review) => sum + review.rating, 0) / experience.reviews.length
      : 0

    const experienceWithRating = {
      ...experience,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: experience.reviews.length,
    }

    return NextResponse.json({
      success: true,
      data: experienceWithRating
    })
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const {
      title,
      description,
      longDescription,
      category,
      subcategory,
      price,
      currency,
      duration,
      capacity,
      images,
      location,
      tags,
      featured,
      active
    } = body

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(longDescription && { longDescription }),
        ...(category && { category: category.toUpperCase() }),
        ...(subcategory && { subcategory }),
        ...(price !== undefined && { price: price ? parseFloat(price) : null }),
        ...(currency && { currency }),
        ...(duration && { duration }),
        ...(capacity !== undefined && { capacity: capacity ? parseInt(capacity) : null }),
        ...(images && { images }),
        ...(location && { location }),
        ...(tags && { tags }),
        ...(featured !== undefined && { featured }),
        ...(active !== undefined && { active })
      },
      include: {
        facilitator: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: experience
    })
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.experience.update({
      where: { id },
      data: { active: false }
    })

    return NextResponse.json({
      success: true,
      message: 'Experience deactivated successfully'
    })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}