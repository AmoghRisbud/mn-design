import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MN Design - Architecture & Civil Design",
  description:
    "Premier civil architecture and design firm specializing in residential, commercial, and institutional projects.",
};

/* Mobile-First Viewport Configuration */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="overflow-x-hidden">
        {/* Mobile-safe body with overflow prevention */}
        <body
          className={`${inter.variable} antialiased overflow-x-hidden min-h-screen`}
        >
          {/* Mobile-first responsive wrapper */}
          <div className="w-full max-w-full overflow-x-hidden">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
