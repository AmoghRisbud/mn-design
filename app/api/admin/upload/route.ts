import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Verify Cloudinary config
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary credentials not configured');
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
    }

    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      console.error('Upload failed: Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error('Upload failed: No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('File converted to buffer, size:', buffer.length);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'mn-design-projects',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload success:', result?.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const uploadResult = result as any;

    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    );
  }
}
