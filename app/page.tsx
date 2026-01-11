import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[700px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
              Designing Spaces,<br />
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Building Dreams
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 animate-fade-in-up animation-delay-200 leading-relaxed">
              Premier civil architecture firm specializing in innovative and sustainable design solutions that transform visions into reality
            </p>
            <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link 
                href="/projects" 
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                View Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/contact" 
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive architectural solutions for every need</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Residential</h3>
              <p className="text-gray-600 leading-relaxed">Custom homes and residential developments</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Commercial</h3>
              <p className="text-gray-600 leading-relaxed">Office buildings and retail spaces</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Institutional</h3>
              <p className="text-gray-600 leading-relaxed">Schools, hospitals, and public buildings</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Planning</h3>
              <p className="text-gray-600 leading-relaxed">Urban planning and site development</p>
            </div>
          </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-r from-gray-50 to-blue-50 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          <div className="relative max-w-4xl mx-auto text-center px-4">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              Let's discuss how we can bring your vision to life
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
            >
              Contact Us Today
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
