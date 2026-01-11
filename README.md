# MN Design - Architecture Website

A modern, full-stack Next.js website for MN Design, a civil architecture firm. Features include project portfolio, contact form with email notifications, and an admin panel for managing projects.

## Features

- **Public Website**
  - Responsive home page with services overview
  - Project gallery with filtering and detail pages
  - About page with company information
  - Contact form with email notifications via Resend

- **Admin Panel** (Protected with Clerk Auth)
  - Dashboard with project statistics
  - Add/Edit/Delete projects
  - Image management via Cloudinary
  - Real-time data with Upstash Redis

- **Tech Stack**
  - Next.js 14+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Clerk Authentication
  - Upstash Redis
  - Cloudinary (Image Management)
  - Resend (Email Service)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Accounts for:
  - [Clerk](https://clerk.com) - Authentication
  - [Upstash](https://upstash.com) - Redis Database
  - [Cloudinary](https://cloudinary.com) - Image Storage
  - [Resend](https://resend.com) - Email Service

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

3. Configure your environment variables (see Configuration section below)

4. Seed the database with dummy projects:

```bash
npm run seed
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### 1. Clerk Authentication

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Configure the sign-in/sign-up URLs in Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/admin`

### 2. Upstash Redis

1. Create an account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and Token to `.env.local`:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 3. Cloudinary

1. Create an account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard and copy your credentials to `.env.local`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### 4. Resend Email

1. Create an account at [resend.com](https://resend.com)
2. Get your API key and add to `.env.local`:
   - `RESEND_API_KEY`
3. Set your enquiry recipient email:
   - `ENQUIRIES_EMAIL` (e.g., info@mndesign.com)

**Note:** Resend free tier requires verification of your domain. For development, emails will be sent from `onboarding@resend.dev`. You can reply to your own email for testing.

### 5. Admin Access

To give a user admin access:

1. Sign up through the website at `/sign-up`
2. The first registered user will have access to the admin panel
3. Access the admin panel at `/admin` after signing in

## Project Structure

```
MN Design/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── admin/               # Protected admin panel
│   │   ├── projects/
│   │   └── page.tsx
│   ├── api/                 # API routes
│   │   ├── admin/           # Protected admin APIs
│   │   ├── enquiries/
│   │   └── projects/
│   ├── about/
│   ├── contact/
│   ├── projects/
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── lib/                     # Utilities and config
│   ├── redis.ts
│   ├── cloudinary.ts
│   ├── email.ts
│   └── types.ts
├── scripts/
│   └── seed.ts              # Database seeding
└── middleware.ts            # Clerk auth middleware
```

## Seeding Data

The project includes a seeding script with 8 dummy architecture projects:

```bash
npm run seed
```

This will populate your Redis database with sample projects including:
- Modern Villa Residence
- Downtown Office Tower
- Riverside Community College
- Luxury Apartment Complex
- Tech Campus Innovation Hub
- Regional Medical Center
- Sustainable Retail Plaza
- Coastal Beach House

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy!

Vercel will automatically:
- Build your Next.js application
- Set up proper routing
- Enable edge functions
- Configure caching

### Environment Variables

Make sure to add all these variables in Vercel:
- Clerk keys (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, etc.)
- Upstash Redis (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
- Cloudinary (all 3 variables)
- Resend (RESEND_API_KEY, ENQUIRIES_EMAIL)

## Usage

### For Administrators

1. Sign in at `/sign-in`
2. Access admin panel at `/admin`
3. Add new projects with images (Cloudinary URLs)
4. Mark projects as "Featured" to highlight them
5. Edit or delete existing projects

### For Visitors

- Browse projects on the homepage and projects page
- View detailed project information
- Submit enquiries through the contact form
- Learn about the company on the About page

## API Routes

### Public APIs
- `GET /api/projects` - Get all projects
- `GET /api/projects/[id]` - Get single project
- `POST /api/enquiries` - Submit enquiry

### Admin APIs (Protected)
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project

## Technologies

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** Upstash Redis
- **Image Storage:** Cloudinary
- **Email:** Resend with React Email
- **Deployment:** Vercel

## License

This project is created for MN Design.

## Support

For issues or questions, please contact the development team.
