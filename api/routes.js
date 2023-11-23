const express = require('express')
const router = express.Router()
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET

// AUTH ROUTES
router.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId).select('-password')

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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET)

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

router.patch('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const { firstName, lastName } = req.body

    const user = await User.findById(userId)

    user.firstName = firstName
    user.lastName = lastName
    await user.save()

    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Failed to update user' })
  }
})

// BOOK ROUTES

//save book route
router.post('/books', async (req, res) => {
  try {
    const { userId, bookId } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.savedBooks.push({ bookId: bookId })

    await user.save()

    const updatedUser = await User.findById(userId).select('-password')

    res
      .status(200)
      .json({ message: 'Book saved successfully', user: updatedUser })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/books', async (req, res) => {
  try {
    const { userId, bookId } = req.query

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.savedBooks.pull({ bookId: bookId })

    await user.save()

    const updatedUser = await User.findById(userId).select('-password')

    res.status(200).json({
      message: 'Book deleted from library successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// currently reading route
router.post('/books/currently-reading', async (req, res) => {
  try {
    const { userId, bookId } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.currentlyReading.push({ bookId: bookId })

    await user.save()

    const updatedUser = await User.findById(userId).select('-password')

    res
      .status(200)
      .json({ message: 'Book added to currently reading', user: updatedUser })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/books/currently-reading', async (req, res) => {
  try {
    const { userId, bookId } = req.query

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.currentlyReading.pull({ bookId: bookId })

    await user.save()

    const updatedUser = await User.findById(userId).select('-password')

    res.status(200).json({
      message: 'Book removed from currently reading.',
      user: updatedUser,
    })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// finished route
router.post('/books/finished', async (req, res) => {
  try {
    const { userId, bookId } = req.body

    const user = await User.findById(userId)

    if (!userId) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.finishedBooks.push({ bookId: bookId })

    await user.save()

    const updatedUser = await User.findById(userId).select('-password')

    res
      .status(200)
      .json({ message: 'Book added to finished', user: updatedUser })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/books/finished', async (req, res) => {
  try {
    const { userId, bookId } = req.query

    const user = await User.findById(userId)

    if (!userId) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.finishedBooks.pull({ bookId: bookId })

    const updatedUser = await User.findById(userId).select('-password')

    await user.save()

    res
      .status(200)
      .json({ message: 'Book removed from finished', user: updatedUser })
  } catch (error) {
    console.error('API:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
