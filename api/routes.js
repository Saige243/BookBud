const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/user');


router.get('/', (req, res) => {
  res.send('GET IS WORKING!');
});


router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;

