import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { redis } from '@/lib/redis';
import { CreateProjectInput, Project } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: CreateProjectInput = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.location || !body.year || !body.category || !body.images || body.images.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create project
    const project: Project = {
      id: `project-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      title: body.title,
      description: body.description,
      location: body.location,
      year: body.year,
      category: body.category,
      images: body.images,
      featured: body.featured || false,
      area: body.area,
      client: body.client,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in Redis
    await redis.set(`project:${project.id}`, project);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
