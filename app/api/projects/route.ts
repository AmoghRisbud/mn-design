import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { Project } from '@/lib/types';

export async function GET() {
  try {
    const projectKeys = await redis.keys('project:*');
    
    if (!projectKeys || projectKeys.length === 0) {
      return NextResponse.json([]);
    }

    const projects = await Promise.all(
      projectKeys.map(async (key) => {
        const project = await redis.get(key);
        return project;
      })
    );

    const validProjects = projects.filter((p): p is Project => p !== null);
    
    // Sort by year (newest first) and featured status
    validProjects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.year - a.year;
    });

    return NextResponse.json(validProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
