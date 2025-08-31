import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Category } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const where: {
      active: boolean
      category?: Category
      featured?: boolean
    } = {
      active: true,
    }

    if (category) {
      where.category = category.toUpperCase() as Category
    }

    if (featured === 'true') {
      where.featured = true
    }

    const experiences = await prisma.experience.findMany({
      where,
      include: {
        facilitator: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              }
            }
          }
        },
        reviews: {
          select: {
            rating: true,
          }
        },
        _count: {
          select: {
            reviews: true,
          }
        }
      },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    // Calculate average rating for each experience
    const experiencesWithRating = experiences.map(experience => {
      const avgRating = experience.reviews.length > 0
        ? experience.reviews.reduce((sum, review) => sum + review.rating, 0) / experience.reviews.length
        : 0

      return {
        ...experience,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: experience._count.reviews,
      }
    })

    return NextResponse.json({
      success: true,
      data: experiencesWithRating,
      count: experiencesWithRating.length
    })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      longDescription,
      category,
      subcategory,
      price,
      currency = 'MXN',
      duration,
      capacity,
      images,
      location,
      tags,
      facilitatorId
    } = body

    // Validate required fields
    if (!title || !description || !category || !facilitatorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    const experience = await prisma.experience.create({
      data: {
        title,
        slug,
        description,
        longDescription,
        category: category.toUpperCase(),
        subcategory,
        price: price ? parseFloat(price) : null,
        currency,
        duration,
        capacity: capacity ? parseInt(capacity) : null,
        images: images || [],
        location,
        tags: tags || [],
        facilitatorId,
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
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}