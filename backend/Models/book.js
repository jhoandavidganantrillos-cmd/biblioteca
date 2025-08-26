// backend/models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  publishedYear: { // Cambiamos a solo el año para simplificar
    type: Number
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
    min: 0
  },
  gnere: {
    type: String,
    required: true,
     trim: true

  },
  location: {
    type: String,
    required: true,
    trim: true

  }
}, {
  timestamps: true // Para createdAt y updatedAt
});

module.exports = mongoose.model('Book', BookSchema);

