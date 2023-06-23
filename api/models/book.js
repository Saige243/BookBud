const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  progress: {
    type: Number,
    required: false,
  },
})

module.exports = mongoose.model('Book', bookSchema)
