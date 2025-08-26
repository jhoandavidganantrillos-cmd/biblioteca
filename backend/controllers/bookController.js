const Book = require('../Models/book');

// @desc    Obtener todos los libros
// @route   GET /api/books
// @access  Public (no necesita autenticación para ver)
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libros', error: error.message });
  }
};

// @desc    Obtener un solo libro por ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro', error: error.message });
  }
};

// @desc    Crear un nuevo libro
// @route   POST /api/books
// @access  Private (requiere autenticación)
const createBook = async (req, res) => {
  const { title, author, isbn, publishedYear, genero, stock } = req.body;

  // Validación básica
  if (!title || !author || !isbn || !stock) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos requeridos.' });
  }

  try {
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res.status(400).json({ message: 'Ya existe un libro con este ISBN.' });
    }

    const book = new Book({
      title,
      author,
      isbn,
      publishedYear,
      genre,
      stock,
      location
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear libro', error: error.message });
  }
};

// @desc    Actualizar un libro
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  const { title, author, isbn, publishedYear,genre,stock, location } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
        book.gnere = genre || book.genre;
      book.author = author || book.author;
      book.isbn = isbn || book.isbn;
      book.publishedYear = publishedYear || book.publishedYear;
      book.stock = stock !== undefined ? stock : book.stock; // Permite stock en 0
      book.location= location || book.location;

      const updatedBook = await book.save();
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar libro', error: error.message });
  }
};
// @desc    Eliminar un libro
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await Book.deleteOne({ _id: book.id }); // Elimina el libro por ID
      res.status(200).json({ message: 'Libro eliminado' });
    } else {
      res.status(404).json({ message: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar libro', error: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook, 
};
