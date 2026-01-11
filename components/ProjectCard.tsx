import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={project.images[0] || '/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-white text-xl font-bold mb-2 block">
                View Details
              </span>
              <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full">
              {project.category}
            </span>
            <span className="text-sm text-gray-500 font-medium">{project.year}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
            <svg 
              className="w-5 h-5 mr-2 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <span className="font-medium">{project.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
