import { redis } from '../lib/redis';
import { Project } from '../lib/types';

const dummyProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Modern Villa Residence',
    description: `A stunning modern villa featuring clean lines, expansive glass walls, and seamless indoor-outdoor living spaces. This 5,000 sq ft masterpiece combines contemporary architecture with sustainable design principles.

The residence features an open-concept layout, high ceilings with exposed beams, and floor-to-ceiling windows that flood the interior with natural light. The outdoor spaces include a infinity pool, landscaped gardens, and multiple entertainment areas.

Key features include energy-efficient systems, smart home integration, and premium finishes throughout. The kitchen boasts custom cabinetry and professional-grade appliances, while the master suite offers panoramic views and a spa-like bathroom.`,
    location: 'Beverly Hills, CA',
    year: 2024,
    category: 'residential',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    ],
    featured: true,
    area: '5,000 sq ft',
    client: 'Private Client',
  },
  {
    title: 'Downtown Office Tower',
    description: `A 25-story commercial office building in the heart of downtown featuring sustainable design, LEED Gold certification, and state-of-the-art amenities.

This Class-A office tower offers 450,000 sq ft of premium office space with flexible floor plates, high-efficiency HVAC systems, and advanced building management technology. The curtain wall system maximizes natural daylight while minimizing heat gain.

Amenities include a fitness center, conference facilities, ground-floor retail spaces, and a landscaped rooftop terrace. The building incorporates renewable energy systems and rainwater harvesting to minimize environmental impact.`,
    location: 'Seattle, WA',
    year: 2023,
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=1200',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
    ],
    featured: true,
    area: '450,000 sq ft',
    client: 'Pacific Development Corp',
  },
  {
    title: 'Riverside Community College',
    description: `A modern educational facility designed to inspire learning through thoughtful architecture and sustainable design. The 100,000 sq ft campus features multiple classroom buildings, laboratories, library, and student center.

The design emphasizes natural lighting, energy efficiency, and flexible learning spaces that can adapt to evolving educational needs. Outdoor courtyards and green spaces create collaborative areas for students.

Sustainable features include solar panels, green roofs, efficient water systems, and locally-sourced materials. The campus is designed to achieve LEED Platinum certification.`,
    location: 'Portland, OR',
    year: 2023,
    category: 'institutional',
    images: [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=1200',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
    ],
    featured: false,
    area: '100,000 sq ft',
    client: 'Riverside School District',
  },
  {
    title: 'Luxury Apartment Complex',
    description: `An upscale residential development featuring 120 luxury apartment units across two 8-story buildings. Each unit offers premium finishes, private balconies, and stunning city views.

The complex includes resort-style amenities: rooftop pool and lounge, state-of-the-art fitness center, yoga studio, business center, and landscaped courtyard with fire pits and BBQ areas.

Underground parking, 24/7 concierge services, and smart home technology provide residents with convenience and security. The design incorporates energy-efficient systems and sustainable materials throughout.`,
    location: 'Austin, TX',
    year: 2024,
    category: 'residential',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200',
    ],
    featured: false,
    area: '180,000 sq ft',
    client: 'Urban Living Partners',
  },
  {
    title: 'Tech Campus Innovation Hub',
    description: `A cutting-edge technology campus designed to foster innovation and collaboration. The 300,000 sq ft development includes office buildings, research labs, cafeteria, and recreational facilities.

Open floor plans, abundant natural light, and flexible workspaces encourage creativity and teamwork. The campus features outdoor work areas, walking trails, and sustainable landscaping.

Advanced building systems include smart controls, renewable energy integration, and high-performance envelope design. The project achieved LEED Platinum certification.`,
    location: 'San Jose, CA',
    year: 2022,
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200',
    ],
    featured: true,
    area: '300,000 sq ft',
    client: 'TechCorp Industries',
  },
  {
    title: 'Regional Medical Center',
    description: `A state-of-the-art medical facility providing comprehensive healthcare services. The 250,000 sq ft center includes emergency department, surgical suites, patient rooms, diagnostic imaging, and outpatient clinics.

The design prioritizes patient comfort, staff efficiency, and infection control. Healing gardens, natural light, and calming colors create a therapeutic environment.

Advanced medical technology infrastructure, efficient layouts, and flexible spaces allow the facility to adapt to changing healthcare needs. Sustainable design features reduce operational costs and environmental impact.`,
    location: 'Phoenix, AZ',
    year: 2023,
    category: 'institutional',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200',
    ],
    featured: false,
    area: '250,000 sq ft',
    client: 'Regional Healthcare System',
  },
  {
    title: 'Sustainable Retail Plaza',
    description: `An eco-friendly mixed-use retail and dining destination featuring sustainable architecture and community-focused design. The 75,000 sq ft plaza includes retail spaces, restaurants, cafes, and public gathering areas.

Natural materials, green roofs, and extensive landscaping create an inviting atmosphere. The design incorporates passive cooling strategies, solar panels, and rainwater collection systems.

Wide pedestrian walkways, outdoor seating, and public art installations encourage community engagement. The project serves as a model for sustainable commercial development.`,
    location: 'Denver, CO',
    year: 2024,
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200',
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
    ],
    featured: false,
    area: '75,000 sq ft',
    client: 'Green Retail Group',
  },
  {
    title: 'Coastal Beach House',
    description: `A contemporary coastal residence designed to embrace ocean views and beach living. This 4,500 sq ft home features an open-concept design with expansive decks, outdoor living spaces, and direct beach access.

Large sliding glass doors blur the boundary between indoor and outdoor spaces. The home is elevated on pilings to protect against coastal flooding and storms.

Sustainable features include impact-resistant windows, solar panels, rainwater collection, and durable, low-maintenance materials. The interior showcases natural textures, light colors, and custom built-ins.`,
    location: 'Malibu, CA',
    year: 2024,
    category: 'residential',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
    ],
    featured: true,
    area: '4,500 sq ft',
    client: 'Private Client',
  },
];

async function seedProjects() {
  console.log('Starting to seed projects...');

  for (const projectData of dummyProjects) {
    const project: Project = {
      ...projectData,
      id: `project-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await redis.set(`project:${project.id}`, project);
      console.log(`✓ Created project: ${project.title}`);
    } catch (error) {
      console.error(`✗ Failed to create project: ${project.title}`, error);
    }

    // Small delay to ensure unique IDs
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  console.log('\n✓ Seeding complete!');
  console.log(`Total projects created: ${dummyProjects.length}`);
}

// Run the seeding function
seedProjects().catch(console.error);
