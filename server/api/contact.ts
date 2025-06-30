var clientPromise = require('../../src/lib/db/mongodb');
var ContactMessage = require('../../src/lib/db/schemas').ContactMessage;
var express = require('express');
var router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('contact');
        const messages = await collection.find({}).toArray();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('contact');
        const message = req.body;
        const result = await collection.insertOne(message);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

module.exports = router;
