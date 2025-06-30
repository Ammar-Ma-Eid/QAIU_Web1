var clientPromise = require('../../src/lib/db/mongodb');
var express = require('express');
var ObjectId = require('mongodb').ObjectId; // Added ObjectId
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

// Routes from [id].ts
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('events');
        const event = await collection.findOne({ _id: new ObjectId(id) });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) => {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('events');
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
        const collection = db.collection('events');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

module.exports = router;
