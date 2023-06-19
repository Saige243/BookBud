const express = require('express')
const router = express.Router()
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET

router.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ email }, JWT_SECRET)

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })
    await newUser.save()
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)
    res.status(201).json({ message: 'User created successfully', token })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json(error.message)
  }
})

module.exports = router
