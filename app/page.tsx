"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HomeShowcase } from "@/lib/types";

export default function HomePage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [recentWorks, setRecentWorks] = useState<HomeShowcase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentWorks = async () => {
      try {
        const response = await fetch("/api/home-showcase");
        const data: HomeShowcase[] = await response.json();
        setRecentWorks(data.slice(0, 2)); // Limit to 2 items
      } catch (error) {
        console.error("Error fetching recent works:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentWorks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      // Parallax effect for hero
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Fade-in animations
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          element.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section - Full Width Image Placeholder */}
        <section className="relative h-screen w-full">
          {/* IMAGE PLACEHOLDER 1: Main hero image (1920x1080px recommended) */}
          <div ref={parallaxRef} className="absolute inset-0">
            <Image
              src="/images/heroSection-main.jpg"
              alt="MN Design Architecture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="text-center max-w-6xl mx-auto">
              <div className="overflow-hidden mb-6">
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight animate-slide-up drop-shadow-2xl">
                  MN DESIGN
                </h1>
              </div>
              <div className="overflow-hidden mb-8">
                <p className="text-xl md:text-2xl text-white font-light tracking-[0.3em] uppercase animate-slide-up animation-delay-300 drop-shadow-lg">
                  Architecture & Design Studio
                </p>
              </div>
              <div className="h-px w-32 bg-white/50 mx-auto mb-12 animate-fade-in animation-delay-600"></div>
              <div className="overflow-hidden">
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-600 drop-shadow-lg">
                  Creating timeless spaces that blend innovative design with
                  functional elegance
                </p>
              </div>
              <div className="flex gap-6 justify-center animate-fade-in animation-delay-900">
                <Link
                  href="/projects"
                  className="group relative px-8 py-4 overflow-hidden border-2 border-white text-white hover:text-black transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative flex items-center gap-2 font-light tracking-wider">
                    EXPLORE PROJECTS
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Project - Full Width Image */}
        <section
          ref={featuredRef}
          className="relative h-[80vh] w-full scroll-reveal"
        >
          {/* IMAGE PLACEHOLDER 2: Featured project image (1920x1080px recommended) */}
          <div className="absolute inset-0">
            <Image
              src="/images/sub-main.jpg"
              alt="Delivering Quality"
              fill
              className="object-cover"
            />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-4 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-4 font-light">
                Delievering Quality
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                Modern
                <br />
                Excellence
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                Visit our project portfolio to see how MN Design integrates
                sustainable design principles with cutting-edge architecture.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 text-white group"
              >
                <span className="text-sm tracking-wider">VIEW PROJECT</span>
                <div className="w-12 h-px bg-white group-hover:w-24 transition-all duration-500"></div>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 scroll-reveal">
              <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4 font-light">
                What We Do
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
                Our Expertise
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200">
              <div className="group relative border-r border-b border-gray-200 p-12 hover:bg-gray-50 transition-all duration-500 scroll-reveal">
                <div className="absolute top-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700"></div>
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 text-gray-900 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">
                  Residential
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Bespoke homes that reflect your lifestyle and aspirations
                </p>
              </div>

              <div className="group relative border-r border-b border-gray-200 p-12 hover:bg-gray-50 transition-all duration-500 scroll-reveal animation-delay-100">
                <div className="absolute top-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700"></div>
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 text-gray-900 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">
                  Commercial
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Innovative spaces that drive business success
                </p>
              </div>

              <div className="group relative border-r border-b border-gray-200 p-12 hover:bg-gray-50 transition-all duration-500 scroll-reveal animation-delay-200">
                <div className="absolute top-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700"></div>
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 text-gray-900 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">
                  Institutional
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Public spaces designed for community impact
                </p>
              </div>

              <div className="group relative border-b border-gray-200 p-12 hover:bg-gray-50 transition-all duration-500 scroll-reveal animation-delay-300">
                <div className="absolute top-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700"></div>
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 text-gray-900 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">
                  Urban Planning
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Strategic development for sustainable communities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase - Grid with Images */}
        <section ref={showcaseRef} className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-reveal">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4 font-light">
                  Portfolio
                </p>
                <h2 className="text-5xl md:text-6xl font-light text-gray-900">
                  Recent Work
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:flex items-center gap-3 text-gray-900 group"
              >
                <span className="text-sm tracking-wider">
                  VIEW ALL PROJECTS
                </span>
                <div className="w-12 h-px bg-gray-900 group-hover:w-24 transition-all duration-500"></div>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-gray-400 text-lg">Loading projects...</div>
            </div>
          ) : recentWorks.length === 0 ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <p className="text-gray-400 text-lg mb-4">
                  No showcase items yet
                </p>
                <p className="text-gray-500 text-sm">
                  Go to Admin → Home Showcase to add items
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 ${
                recentWorks.length === 2 ? "md:grid-cols-2" : ""
              } gap-0`}
            >
              {recentWorks.map((item, index) => (
                <Link
                  key={item.id}
                  href={
                    item.projectId ? `/projects/${item.projectId}` : "/projects"
                  }
                  className="group relative h-[60vh] overflow-hidden scroll-reveal"
                  style={{ animationDelay: index === 1 ? "200ms" : "0ms" }}
                >
                  {/* Showcase Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-12 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm tracking-widest mb-2 opacity-80 uppercase">
                      {item.category}
                    </p>
                    <h3 className="text-3xl font-light mb-4">{item.title}</h3>
                    <div className="w-0 group-hover:w-16 h-px bg-white transition-all duration-500"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-gray-900"
            >
              <span className="text-sm tracking-wider">VIEW ALL PROJECTS</span>
              <div className="w-12 h-px bg-gray-900"></div>
            </Link>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 bg-white scroll-reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6 font-light">
                  Our Approach
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                  Design Philosophy
                  <br />
                  Rooted in Excellence
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    At MN Design, we believe architecture is more than creating
                    structures—it's about crafting experiences that inspire,
                    function seamlessly, and stand the test of time.
                  </p>
                  <p>
                    Our approach combines meticulous attention to detail with
                    innovative thinking, ensuring every project reflects our
                    commitment to sustainability, functionality, and aesthetic
                    excellence.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-gray-900 mt-10 group"
                >
                  <span className="text-sm tracking-wider">LEARN MORE</span>
                  <div className="w-12 h-px bg-gray-900 group-hover:w-24 transition-all duration-500"></div>
                </Link>
              </div>

              {/* IMAGE PLACEHOLDER 5: Philosophy/About image (800x1000px recommended - portrait) */}
              <div className="relative h-[600px] lg:h-[700px]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/design-philosophy.jpg"
                    alt="Design Philosophy"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-full h-full border border-gray-300 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Full Width */}
        <section className="relative h-[70vh] w-full scroll-reveal">
          {/* IMAGE PLACEHOLDER 6: CTA background image (1920x800px recommended) */}
          <div className="absolute inset-0">
            <Image
              src="/images/CTA.png"
              alt="Contact Us"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/65"></div>

          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-6 font-light drop-shadow-lg">
                Let's Collaborate
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight drop-shadow-2xl">
                Start Your Project
                <br />
                With Us
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Transform your vision into reality with our expert team of
                architects and designers
              </p>
              <Link
                href="/contact"
                className="group relative inline-block px-12 py-5 overflow-hidden border-2 border-white text-white hover:text-black transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="relative flex items-center gap-3 font-light tracking-widest text-sm">
                  GET IN TOUCH
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
