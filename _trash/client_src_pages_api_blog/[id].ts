import type { NextApiRequest, NextApiResponse } from 'next';
import BlogPost from '@/lib/models/BlogPost';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    const { id } = req.query;

    if (req.method === 'GET') {
        const post = await BlogPost.findById(id);
        if (!post) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(post);
    }

    if (req.method === 'PUT') {
        const updated = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
        const deleted = await BlogPost.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
