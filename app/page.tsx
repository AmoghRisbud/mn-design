"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Auto-rotate hero background images
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setHeroImageIndex((prev) => {
        const next = (prev + 1) % 3;
        console.log("Hero image rotating:", prev, "→", next);
        return next;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(heroInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      // Parallax effect for hero
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Hero text animations - trigger every time hero is in view
      const heroTextElements = document.querySelectorAll(".hero-text");
      heroTextElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight - 100 && rect.bottom > 100;

        if (isVisible) {
          element.classList.add("revealed");
        } else {
          element.classList.remove("revealed");
        }
      });

      // Fade-in animations
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          element.classList.add("revealed");
        }
      });

      // Slide-in animations for philosophy section - trigger every time section enters/exits view
      const slideInElements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right"
      );
      slideInElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight - 100 && rect.bottom > 0;

        if (isVisible) {
          // Add revealed class to trigger animation
          element.classList.add("revealed");
        } else {
          // Remove class when element leaves view to reset animation
          element.classList.remove("revealed");
        }
      });
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      {/* Mobile-first overflow prevention */}
      <main className="overflow-hidden w-full max-w-full">
        {/* Hero Section - Mobile-first responsive height */}
        <section className="relative h-[70vh] sm:h-[80vh] md:h-screen w-full overflow-hidden">
          {/* Rotating Hero Images */}
          <div ref={parallaxRef} className="absolute inset-0">
            {/* Hero Image 1 */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                heroImageIndex === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: heroImageIndex === 0 ? "auto" : "none" }}
            >
              <Image
                src="/images/heroSection-main.jpg"
                alt="MN Design Architecture 1"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Hero Image 2 */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                heroImageIndex === 1 ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: heroImageIndex === 1 ? "auto" : "none" }}
            >
              <Image
                src="/images/heroSection-hero2.jpg"
                alt="MN Design Architecture 2"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Hero Image 3 */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                heroImageIndex === 2 ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: heroImageIndex === 2 ? "auto" : "none" }}
            >
              <Image
                src="/images/heroSection-hero3.jpg"
                alt="MN Design Architecture 3"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Hero Content - Mobile-first sizing */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
            <div className="text-center max-w-6xl mx-auto w-full">
              <div className="overflow-hidden mb-3 sm:mb-4 md:mb-6">
                <h1 className="hero-text text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight drop-shadow-2xl">
                  MN DESIGN
                </h1>
              </div>
              <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
                <p className="hero-text text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-lg">
                  Architecture & Design Studio
                </p>
              </div>
              <div className="hero-text h-px w-16 sm:w-24 md:w-32 bg-white/50 mx-auto mb-6 sm:mb-8 md:mb-12"></div>
              <div className="overflow-hidden">
                <p className="hero-text text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-12 px-4 drop-shadow-lg">
                  Creating timeless spaces that blend innovative design with
                  functional elegance
                </p>
              </div>
              {/* Mobile-friendly button with touch-friendly sizing */}
              <div className="hero-text flex gap-3 sm:gap-4 md:gap-6 justify-center">
                <Link
                  href="/projects"
                  className="group relative px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 overflow-hidden border-2 border-white text-white hover:text-black transition-colors duration-500 min-h-[44px] flex items-center"
                >
                  <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative flex items-center gap-2 font-light tracking-wider text-xs sm:text-sm md:text-base">
                    EXPLORE PROJECTS
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300"
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

        {/* Studio Highlights - Scroll-based Card Reveal */}
        <section className="bg-white py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12 text-center">
              <p className="text-gray-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-light">
                Studio Highlights
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4 px-4">
                Thoughtful Spaces, Crafted with Care
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
                A brief look into how we approach every projectfrom concept to
                completionwith precision, clarity, and a focus on timeless
                design.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {[
                {
                  title: "Context-Driven Concepts",
                  body: "Every proposal begins with a deep understanding of site, climate, and client narrative, ensuring each space feels authentic and grounded.",
                },
                {
                  title: "Material Honesty",
                  body: "We prioritise natural textures, refined details, and durable finishes that age gracefully and elevate daily experience.",
                },
                {
                  title: "Light & Proportion",
                  body: "Carefully considered light, shadow, and scale create quiet moments of calm and clarity throughout each project.",
                },
                {
                  title: "Integrated Delivery",
                  body: "From early sketches to on-site coordination, we remain closely involved to protect the integrity of the design vision.",
                },
              ].map((card, index) => (
                <div
                  key={card.title}
                  className={`bg-gray-50 rounded-xl sm:rounded-2xl px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 shadow-sm border border-gray-100 ${
                    index % 2 === 0 ? "slide-in-left" : "slide-in-right"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm md:text-base font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 mt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 mb-2 sm:mb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16 scroll-reveal">
              <p className="text-gray-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-light">
                Our Projects
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4">
                Featured Categories
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Residential Card */}
              <Link
                href="/category/residential"
                className="group relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-lg sm:rounded-xl slide-in-left"
              >
                <Image
                  src="/images/residential-bg.jpg"
                  alt="Residential Projects"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-3xl sm:text-4xl font-light text-white mb-4 sm:mb-6">
                    Residential
                  </h3>
                  <button className="px-5 py-2 sm:px-6 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-xs sm:text-sm tracking-wider font-light">
                    Click here
                  </button>
                </div>
              </Link>

              {/* Commercial Card */}
              <Link
                href="/category/commercial"
                className="group relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-lg sm:rounded-xl slide-in-right"
              >
                <Image
                  src="/images/commercial-bg.jpg"
                  alt="Commercial Projects"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-3xl sm:text-4xl font-light text-white mb-4 sm:mb-6">
                    Commercial
                  </h3>
                  <button className="px-5 py-2 sm:px-6 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-xs sm:text-sm tracking-wider font-light">
                    Click here
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white scroll-reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
              <div className="slide-in-left">
                <p className="text-gray-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 font-light">
                  Our Approach
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
                  Design Philosophy
                  <br />
                  Rooted in Excellence
                </h2>
                <div className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed">
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
                  className="inline-flex items-center gap-3 text-gray-900 mt-8 sm:mt-10 group"
                >
                  <span className="text-xs sm:text-sm tracking-wider">
                    LEARN MORE
                  </span>
                  <div className="w-12 h-px bg-gray-900 group-hover:w-24 transition-all duration-500"></div>
                </Link>
              </div>

              {/* IMAGE PLACEHOLDER 5: Philosophy/About image (800x1000px recommended - portrait) */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] slide-in-right">
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

        {/* CTA Section - Mobile-first responsive height */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] w-full scroll-reveal">
          {/* IMAGE PLACEHOLDER 6: CTA background image (1920x800px recommended) */}
          <div className="absolute inset-0">
            <Image
              src="/images/CTA.png"
              alt="Contact Us"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/65"></div>

          {/* Mobile-friendly content with better spacing */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto w-full">
              <p className="text-white/80 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 md:mb-6 font-light drop-shadow-lg">
                Let's Collaborate
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-2xl px-4">
                Start Your Project
                <br />
                With Us
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4">
                Transform your vision into reality with our expert team of
                architects and designers
              </p>
              {/* Touch-friendly button with proper sizing */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 overflow-hidden border-2 border-white text-white hover:text-black transition-colors duration-500 min-h-[44px]"
              >
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="relative flex items-center gap-2 sm:gap-3 font-light tracking-widest text-xs sm:text-sm">
                  GET IN TOUCH
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300"
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
