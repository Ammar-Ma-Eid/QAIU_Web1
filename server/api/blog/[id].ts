var express = require('express');
var clientPromise = require('./src/lib/db/mongodb');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();

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
