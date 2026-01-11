import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MN Design - Architecture & Civil Design",
  description: "Premier civil architecture and design firm specializing in residential, commercial, and institutional projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
