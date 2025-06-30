var clientPromise = require('../../src/lib/db/mongodb');
var BlogPost = require('../../src/lib/db/schemas').BlogPost;
var express = require('express');
var ObjectId = require('mongodb').ObjectId; // Added ObjectId
var router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('blog');
        const posts = await collection.find({}).toArray();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('blog');
        const post = req.body;
        const result = await collection.insertOne(post);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

// Routes from [id].ts
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('blog');
        const post = await collection.findOne({ _id: new ObjectId(id) });
        if (!post) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('blog');
        const data = req.body;
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('blog');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

module.exports = router;
