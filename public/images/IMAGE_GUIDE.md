# Image Placeholders Guide

This guide shows where to add images for the homepage design.

## Required Images

### 1. **Hero Main Image** (`hero-main.jpg`)

- **Location**: Main hero section (top of homepage)
- **Recommended Size**: 1920x1080px (landscape)
- **Description**: Your most impressive architectural project - will be shown full-screen with parallax effect
- **Suggested Content**: Stunning exterior shot of a building at golden hour, aerial view of a complex, or dramatic architectural detail

### 2. **Featured Project** (`featured-project.jpg`)

- **Location**: Second section after hero
- **Recommended Size**: 1920x1080px (landscape)
- **Description**: Showcase one of your best projects
- **Suggested Content**: Modern building facade, contemporary interior, or striking architectural composition

### 3. **Project Showcase (Dynamic - Admin Managed)**

- **Location**: Recent Work section on homepage
- **Admin Panel**: `/admin/home-showcase`
- **How to Manage**:
  1. Go to Admin Dashboard
  2. Click "Manage Home Showcase"
  3. Add up to 2 showcase items with images
  4. Set title, category, and display position
- **Features**:
  - Upload images directly via Cloudinary
  - Choose category (Residential/Commercial/Institutional/Industrial)
  - Set display order (Position 1 or 2)
  - Edit/Delete anytime
  - Changes appear instantly on homepage
- **Recommended Image Size**: 960x720px or larger (landscape/4:3 ratio)
- **Max Items**: 2 (will show side-by-side on desktop, stacked on mobile)
- **Location**: Design Philosophy section
- **Recommended Size**: 800x1000px (portrait/vertical)
- **Description**: Image representing your design approach
- **Suggested Content**: Architectural detail, blueprint/sketch, team at work, or close-up of materials

### 5. **Philosophy Image** (`philosophy.jpg`)

- **Location**: Contact CTA section (bottom)
- **Recommended Size**: 1920x800px (wide landscape)
- **Description**: Background for the final call-to-action section
- **Suggested Content**: Inspiring architectural shot, construction site, or finished project at dusk

## How to Add Images

### Static Homepage Images (Hero, Featured, Philosophy, CTA)

Once you have the images ready:

1. Place all images in the `/public/images/` folder
2. In `/app/page.tsx`, find the comments marked "IMAGE PLACEHOLDER X"
3. Replace the placeholder `<div>` with Next.js Image component:

```tsx
import Image from 'next/image';

// Example replacement:
// FROM:
<div className="absolute inset-0 bg-gradient-to-br from-slate-900...">

// TO:
<Image
  src="/images/hero-main.jpg"
  alt="MN Design Architecture"
  fill
  className="object-cover"
  priority
/>
```

### Dynamic Recent Work Images (Admin Panel)

**New Dedicated Interface for Homepage Showcase**

The Recent Work section has its own management interface:

1. **Access**:

   - Go to `/admin` (Admin Dashboard)
   - Click "🏠 Manage Home Showcase" button
   - Or directly visit `/admin/home-showcase`

2. **Add Showcase Item**:

   - Click "+ Add Showcase Item"
   - Upload image (Cloudinary integration)
   - Enter title (e.g., "Modern Villa")
   - Select category (Residential/Commercial/Institutional/Industrial)
   - Choose display position (1 or 2)
   - Click "Create Showcase Item"

3. **Edit Showcase Item**:

   - Go to Home Showcase page
   - Click "Edit" on any item
   - Update image, title, category, or position
   - Click "Update Showcase Item"

4. **Delete Showcase Item**:

   - Click "Delete" button
   - Confirm deletion
   - Changes reflect immediately on homepage

5. **Display Rules**:
   - Maximum 2 items allowed
   - Position 1 = Left side (or top on mobile)
   - Position 2 = Right side (or bottom on mobile)
   - If only 1 item exists, displays full width
   - Each item is clickable (can link to project if desired)

## Image Optimization Tips

- Use high-quality images (at least the recommended sizes)
- For hero images, consider 2x resolution for retina displays (3840x2160px)
- Save images as JPG (80-90% quality) for best balance of quality and file size
- Use WebP format if possible for better compression
- Ensure images are properly exposed and color-corrected
- Use architectural photography with strong composition and lighting

## Alternative: Using Unsplash/Stock Photos

If you need placeholder images temporarily:

- [Unsplash Architecture](https://unsplash.com/s/photos/architecture)
- [Pexels Architecture](https://www.pexels.com/search/architecture/)

Search for: "modern architecture", "contemporary building", "luxury home", "office building"
