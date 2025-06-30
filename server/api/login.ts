require('dotenv').config(); // Load environment variables

var express = require('express');
var router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'adminQAIU_2025';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'QAIU_adminpassword_2025';
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'QAIU_ADMIN_TOKEN_SECRET_2025';

router.post('/', (req, res) => {
    const { username, password } = req.body;
    // Basic input validation
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, error: 'Invalid input.' });
    }
    // @ts-ignore
    const isProd = typeof global !== 'undefined' && global.process && global.process.env && global.process.env.NODE_ENV === 'production';
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set a cookie (in production, use secure options)
        res.cookie('auth_token', ADMIN_TOKEN_SECRET, {
            httpOnly: true,
            secure: isProd,
            path: '/',
            maxAge: 60 * 60 * 24 * 1000, // 1 day in ms
            // TODO: Add sameSite: 'strict' for CSRF protection
        });
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Invalid username or password. Please try again.' });
    }
});

module.exports = router;
