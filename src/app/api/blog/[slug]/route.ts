import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateBlogPostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  coverImage: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

// GET /api/blog/[slug] - Get specific blog post by slug
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Only return published posts unless user has special access
    // In production, add proper access control based on user role
    if (!post.published) {
      return NextResponse.json(
        { error: 'Blog post not available' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      post
    })

  } catch (error: unknown) {
    console.error('Get blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[slug] - Update blog post
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
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

    // Check if blog post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: params.slug }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Check permissions - only admins can edit blog posts
    // In future: add author permissions
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to edit blog posts' },
        { status: 403 }
      )
    }

    // Validate input data
    const validationResult = updateBlogPostSchema.safeParse(body)
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
    if (updateData.slug && updateData.slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug: updateData.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Blog post with this slug already exists' },
          { status: 409 }
        )
      }
    }

    // Handle publishedAt timestamp
    let publishedAt = existingPost.publishedAt
    if (updateData.published !== undefined) {
      if (updateData.published && !existingPost.published) {
        // Publishing for first time
        publishedAt = new Date()
      } else if (!updateData.published) {
        // Unpublishing
        publishedAt = null
      }
    }

    // Update blog post
    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        ...updateData,
        publishedAt,
      }
    })

    return NextResponse.json({
      success: true,
      post,
      message: 'Blog post updated successfully'
    })

  } catch (error: unknown) {
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[slug] - Delete blog post
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
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

    // Check if blog post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: params.slug }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Check permissions - only admins can delete blog posts
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete blog posts' },
        { status: 403 }
      )
    }

    // Delete blog post
    await prisma.blogPost.delete({
      where: { slug: params.slug }
    })

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })

  } catch (error: unknown) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}