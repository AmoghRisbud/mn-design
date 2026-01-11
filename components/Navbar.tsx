'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:scale-105 transition-transform">
              MN Design
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              );
            })}
            
            {isSignedIn ? (
              <div className="flex items-center gap-3 ml-4">
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
