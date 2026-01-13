# Recent Work Section - Admin Guide

## Overview

The "Recent Work" section on the homepage now has a **dedicated admin interface** for managing showcase images. This is separate from your general projects and gives you full control over what appears on the homepage.

## Quick Start

### Access the Admin Panel

1. Go to `/admin` (Admin Dashboard)
2. Click **"🏠 Manage Home Showcase"** button
3. Or directly visit `/admin/home-showcase`

### Add Your First Showcase Item

1. Click **"+ Add Showcase Item"**
2. **Upload Image**: Choose a high-quality architectural photo
3. **Title**: Enter project name (e.g., "Modern Villa")
4. **Category**: Select from Residential/Commercial/Institutional/Industrial
5. **Display Position**: Choose Position 1 (left) or Position 2 (right)
6. Click **"Create Showcase Item"**

✅ Your image now appears on the homepage!

## Features

### Maximum 2 Items

- The homepage displays **up to 2 showcase items** in the Recent Work section
- If you have 2 items: They appear side-by-side (desktop) or stacked (mobile)
- If you have 1 item: It displays full-width
- Warning shown when max limit reached

### Display Positions

- **Position 1**: Left side on desktop, top on mobile
- **Position 2**: Right side on desktop, bottom on mobile

### Edit Anytime

- Click **"Edit"** on any item
- Update image, title, category, or position
- Changes appear **instantly** on homepage

### Delete Items

- Click **"Delete"** button
- Confirmation required
- Immediately removed from homepage

## Admin Interface Features

### Main Page (`/admin/home-showcase`)

- Visual card layout with image previews
- See category badges and position numbers
- Quick edit/delete buttons
- Empty state with helpful guidance

### Add/Edit Pages

- Image upload with instant preview
- Category dropdown
- Position selector (1 or 2)
- Cloudinary integration for image hosting
- Form validation

## Image Requirements

- **Recommended Size**: 960x720px or larger
- **Aspect Ratio**: 4:3 or landscape works best
- **Format**: JPG or PNG
- **Quality**: High-resolution architectural photography
- **Content**: Your best project photos showcasing different categories

## Use Cases

### Scenario 1: Highlight Two Different Categories

```
Item 1 (Position 1):
- Title: "Luxury Villa"
- Category: Residential
- Image: Modern house exterior

Item 2 (Position 2):
- Title: "Corporate Office"
- Category: Commercial
- Image: Office building
```

### Scenario 2: Feature Best Projects

```
Item 1: Your most impressive residential project
Item 2: Your award-winning commercial design
```

### Scenario 3: Seasonal Updates

Update showcase items regularly to:

- Feature recently completed projects
- Highlight seasonal work
- Promote specific service categories

## Technical Details

### Data Storage

- Stored in: **Upstash Redis** database
- Images hosted on: **Cloudinary**
- Key prefix: `home-showcase:*`

### API Endpoints

- `GET /api/home-showcase` - List all items
- `POST /api/home-showcase` - Create new item
- `PUT /api/home-showcase/[id]` - Update item
- `DELETE /api/home-showcase/[id]` - Delete item

### Security

- All admin routes protected by Clerk authentication
- Only authenticated users can add/edit/delete
- Public homepage fetches data without authentication

## Benefits

✅ **Dedicated Control**: Separate from main projects database
✅ **Simple Interface**: Easy to use, no coding required
✅ **Instant Updates**: Changes appear immediately on homepage
✅ **Visual Management**: See what you're managing with image previews
✅ **Flexible**: Change anytime without affecting other projects
✅ **Professional**: Curate your homepage showcase independently

## Troubleshooting

### Images not showing?

- Check image was uploaded successfully
- Verify Cloudinary credentials in `.env.local`
- Try re-uploading the image

### Can't add more than 2 items?

- This is by design (max 2 items for homepage)
- Delete an existing item to add a new one

### Changes not appearing on homepage?

- Refresh the homepage
- Check item was saved successfully
- Verify you're logged in as admin

## Need Help?

Visit:

- Admin Dashboard: `/admin`
- Home Showcase Manager: `/admin/home-showcase`
- Add New Item: `/admin/home-showcase/new`
