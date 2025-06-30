// This file has been migrated to /client/src/lib/db/mongodb.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Extend the global object type to include _mongoClientPromise
// @ts-ignore
if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    // @ts-ignore
    global._mongoClientPromise = client.connect();
}
// @ts-ignore
clientPromise = global._mongoClientPromise!;

export default clientPromise;
