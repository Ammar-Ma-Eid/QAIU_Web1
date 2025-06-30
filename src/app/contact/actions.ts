'use server'

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

export type State = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  }
}

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

async function getDb() {
  const client = await clientPromise;
  return client.db();
}

export async function submitContactForm(prevState: State | undefined, formData: FormData): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const db = await getDb();
    await db.collection('contacts').insertOne({
      ...validatedFields.data,
      submittedAt: new Date(),
    });
  } catch (e) {
    console.error('Failed to save contact form submission:', e);
    return {
      success: false,
      message: 'A server error occurred. Please try again later.',
    };
  }


  return {
    success: true,
    message: 'Thank you for your message! We will get back to you soon.'
  }
}
