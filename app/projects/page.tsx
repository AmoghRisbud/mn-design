"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "institutional", label: "Institutional" },
    { id: "industrial", label: "Industrial" },
  ];

  useEffect(() => {
    // Check if category is passed via URL query parameter
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      <Navbar />
      {/* Mobile-first overflow prevention */}
      <main className="min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Hero Section - Mobile-friendly sizing */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Our Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl">
              Explore our portfolio of innovative architectural designs
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Category Filter Tabs - Mobile-friendly scrollable */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10 md:mb-12">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={
                  category.id === "all"
                    ? "/projects"
                    : `/category/${category.id}`
                }
                className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 text-xs sm:text-sm tracking-wider font-light transition-all duration-300 border-2 rounded-full min-h-[44px] flex items-center ${
                  selectedCategory === category.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-300 hover:border-slate-900"
                }`}
              >
                {category.label}
              </Link>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-lg sm:text-xl text-gray-600">
                Loading projects...
              </p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-lg sm:text-xl text-gray-600">
                No projects available in this category.
              </p>
            </div>
          ) : (
            /* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProjects.map((project) => (
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
