# Library Book Management API

A REST API built with Node.js and Express to manage library books. Data is stored in an in-memory JavaScript array (no database).

## Setup

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## Endpoints

| Method | URL | Description | Success |
|---|---|---|---|
| GET | /api/books | Get all books | 200 |
| POST | /api/books | Add a new book | 201 |
| GET | /api/books/:id | Get a book by ID | 200 / 404 |
| PUT | /api/books/:id | Update a book | 200 / 404 |
| DELETE | /api/books/:id | Delete a book | 200 / 404 |
| GET | /api/books/filter?author=value | Filter by author (case-insensitive) | 200 |

## Sample POST body

```json
{
  "title": "Ikigai",
  "author": "Hector Garcia",
  "genre": "Self-help",
  "publishedYear": 2016,
  "available": true
}
```

## Project Structure

```
library-book-management/
├── package.json
├── server.js
├── data/books.js
└── routes/bookRoutes.js
```
