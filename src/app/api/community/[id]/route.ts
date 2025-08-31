import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  type: z.enum(['DISCUSSION', 'STORY', 'QUESTION', 'GUIDE']).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

// GET /api/community/[id] - Get specific community post
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const post = await prisma.communityPost.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              }
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  }
                }
              },
              orderBy: { createdAt: 'asc' }
            }
          },
          where: {
            parentId: null // Only get top-level comments
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Community post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      post
    })

  } catch (error: unknown) {
    console.error('Get community post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/community/[id] - Update community post
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

    // Check if post exists
    const existingPost = await prisma.communityPost.findUnique({
      where: { id: params.id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Community post not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingPost.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only edit your own posts' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updatePostSchema.safeParse(body)
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

    // Update post
    const post = await prisma.communityPost.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      post,
      message: 'Community post updated successfully'
    })

  } catch (error: unknown) {
    console.error('Update community post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/community/[id] - Delete community post
export async function DELETE(
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

    // Check if post exists
    const existingPost = await prisma.communityPost.findUnique({
      where: { id: params.id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Community post not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingPost.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only delete your own posts' },
        { status: 403 }
      )
    }

    // Delete post and all related comments (cascade delete)
    await prisma.communityPost.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Community post deleted successfully'
    })

  } catch (error: unknown) {
    console.error('Delete community post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}