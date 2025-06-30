import clientPromise from './mongodb';
import type { Member, Event, BlogPost } from './types';
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
    const db = await getDb();
    const members = await db.collection('members').find({}).sort({ role: 1, name: 1 }).toArray();
    return members.map(mapMongoId) as unknown as Member[];
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const db = await getDb();
    const events = await db.collection('events').find({ date: { $gte: new Date().toISOString() } }).sort({ date: 1 }).toArray();
    return events.map(mapMongoId) as unknown as Event[];
}

export async function getPastEvents(): Promise<Event[]> {
    const db = await getDb();
    const events = await db.collection('events').find({ date: { $lt: new Date().toISOString() } }).sort({ date: -1 }).toArray();
    return events.map(mapMongoId) as unknown as Event[];
}

export async function getEventById(id: string): Promise<Event | null> {
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
    const db = await getDb();
    const posts = await db.collection('blogPosts').find({}).sort({ date: -1 }).toArray();
    return posts.map(mapMongoId) as unknown as BlogPost[];
}
