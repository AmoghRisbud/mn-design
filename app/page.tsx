"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
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

  // Scroll-driven horizontal card transitions - proper locking
  useEffect(() => {
    let isTransitioning = false;
    let scrollAccumulator = 0;
    const scrollThreshold = 150; // High threshold - full wheel scroll needed
    let lastScrollTime = Date.now();

    const handleWheel = (e: WheelEvent) => {
      if (!expertiseRef.current || isTransitioning) {
        // Block all scroll during transition
        if (isTransitioning) e.preventDefault();
        return;
      }

      const section = expertiseRef.current;
      const rect = section.getBoundingClientRect();

      // More precise viewport detection - section must be centered
      const isInView =
        rect.top < window.innerHeight * 0.5 &&
        rect.bottom > window.innerHeight * 0.5;

      if (isInView) {
        const now = Date.now();
        const timeSinceLastScroll = now - lastScrollTime;

        // Reset accumulator if user paused scrolling (more than 200ms gap)
        if (timeSinceLastScroll > 200) {
          scrollAccumulator = 0;
        }

        lastScrollTime = now;

        // Accumulate scroll delta
        scrollAccumulator += Math.abs(e.deltaY);

        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;

        // Check if we can move cards
        const canMoveForward = scrollingDown && activeCardIndex < 3;
        const canMoveBackward = scrollingUp && activeCardIndex > 0;

        if (canMoveForward || canMoveBackward) {
          e.preventDefault(); // Always prevent scroll in this section

          // Only trigger card change when threshold is reached
          if (scrollAccumulator >= scrollThreshold) {
            isTransitioning = true;
            scrollAccumulator = 0; // Reset immediately

            if (scrollingDown) {
              console.log(
                "→ Card transition:",
                activeCardIndex,
                "→",
                activeCardIndex + 1
              );
              setActiveCardIndex((prev) => Math.min(prev + 1, 3));
            } else {
              console.log(
                "← Card transition:",
                activeCardIndex,
                "→",
                activeCardIndex - 1
              );
              setActiveCardIndex((prev) => Math.max(prev - 1, 0));
            }

            // Lock for full transition duration
            setTimeout(() => {
              isTransitioning = false;
              scrollAccumulator = 0; // Ensure clean state
            }, 1200);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeCardIndex]);

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
      <main className="overflow-hidden">
        {/* Hero Section - Full Width Image Placeholder */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Rotating Hero Images */}
          <div ref={parallaxRef} className="absolute inset-0">
            {/* Hero Image 1 */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
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
              />
            </div>

            {/* Hero Image 2 */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                heroImageIndex === 1 ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: heroImageIndex === 1 ? "auto" : "none" }}
            >
              <Image
                src="/images/heroSection-hero2.jpg"
                alt="MN Design Architecture 2"
                fill
                className="object-cover"
              />
            </div>

            {/* Hero Image 3 */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                heroImageIndex === 2 ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: heroImageIndex === 2 ? "auto" : "none" }}
            >
              <Image
                src="/images/heroSection-hero3.jpg"
                alt="MN Design Architecture 3"
                fill
                className="object-cover"
              />
            </div>

            {/* Dark overlay */}
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

        {/* Featured Projects Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="text-center mb-16 scroll-reveal">
              <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4 font-light">
                Our Projects
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Featured Categories
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Residential Card */}
              <Link
                href="/category/residential"
                className="group relative h-[400px] overflow-hidden rounded-xl"
              >
                <Image
                  src="/images/residential-bg.jpg"
                  alt="Residential Projects"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-light text-white mb-6">
                    Residential
                  </h3>
                  <button className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-sm tracking-wider font-light">
                    Click here
                  </button>
                </div>
              </Link>

              {/* Commercial Card */}
              <Link
                href="/category/commercial"
                className="group relative h-[400px] overflow-hidden rounded-xl"
              >
                <Image
                  src="/images/commercial-bg.jpg"
                  alt="Commercial Projects"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-light text-white mb-6">
                    Commercial
                  </h3>
                  <button className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-sm tracking-wider font-light">
                    Click here
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section - Card Carousel */}
        <section ref={expertiseRef} className="bg-white py-32">
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

            {/* Card Carousel Container */}
            <div className="relative mx-auto max-w-3xl">
              <div
                className="expertise-cards-wrapper relative"
                style={{ minHeight: "500px" }}
              >
                {[
                  {
                    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    title: "Residential",
                    description:
                      "Bespoke homes that reflect your lifestyle and aspirations",
                  },
                  {
                    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                    title: "Commercial",
                    description:
                      "Innovative spaces that drive business success",
                  },
                  {
                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                    title: "Institutional",
                    description: "Public spaces designed for community impact",
                  },
                  {
                    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
                    title: "Urban Planning",
                    description:
                      "Strategic development for sustainable communities",
                  },
                ].map((card, index) => {
                  // Determine card position for horizontal carousel
                  let cardClass = "card-hidden";

                  if (index === activeCardIndex) {
                    cardClass = "card-active"; // Current visible card
                  } else if (index < activeCardIndex) {
                    cardClass = "card-before"; // Cards already seen (go left)
                  } else {
                    cardClass = "card-next"; // Cards coming up (from right)
                  }

                  return (
                    <div key={index} className={`expertise-card ${cardClass}`}>
                      <div className="bg-gray-100 rounded-2xl p-10 w-96 h-96 flex flex-col justify-between">
                        {/* Number */}
                        <div>
                          <span className="text-6xl font-light text-gray-900">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Icon and Title */}
                        <div>
                          <div className="mb-6">
                            <svg
                              className="w-12 h-12 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d={card.icon}
                              />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-light mb-4 text-gray-900">
                            {card.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-3 mt-12">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCardIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeCardIndex === index
                        ? "w-12 bg-blue-600"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 bg-white scroll-reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="slide-in-left">
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
              <div className="relative h-[600px] lg:h-[700px] slide-in-right">
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
