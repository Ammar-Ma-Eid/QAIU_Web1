'use server'
import { revalidatePath } from 'next/cache'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const DB_NAME = process.env.MONGODB_DB || 'QAIU';

async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

/**
 * Adds a new member to the database.
 * @param data The data for the new member.
 */
export async function addMember(data: any) {
  const db = await getDb();
  await db.collection('members').insertOne(data);
  revalidatePath('/admin', 'layout');
  revalidatePath('/about');
}

/**
 * Updates an existing member in the database.
 * @param id The ID of the member to update.
 * @param data The new data for the member.
 */
export async function updateMember(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('members').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin', 'layout');
  revalidatePath('/about');
}

/**
 * Deletes a member from the database.
 * @param id The ID of the member to delete.
 */
export async function deleteMember(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  try {
    const db = await getDb();
    await db.collection('members').deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/admin', 'layout');
    revalidatePath('/about');
  } catch (error) {
    console.error("Failed to delete member:", error);
    throw new Error("Database operation failed.");
  }
}

// --- Event Actions ---
export async function addEvent(data: any) {
  const db = await getDb();
  // The gallery is not managed by the form, so we add a default empty array.
  await db.collection('events').insertOne({ ...data, gallery: data.gallery || [] });
  revalidatePath('/admin', 'layout');
  revalidatePath('/events');
}

export async function updateEvent(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('events').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin', 'layout');
  revalidatePath('/events');
  revalidatePath(`/events/${id}`);
}

export async function deleteEvent(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  try {
    const db = await getDb();
    await db.collection('events').deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/admin', 'layout');
    revalidatePath('/events');
  } catch (error) {
    console.error("Failed to delete event:", error);
    throw new Error("Database operation failed.");
  }
}

// --- Blog Post Actions ---
export async function addBlogPost(data: any) {
  const db = await getDb();
  await db.collection('blogPosts').insertOne(data);
  revalidatePath('/admin', 'layout');
  revalidatePath('/blog');
}

export async function updateBlogPost(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('blogPosts').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin', 'layout');
  revalidatePath('/blog');
  revalidatePath(`/blog/${id}`);
}

export async function deleteBlogPost(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  try {
    const db = await getDb();
    await db.collection('blogPosts').deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/admin', 'layout');
    revalidatePath('/blog');
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    throw new Error("Database operation failed.");
  }
}

// --- Glossary Term Actions ---
export async function addGlossaryTerm(data: any) {
  const db = await getDb();
  await db.collection('glossaryTerms').insertOne(data);
  revalidatePath('/admin', 'layout');
  revalidatePath('/glossary');
}

export async function updateGlossaryTerm(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('glossaryTerms').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin', 'layout');
  revalidatePath('/glossary');
}

export async function deleteGlossaryTerm(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  try {
    const db = await getDb();
    await db.collection('glossaryTerms').deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/admin', 'layout');
    revalidatePath('/glossary');
  } catch (error) {
    console.error("Failed to delete glossary term:", error);
    throw new Error("Database operation failed.");
  }
}
