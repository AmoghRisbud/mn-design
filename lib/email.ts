import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEnquiryEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  const recipientEmail = process.env.ENQUIRIES_EMAIL || 'info@mndesign.com';

  try {
    await resend.emails.send({
      from: 'MN Design Website <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Enquiry: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 10px;">
            New Enquiry from MN Design Website
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This enquiry was submitted through the MN Design website contact form.</p>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
