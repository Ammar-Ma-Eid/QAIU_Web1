var clientPromise = require('./src/lib/db/mongodb');
var BlogPost = require('./src/lib/db/schemas').BlogPost;
var express = require('express');
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

module.exports = router;
