const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('GET IS WORKING!');
});

const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ email, password }, JWT_SECRET);

    res.status(201).json({ message: 'User created successfully', token });

  } catch (error) {
    console.error('API:', error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
