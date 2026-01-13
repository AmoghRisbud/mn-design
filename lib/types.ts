export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  year: number;
  category: "residential" | "commercial" | "institutional" | "industrial";
  images: string[]; // Cloudinary URLs
  featured: boolean;
  area?: string;
  client?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeShowcase {
  id: string;
  title: string;
  category: "residential" | "commercial" | "institutional" | "industrial";
  image: string; // Cloudinary URL
  projectId?: string; // Optional link to actual project
  order: number; // Display order (1 or 2)
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  location: string;
  year: number;
  category: "residential" | "commercial" | "institutional" | "industrial";
  images: string[];
  featured?: boolean;
  area?: string;
  client?: string;
}

export interface CreateEnquiryInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
