import { NextResponse } from 'next/server';
import { sendEnquiryEmail } from '@/lib/email';
import { redis } from '@/lib/redis';
import { CreateEnquiryInput } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: CreateEnquiryInput = await request.json();

    // Validate input
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create enquiry object
    const enquiry = {
      id: `enquiry-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    // Store in Redis
    await redis.set(`enquiry:${enquiry.id}`, enquiry);

    // Send email
    await sendEnquiryEmail(body);

    return NextResponse.json(
      { success: true, message: 'Enquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
