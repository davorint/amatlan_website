import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users - List users (admin only)
export async function GET(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { userRole } = body // In real app, get from JWT token

    // Check admin permissions
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const verified = searchParams.get('verified')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: {
      role?: string
      facilitator?: { verified: boolean }
    } = {}
    if (role) where.role = role
    if (verified !== null) where.facilitator = { verified: verified === 'true' }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        facilitator: {
          select: {
            id: true,
            verified: true,
            subscriptionPlan: true,
            bio: true,
            phone: true,
            website: true,
          }
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
            communityPosts: true,
            eventAttendees: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.user.count({ where })

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: unknown) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}