export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  year: number;
  category: 'residential' | 'commercial' | 'institutional' | 'industrial';
  images: string[]; // Cloudinary URLs
  featured: boolean;
  area?: string;
  client?: string;
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
  category: 'residential' | 'commercial' | 'institutional' | 'industrial';
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
