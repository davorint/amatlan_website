import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateCommentSchema = z.object({
  content: z.string().min(1),
})

// GET /api/comments/[id] - Get specific comment
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const comment = await prisma.postComment.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        post: {
          select: {
            id: true,
            title: true,
          }
        },
        parent: {
          select: {
            id: true,
            content: true,
            user: {
              select: {
                name: true,
              }
            }
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
      }
    })

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      comment
    })

  } catch (error: unknown) {
    console.error('Get comment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/comments/[id] - Update comment
export async function PUT(
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

    // Check if comment exists
    const existingComment = await prisma.postComment.findUnique({
      where: { id: params.id }
    })

    if (!existingComment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingComment.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only edit your own comments' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateCommentSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { content } = validationResult.data

    // Update comment
    const comment = await prisma.postComment.update({
      where: { id: params.id },
      data: { content },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        post: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      comment,
      message: 'Comment updated successfully'
    })

  } catch (error: unknown) {
    console.error('Update comment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/comments/[id] - Delete comment
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

    // Check if comment exists
    const existingComment = await prisma.postComment.findUnique({
      where: { id: params.id },
      include: {
        replies: true
      }
    })

    if (!existingComment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isOwner = existingComment.userId === userId
    const isAdmin = userRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You can only delete your own comments' },
        { status: 403 }
      )
    }

    // Check if comment has replies
    if (existingComment.replies.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete comment with replies. Delete replies first.' },
        { status: 400 }
      )
    }

    // Delete comment
    await prisma.postComment.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    })

  } catch (error: unknown) {
    console.error('Delete comment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}