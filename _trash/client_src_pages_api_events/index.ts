import type { NextApiRequest, NextApiResponse } from 'next';
import Event from '@/lib/models/Event';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const events = await Event.find();
        return res.status(200).json(events);
    }

    if (req.method === 'POST') {
        const event = await Event.create(req.body);
        return res.status(201).json(event);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
