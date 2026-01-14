"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";

export default function CategoryPage() {
  const params = useParams();
  const category = params.name as string;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter(
            (project: Project) => project.category === category
          );
          setProjects(filtered);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  const getCategoryTitle = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getCategoryImage = () => {
    // Map category to background images
    const imageMap: Record<string, string> = {
      residential: "/images/ResidentalProBG.jpg",
      commercial: "/images/industrialPro.png",
      institutional: "/images/InstitutionalPro.png",
      industrial: "/images/commercialPro.png",
    };
    return imageMap[category] || "/images/heroSection-main.jpg";
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Category Image */}
        <section className="relative h-[70vh] w-full overflow-hidden bg-white">
          {/* Full Category Image with built-in text */}
          <div className="absolute inset-0">
            <Image
              src={getCategoryImage()}
              alt={`${getCategoryTitle()} Projects`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-600 animate-bounce opacity-80 z-30">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              {["residential", "commercial", "institutional", "industrial"].map(
                (cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat}`}
                    className={`px-6 py-2 text-sm tracking-wider font-light transition-all duration-300 border-2 rounded-full ${
                      category === cat
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-900 border-slate-300 hover:border-slate-900"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                )
              )}
              <Link
                href="/projects"
                className="px-6 py-2 text-sm tracking-wider font-light transition-all duration-300 border-2 rounded-full bg-white text-slate-900 border-slate-300 hover:border-slate-900"
              >
                All Projects
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">
                  No projects available in this category yet.
                </p>
                <Link
                  href="/projects"
                  className="inline-block mt-6 text-blue-600 hover:text-blue-800"
                >
                  ← Back to all projects
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>

                <div className="text-center mt-16">
                  <p className="text-gray-600">
                    Showing {projects.length} project
                    {projects.length !== 1 ? "s" : ""} in {getCategoryTitle()}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
