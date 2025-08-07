# Books REST API - Testing Guide

## Quick Setup Instructions

1. **Initialize the project:**
   ```bash
   mkdir books-api
   cd books-api
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express
   npm install -D nodemon
   ```

3. **Create server.js file** (copy the server code from the artifact)

4. **Start the server:**
   ```bash
   npm start
   # Or for development with auto-restart:
   npm run dev
   ```

5. **Server will run on:** `http://localhost:3000`

## API Endpoints Overview

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/books` | Get all books | None |
| GET | `/books/:id` | Get book by ID | None |
| POST | `/books` | Create new book | `{title, author}` |
| PUT | `/books/:id` | Update book | `{title, author}` |
| DELETE | `/books/:id` | Delete book | None |

## Postman Testing Examples

### 1. GET All Books
- **Method:** GET
- **URL:** `http://localhost:3000/books`
- **Headers:** None required
- **Expected Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee"
    },
    {
      "id": 3,
      "title": "1984",
      "author": "George Orwell"
    }
  ],
  "count": 3
}
```

### 2. GET Single Book
- **Method:** GET
- **URL:** `http://localhost:3000/books/1`
- **Headers:** None required
- **Expected Response:**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

### 3. POST Create New Book
- **Method:** POST
- **URL:** `http://localhost:3000/books`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger"
}
```
- **Expected Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger"
  }
}
```

### 4. PUT Update Book
- **Method:** PUT
- **URL:** `http://localhost:3000/books/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "The Great Gatsby (Updated Edition)",
  "author": "F. Scott Fitzgerald"
}
```
- **Expected Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated Edition)",
    "author": "F. Scott Fitzgerald"
  }
}
```

### 5. DELETE Book
- **Method:** DELETE
- **URL:** `http://localhost:3000/books/1`
- **Headers:** None required
- **Expected Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated Edition)",
    "author": "F. Scott Fitzgerald"
  }
}
```

## Error Handling Examples

### 1. Book Not Found (404)
- **URL:** `http://localhost:3000/books/999`
- **Response:**
```json
{
  "success": false,
  "message": "Book not found"
}
```

### 2. Validation Error (400)
- **Method:** POST
- **Body:** `{"title": "Missing Author"}`
- **Response:**
```json
{
  "success": false,
  "message": "Title and author are required fields"
}
```

### 3. Route Not Found (404)
- **URL:** `http://localhost:3000/invalid-route`
- **Response:**
```json
{
  "success": false,
  "message": "Route not found"
}
```

## Testing Workflow Suggestion

1. **Start with GET /books** to see initial data
2. **Create a new book** with POST /books
3. **Verify creation** with GET /books (should show new book)
4. **Get single book** with GET /books/:id
5. **Update the book** with PUT /books/:id
6. **Verify update** with GET /books/:id
7. **Delete the book** with DELETE /books/:id
8. **Verify deletion** with GET /books (should not show deleted book)
9. **Test error cases** (invalid IDs, missing fields, etc.)

## Key Features Implemented

- ✅ Complete CRUD operations
- ✅ Input validation
- ✅ Error handling
- ✅ Consistent JSON response format
- ✅ HTTP status codes
- ✅ In-memory data storage
- ✅ Auto-incrementing IDs
- ✅ Route not found handling
- ✅ Request body parsing

## Common Interview Questions & Answers

**Q: What is REST API?**
A: REST (Representational State Transfer) is an architectural style for web services that uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs.

**Q: Explain HTTP methods used:**
- GET: Retrieve data (read operation)
- POST: Create new resource
- PUT: Update existing resource (full update)
- DELETE: Remove resource

**Q: What is middleware in Express?**
A: Functions that execute during the request-response cycle. Example: `express.json()` parses JSON bodies.

**Q: How do you handle errors in Express?**
A: Using error handling middleware with 4 parameters: `(err, req, res, next)`.

**Q: What are HTTP status codes?**
- 200: OK (success)
- 201: Created (resource created)
- 400: Bad Request (client error)
- 404: Not Found
- 500: Internal Server Error