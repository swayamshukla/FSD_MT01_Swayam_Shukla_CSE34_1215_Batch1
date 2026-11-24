

const express = require("express");
const router = express.Router(); 
const books = require("../data/books");


function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}


router.get("/", function (req, res) {
  res.status(200).json(books);
});

router.get("/filter", function (req, res) {
  const author = req.query.author;   

  if (!author) {
    return res.status(400).json({ message: "Query parameter 'author' is required" });
  }

  const result = books.filter(function (book) {
    return book.author.toLowerCase().includes(author.toLowerCase());
  });


  res.status(200).json(result);
});


router.get("/:id", function (req, res) {
  const id = Number(req.params.id);   
  const book = books.find(function (b) {
    return b.id === id;
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});


router.post("/", function (req, res) {
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const publishedYear = req.body.publishedYear;
  let available = req.body.available;

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ message: "title is required and must be a non-empty string" });
  }
  if (!isNonEmptyString(author)) {
    return res.status(400).json({ message: "author is required and must be a non-empty string" });
  }
  if (!isNonEmptyString(genre)) {
    return res.status(400).json({ message: "genre is required and must be a non-empty string" });
  }
  if (typeof publishedYear !== "number" || isNaN(publishedYear)) {
    return res.status(400).json({ message: "publishedYear is required and must be a number" });
  }


  if (available === undefined) {
    available = true;
  } else if (typeof available !== "boolean") {
    return res.status(400).json({ message: "available must be a boolean (true or false)" });
  }

 
  let newId = 101;
  if (books.length > 0) {
    const ids = books.map(function (b) { return b.id; });
    newId = Math.max.apply(null, ids) + 1;
  }

  const newBook = {
    id: newId,
    title: title.trim(),
    author: author.trim(),
    genre: genre.trim(),
    publishedYear: publishedYear,
    available: available
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


router.put("/:id", function (req, res) {
  const id = Number(req.params.id);
  const book = books.find(function (b) {
    return b.id === id;
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const publishedYear = req.body.publishedYear;
  const available = req.body.available;

 
  if (title !== undefined && !isNonEmptyString(title)) {
    return res.status(400).json({ message: "title must be a non-empty string" });
  }
  if (author !== undefined && !isNonEmptyString(author)) {
    return res.status(400).json({ message: "author must be a non-empty string" });
  }
  if (genre !== undefined && !isNonEmptyString(genre)) {
    return res.status(400).json({ message: "genre must be a non-empty string" });
  }
  if (publishedYear !== undefined && (typeof publishedYear !== "number" || isNaN(publishedYear))) {
    return res.status(400).json({ message: "publishedYear must be a number" });
  }
  if (available !== undefined && typeof available !== "boolean") {
    return res.status(400).json({ message: "available must be a boolean (true or false)" });
  }


  if (title !== undefined) book.title = title.trim();
  if (author !== undefined) book.author = author.trim();
  if (genre !== undefined) book.genre = genre.trim();
  if (publishedYear !== undefined) book.publishedYear = publishedYear;
  if (available !== undefined) book.available = available;

  res.status(200).json(book);
});


router.delete("/:id", function (req, res) {
  const id = Number(req.params.id);
  const index = books.findIndex(function (b) {
    return b.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);   
  res.status(200).json({ message: "Book deleted successfully" });
});

module.exports = router;
