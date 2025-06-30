'use server'
import { revalidatePath } from 'next/cache'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

async function getDb() {
  const client = await clientPromise;
  return client.db();
}

/**
 * Adds a new member to the database.
 * @param data The data for the new member.
 */
export async function addMember(data: any) {
  const db = await getDb();
  await db.collection('members').insertOne(data);
  revalidatePath('/admin');
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
  revalidatePath('/admin');
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
  const db = await getDb();
  await db.collection('members').deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/admin');
  revalidatePath('/about');
}

// --- Event Actions ---
export async function addEvent(data: any) {
  const db = await getDb();
  // The gallery is not managed by the form, so we add a default empty array.
  await db.collection('events').insertOne({ ...data, gallery: [] });
  revalidatePath('/admin');
  revalidatePath('/events');
}

export async function updateEvent(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('events').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin');
  revalidatePath('/events');
}

export async function deleteEvent(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('events').deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/admin');
  revalidatePath('/events');
}

// --- Blog Post Actions ---
export async function addBlogPost(data: any) {
  const db = await getDb();
  await db.collection('blogPosts').insertOne(data);
  revalidatePath('/admin');
  revalidatePath('/blog');
}

export async function updateBlogPost(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('blogPosts').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin');
  revalidatePath('/blog');
}

export async function deleteBlogPost(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('blogPosts').deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/admin');
  revalidatePath('/blog');
}

// --- Glossary Term Actions ---
export async function addGlossaryTerm(data: any) {
  const db = await getDb();
  await db.collection('glossaryTerms').insertOne(data);
  revalidatePath('/admin');
  revalidatePath('/glossary');
}

export async function updateGlossaryTerm(id: string, data: any) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('glossaryTerms').updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidatePath('/admin');
  revalidatePath('/glossary');
}

export async function deleteGlossaryTerm(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
  const db = await getDb();
  await db.collection('glossaryTerms').deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/admin');
  revalidatePath('/glossary');
}
