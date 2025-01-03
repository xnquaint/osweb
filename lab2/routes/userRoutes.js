const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (role && !['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role!' });
        }

        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to the protected route!',
        user: req.user,
    });
});

router.get('/admin', authMiddleware, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied!' });
    }
    res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
