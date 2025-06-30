import type { NextApiRequest, NextApiResponse } from 'next';
import Event from '@/lib/models/Event';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    const { id } = req.query;

    if (req.method === 'GET') {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(event);
    }

    if (req.method === 'PUT') {
        const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
        const deleted = await Event.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
