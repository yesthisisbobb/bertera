
"use server";

import { z } from "zod";
import { Resend } from 'resend';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  } | null;
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      success: false,
    };
  }

  const { name, email, subject, message } = validatedFields.data;
  const recipientEmail = "admin@berteraniagaglobal.com";

  // Initialize Resend with your API key
  // IMPORTANT: Store your API key in .env.local or your hosting environment variables
  // Example: RESEND_API_KEY=your_api_key_here
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Resend API key is not configured. Email will not be sent.");
    // Fallback: Log to console and inform user (as before)
    console.log("Contact form submitted. Data that would be sent:");
    console.log("To:", recipientEmail);
    console.log("From:", email); // Resend will use your verified sending domain
    console.log("Name:", name);
    console.log("Subject:", subject);
    console.log("Message:", message);
    return {
      message: `Thank you, ${name}! Your message about "${subject}" has been received. (Email sending is not fully configured, please contact admin.)`,
      errors: null,
      success: true, // Still success from form perspective
    };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Bertera Niaga Global <noreply@yourverifieddomain.com>', // Replace with your verified Resend sending domain/email
      to: [recipientEmail],
      reply_to: email, // Set the user's email as reply-to
      subject: `Contact Form: ${subject}`,
      html: `
        <p>You have received a new message from your website contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return {
        message: "There was an error sending your message. Please try again later.",
        errors: null,
        success: false,
      };
    }

    console.log("Email sent successfully via Resend:", data);
    return {
      message: `Thank you, ${name}! Your message about "${subject}" has been successfully sent. We will get back to you soon.`,
      errors: null,
      success: true,
    };

  } catch (exception) {
    console.error("Error sending email:", exception);
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: null,
      success: false,
    };
  }
}
