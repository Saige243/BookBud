const express = require('express');
const router = express.Router();
const User = require('./models/user');

router.get('/', (req, res) => {
  res.send('GET IS WORKING!');
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('API:', error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
