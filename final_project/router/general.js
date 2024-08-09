
const express = require('express');
const public_users = express.Router();
const bookdb = require('./booksdb'); 

public_users.get('/', (req, res) => {
    bookdb.getAllBooks((error, books) => {
        if (error) {
            res.status(500).json({ message: "Error fetching books data" });
        } else {
            res.json(books);
        }
    });
});

public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    bookdb.getBookByISBN(isbn)
        .then(book => res.json(book))
        .catch(error => res.status(404).json({ message: error }));
});

public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;

    bookdb.getBooksByAuthor(author)
        .then(booksByAuthor => {
            if (booksByAuthor.length > 0) {
                res.json(booksByAuthor);
            } else {
                res.status(404).json({ message: "No books found by this author" });
            }
        })
        .catch(error => res.status(500).json({ message: "Error fetching books data" }));
});

public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;

    bookdb.getBooksByTitle(title)
        .then(booksByTitle => {
            if (booksByTitle.length > 0) {
                res.json(booksByTitle);
            } else {
                res.status(404).json({ message: "No books found with this title" });
            }
        })
        .catch(error => res.status(500).json({ message: "Error fetching books data" }));
});

module.exports.general = public_users;
