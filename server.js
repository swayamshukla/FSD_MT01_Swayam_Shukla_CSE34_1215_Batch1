// Entry point of the application.

const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

// Middleware: reads JSON sent in the request body and puts it in req.body
app.use(express.json());

// Send every URL starting with /api/books to bookRoutes
app.use("/api/books", bookRoutes);

// Handle unknown URLs
app.use(function (req, res) {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
});
