import type { NextApiRequest, NextApiResponse } from 'next';
import BlogPost from '@/lib/models/BlogPost';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const posts = await BlogPost.find();
        return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
        const post = await BlogPost.create(req.body);
        return res.status(201).json(post);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
