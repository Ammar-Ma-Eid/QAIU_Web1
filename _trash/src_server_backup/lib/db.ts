import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ammar:admin12345@qaiu.hy1iy7i.mongodb.net/?retryWrites=true&w=majority&appName=QAIU';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((connection: typeof mongoose) => {
            return connection;
        });
    }
    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    return cached.conn;
}

// This file has been migrated to /client/src/lib/db.ts
