import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl font-extrabold mb-6 animate-fade-in-up">About MN Design</h1>
            <p className="text-2xl opacity-90 animate-fade-in-up animation-delay-200">Creating exceptional spaces since 2005</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600 inline-block">Our Story</h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              MN Design was founded in 2005 with a vision to create architectural masterpieces that seamlessly blend
              functionality with aesthetic excellence. Over the years, we have grown into one of the region's most
              trusted civil architecture firms, known for our innovative designs and commitment to sustainability.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Our team of experienced architects, engineers, and designers work collaboratively to bring your vision
              to life. We believe that great architecture should not only be visually stunning but also enhance the
              quality of life for those who use it.
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600 inline-block mt-12">Our Mission</h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
              To deliver exceptional architectural solutions that exceed client expectations while maintaining the
              highest standards of quality, sustainability, and innovation. We are committed to creating spaces that
              inspire, function efficiently, and stand the test of time.
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600 inline-block mt-12">Why Choose Us</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start group hover:bg-blue-50 p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg"><strong className="text-blue-600">20+ Years of Experience:</strong> Proven track record of delivering excellence</span>
              </li>
              <li className="flex items-start group hover:bg-blue-50 p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg"><strong className="text-blue-600">Sustainable Practices:</strong> Committed to environmentally responsible design</span>
              </li>
              <li className="flex items-start group hover:bg-blue-50 p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg"><strong className="text-blue-600">Client-Focused Approach:</strong> Your vision is our priority</span>
              </li>
              <li className="flex items-start group hover:bg-blue-50 p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg"><strong className="text-blue-600">Comprehensive Services:</strong> From concept to completion</span>
              </li>
            </ul>

            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-10 rounded-2xl mt-12 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
                <p className="text-blue-50 mb-6 text-lg leading-relaxed">
                  Let's transform your vision into reality. Contact us today to discuss your architectural needs.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
