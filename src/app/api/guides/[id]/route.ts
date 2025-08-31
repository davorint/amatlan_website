import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateGuideSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  category: z.enum(['MEDITATION', 'CEREMONY', 'HEALING', 'NATURE', 'CULTURE', 'PREPARATION']).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  audioUrl: z.string().url().optional(),
  duration: z.number().min(1).optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

// GET /api/guides/[id] - Get specific guide
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const guide = await prisma.guide.findUnique({
      where: { id: params.id }
    })

    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }

    // Only return published guides unless user is admin or has special access
    // For now, returning all guides - in production, add proper access control
    return NextResponse.json({
      success: true,
      guide
    })

  } catch (error) {
    console.error('Get guide error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/guides/[id] - Update guide
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

    // Check if guide exists
    const existingGuide = await prisma.guide.findUnique({
      where: { id: params.id }
    })

    if (!existingGuide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }

    // Check permissions - only facilitators and admins can edit guides
    // In future: add guide author permissions
    if (userRole !== 'FACILITATOR' && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to edit guides' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateGuideSchema.safeParse(body)
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
    if (updateData.slug && updateData.slug !== existingGuide.slug) {
      const slugExists = await prisma.guide.findUnique({
        where: { slug: updateData.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Guide with this slug already exists' },
          { status: 409 }
        )
      }
    }

    // Only admins can feature guides
    if (updateData.featured && userRole !== 'ADMIN') {
      delete updateData.featured
    }

    // Update guide
    const guide = await prisma.guide.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      guide,
      message: 'Guide updated successfully'
    })

  } catch (error) {
    console.error('Update guide error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/guides/[id] - Soft delete guide
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

    // Check if guide exists
    const existingGuide = await prisma.guide.findUnique({
      where: { id: params.id }
    })

    if (!existingGuide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }

    // Check permissions - only admins can delete guides
    // In future: add guide author permissions
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete guides' },
        { status: 403 }
      )
    }

    // Soft delete by setting published to false
    await prisma.guide.update({
      where: { id: params.id },
      data: {
        published: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Guide deleted successfully'
    })

  } catch (error) {
    console.error('Delete guide error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}