import { unstable_noStore as noStore } from 'next/cache';
import clientPromise from './mongodb';
import type { Member, Event, BlogPost, GlossaryTerm } from './types';
import { ObjectId } from 'mongodb';

async function getDb() {
    const client = await clientPromise;
    return client.db();
}

// A helper function to map the MongoDB _id to a string id
function mapMongoId<T extends { _id: ObjectId }>(doc: T): Omit<T, '_id'> & { id: string } {
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
}

export async function getMembers(): Promise<Member[]> {
    noStore();
    const db = await getDb();
    const members = await db.collection('members').find({}).sort({ role: 1, name: 1 }).toArray();
    return members.map(mapMongoId) as unknown as Member[];
}

export async function getUpcomingEvents(): Promise<Event[]> {
    noStore();
    const db = await getDb();
    const events = await db.collection('events').find({ date: { $gte: new Date().toISOString() } }).sort({ date: 1 }).toArray();
    return events.map(mapMongoId) as unknown as Event[];
}

export async function getPastEvents(): Promise<Event[]> {
    noStore();
    const db = await getDb();
    const events = await db.collection('events').find({ date: { $lt: new Date().toISOString() } }).sort({ date: -1 }).toArray();
    return events.map(mapMongoId) as unknown as Event[];
}

export async function getEventById(id: string): Promise<Event | null> {
    noStore();
    if (!ObjectId.isValid(id)) {
        return null;
    }
    const db = await getDb();
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
    if (!event) {
        return null;
    }
    return mapMongoId(event as any) as unknown as Event;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    noStore();
    const db = await getDb();
    const posts = await db.collection('blogPosts').find({}).sort({ date: -1 }).toArray();
    return posts.map(mapMongoId) as unknown as BlogPost[];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    noStore();
    if (!ObjectId.isValid(id)) {
        return null;
    }
    const db = await getDb();
    const post = await db.collection('blogPosts').findOne({ _id: new ObjectId(id) });
    if (!post) {
        return null;
    }
    return mapMongoId(post as any) as unknown as BlogPost;
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
    noStore();
    const db = await getDb();
    const terms = await db.collection('glossaryTerms').find({}).sort({ term: 1 }).toArray();
    return terms.map(mapMongoId) as unknown as GlossaryTerm[];
}

export async function getFeaturedGlossaryTerms(): Promise<GlossaryTerm[]> {
    noStore();
    const db = await getDb();
    const terms = await db.collection('glossaryTerms').find({ featured: true }).limit(3).toArray();
    return terms.map(mapMongoId) as unknown as GlossaryTerm[];
}

export async function getGlossaryTermsGroupedByCategory(): Promise<Record<string, GlossaryTerm[]>> {
    noStore();
    const terms = await getGlossaryTerms();
    return terms.reduce((acc, term) => {
        const { category } = term;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(term);
        return acc;
    }, {} as Record<string, GlossaryTerm[]>);
}

export async function getGlossaryTermById(id: string): Promise<GlossaryTerm | null> {
    noStore();
    if (!ObjectId.isValid(id)) {
        return null;
    }
    const db = await getDb();
    const term = await db.collection('glossaryTerms').findOne({ _id: new ObjectId(id) });
    if (!term) {
        return null;
    }
    return mapMongoId(term as any) as unknown as GlossaryTerm;
}
