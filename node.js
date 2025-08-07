const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" }
];

// Helper function to generate unique IDs
let nextId = 4;
const generateId = () => nextId++;

// Helper function to find book by ID
const findBookById = (id) => books.find(book => book.id === parseInt(id));

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
    count: books.length
  });
});

// GET /books/:id - Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Book retrieved successfully',
    data: book
  });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required fields'
    });
  }
  
  const newBook = {
    id: generateId(),
    title: title.trim(),
    author: author.trim()
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required fields'
    });
  }
  
  // Update the book
  books[bookIndex] = {
    ...books[bookIndex],
    title: title.trim(),
    author: author.trim()
  };
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`📚 Books API Server running on http://localhost:${PORT}`);
  console.log(`📖 Available endpoints:`);
  console.log(`   GET    /books        - Get all books`);
  console.log(`   GET    /books/:id    - Get book by ID`);
  console.log(`   POST   /books        - Create new book`);
  console.log(`   PUT    /books/:id    - Update book by ID`);
  console.log(`   DELETE /books/:id    - Delete book by ID`);
});

module.exports = app;