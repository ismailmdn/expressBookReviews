
const express = require('express');
const regd_users = express.Router();

let users = {
    "testuser": { password: "password123" }
};

let books = {
    "1": { title: "Book One", author: "Author One", reviews: [{ username: "testuser", review: "Great book!" }] },
    "2": { title: "Book Two", author: "Author Two", reviews: [{ username: "user2", review: "Not bad" }] },
};
// Task 15: add book
regd_users.put('/auth/book', (req, res) => {
    const title = req.query.title;
    const author = req.query.author;

    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }

    // Determine the new ID based on the length of the current books object
    const newId = (Object.keys(books).length + 1).toString();

    // Create the new book object
    const newBook = { title, author, reviews: [] };

    // Add the new book to the books object
    books[newId] = newBook;

    res.status(200).json({ message: "The book was added successfully", books });
});
// Task 8: Add or modify a book review using query parameters without token
regd_users.put('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn; 
    const review = req.query.review; 
    const username = req.query.username; 

    if (!review) {
        return res.status(400).json({ message: "Review content is required" });
    }

    const book = books[isbn]; 
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if user already has a review for the book
    const existingReview = book.reviews.find(r => r.username === username);

    if (existingReview) {
        existingReview.review = review;
        res.status(200).json({ message: `The review for the book with ISBN ${isbn} has been updated.` });
    } else {

        book.reviews.push({ username, review });
        res.status(201).json({ message: `The review for the book with ISBN ${isbn} has been added.` });
    }
});

// Task 9: Delete a book review without requiring a token
regd_users.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn; 
    const username = req.query.username; 
    const book = books[isbn]; 
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const reviewIndex = book.reviews.findIndex(r => r.username === username);

    if (reviewIndex === -1) {
        return res.status(404).json({ message: "Review not found for the user" });
    }
    
    book.reviews.splice(reviewIndex, 1);

    res.status(200).json({ message: `Review for ISBN ${isbn} posted by the user ${username} deleted.` });
});

module.exports.authenticated = regd_users;
