const express = require("express");
const app = express();
app.use(express.json());

// In-memory "database"
let books = [
  { id: 1, title: "Clean Code", author: "Robert Martin", year: 2008 },
  { id: 2, title: "The Pragmatic Programmer", author: "David Thomas", year: 1999 },
  { id: 3, title: "Design Patterns", author: "Gang of Four", year: 1994 },
];
let nextId = 4;

// GET /books — list all
app.get("/books", (req, res) => {
  res.json({ books, total: books.length });
});

// GET /books/:id — single book or 404
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST /books — create (body validation → 400)
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  if (year && (typeof year !== "number" || year < 1000 || year > new Date().getFullYear())) {
    return res.status(400).json({ error: "year must be a valid number" });
  }
  const book = { id: nextId++, title, author, year: year || null };
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id — update or 404
app.put("/books/:id", (req, res) => {
  const idx = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  books[idx] = { ...books[idx], title, author, year: year || books[idx].year };
  res.json(books[idx]);
});

// DELETE /books/:id — delete or 404
app.delete("/books/:id", (req, res) => {
  const idx = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  books.splice(idx, 1);
  res.status(204).send();
});

// GET /health
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Books API running on port ${PORT}`));
module.exports = app;
