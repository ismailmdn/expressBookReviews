const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();

let users = {}; // Simple in-memory store for users
let books = {
    "1": { title: "Book One", author: "Author One", reviews: [{ username: "user1", review: "Great book!" }] },
    "2": { title: "Book Two", author: "Author Two", reviews: [{ username: "user2", review: "Not bad" }] },
    // Add more books here as needed
};

// Function to authenticate user and generate JWT
const authenticateUser = (username, password) => {
    if (users[username] && users[username].password === password) {
        // Generate JWT token
        return jwt.sign({ username }, "access", { expiresIn: '1h' });
    }
    return null;
};

// Task 7: Login as a registered user
regd_users.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const token = authenticateUser(username, password);

    if (token) {
        req.session.authorization = { accessToken: token }; // Store token in session
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// Task 8: Add or modify a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn; // Get ISBN from request parameters
    const { review } = req.body; // Get review from request body
    const username = req.user.username; // Get username from JWT

    const book = books[isbn]; // Retrieve book details using ISBN

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if user already has a review for the book
    const existingReview = book.reviews.find(r => r.username === username);

    if (existingReview) {
        // Modify existing review
        existingReview.review = review;
        res.status(200).json({ message: "Review updated successfully" });
    } else {
        // Add new review
        book.reviews.push({ username, review });
        res.status(201).json({ message: "Review added successfully" });
    }
});

// Task 9: Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn; // Get ISBN from request parameters
    const username = req.user.username; // Get username from JWT

    const book = books[isbn]; // Retrieve book details using ISBN

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Filter out reviews by the current user
    const filteredReviews = book.reviews.filter(r => r.username !== username);

    if (filteredReviews.length === book.reviews.length) {
        return res.status(404).json({ message: "Review not found for the user" });
    }

    book.reviews = filteredReviews; // Update reviews for the book
    res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
