var clientPromise = require('./src/lib/db/mongodb');
var express = require('express');
var router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('events');
        const events = await collection.find({}).toArray();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('events');
        const event = req.body;
        const result = await collection.insertOne(event);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

module.exports = router;
