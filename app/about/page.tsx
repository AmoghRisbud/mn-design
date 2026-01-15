import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Mobile-first overflow prevention */}
      <main className="min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Hero Section - Mobile-first responsive padding */}
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gray-400 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          </div>
          {/* Mobile-friendly title sizing */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 animate-fade-in-up">
              About MN Design
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 animate-fade-in-up animation-delay-200">
              Creating exceptional spaces since 2005
            </p>
          </div>
        </div>

        {/* Content Section - Mobile-first responsive padding and sizing */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            {/* Our Story */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-4 border-gray-900 inline-block">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
              MN Design was founded in 2005 with a vision to create
              architectural masterpieces that seamlessly blend functionality
              with aesthetic excellence. Over the years, we have grown into one
              of the region's most trusted civil architecture firms, known for
              our innovative designs and commitment to sustainability.
            </p>
            <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
              Our team of experienced architects, engineers, and designers work
              collaboratively to bring your vision to life. We believe that
              great architecture should not only be visually stunning but also
              enhance the quality of life for those who use it.
            </p>

            {/* Our Mission */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-4 border-gray-900 inline-block mt-8 sm:mt-10 lg:mt-12">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg bg-gray-50 p-4 sm:p-6 rounded-xl border-l-4 border-gray-900">
              To deliver exceptional architectural solutions that exceed client
              expectations while maintaining the highest standards of quality,
              sustainability, and innovation. We are committed to creating
              spaces that inspire, function efficiently, and stand the test of
              time.
            </p>

            {/* Why Choose Us - Mobile-friendly list */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-4 border-gray-900 inline-block mt-8 sm:mt-10 lg:mt-12">
              Why Choose Us
            </h2>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-start group hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base lg:text-lg">
                  <strong className="text-gray-900">
                    20+ Years of Experience:
                  </strong>{" "}
                  Proven track record of delivering excellence
                </span>
              </li>
              <li className="flex items-start group hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base lg:text-lg">
                  <strong className="text-gray-900">
                    Sustainable Practices:
                  </strong>{" "}
                  Committed to environmentally responsible design
                </span>
              </li>
              <li className="flex items-start group hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base lg:text-lg">
                  <strong className="text-gray-900">
                    Client-Focused Approach:
                  </strong>{" "}
                  Your vision is our priority
                </span>
              </li>
              <li className="flex items-start group hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base lg:text-lg">
                  <strong className="text-gray-900">
                    Comprehensive Services:
                  </strong>{" "}
                  From concept to completion
                </span>
              </li>
            </ul>

            {/* CTA Box - Mobile-friendly padding and button */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl mt-8 sm:mt-10 lg:mt-12 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-gray-200 mb-5 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Let's transform your vision into reality. Contact us today to
                  discuss your architectural needs.
                </p>
                {/* Touch-friendly button with proper sizing */}
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base min-h-[44px]"
                >
                  Get in Touch
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
