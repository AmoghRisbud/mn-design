import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { redis } from '@/lib/redis';
import { Project } from '@/lib/types';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if project exists
    const project = await redis.get<Project>(`project:${id}`);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project
    await redis.del(`project:${id}`);

    return NextResponse.json(
      { success: true, message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Get existing project
    const existingProject = await redis.get<Project>(`project:${id}`);

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project
    const updatedProject: Project = {
      ...existingProject,
      ...body,
      id: id,
      createdAt: existingProject.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`project:${id}`, updatedProject);

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
