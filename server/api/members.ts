var clientPromise = require('../../src/lib/db/mongodb');
var Member = require('../../src/lib/db/schemas').Member;
var express = require('express');
var ObjectId = require('mongodb').ObjectId; // Added ObjectId
var router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('members');
        const members = await collection.find({}).toArray();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('members');
        const member = req.body;
        const result = await collection.insertOne(member);
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
        const collection = db.collection('members');
        const member = await collection.findOne({ _id: new ObjectId(id) });
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'qaiu');
        const collection = db.collection('members');
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
        const collection = db.collection('members');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Database connection or query failed', details: error.message });
    }
});

module.exports = router;
