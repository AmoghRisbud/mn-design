import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { notFound } from 'next/navigation';

async function getProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-blue-600 font-medium uppercase px-3 py-1 bg-blue-50 rounded-full">
                {project.category}
              </span>
              <span className="text-gray-600">{project.year}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </div>
              {project.area && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {project.area}
                </div>
              )}
              {project.client && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Client: {project.client}
                </div>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {project.images.map((image, index) => (
              <div key={index} className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
