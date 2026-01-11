import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/types';

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Projects</h1>
            <p className="text-xl">Explore our portfolio of innovative architectural designs</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
