const express = require('express');
const public_users = express.Router();
const bookdb = require('./bookdb'); 


public_users.get('/', async function (req, res) {
    try {
        const allBooks = await bookdb.getAllBooks();
        res.send(JSON.stringify(allBooks, null, 2));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books data" });
    }
});


public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn; 

    try {
        const book = await bookdb.getBookByISBN(isbn);
        res.send(JSON.stringify(book, null, 2)); 
    } catch (error) {
        res.status(404).json({ message: "Book not found" });
    }
});


public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author; 

    try {
        const booksByAuthor = await bookdb.getBooksByAuthor(author);
        if (booksByAuthor.length > 0) {
            res.send(JSON.stringify(booksByAuthor, null, 2));
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books data" });
    }
});


public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title; 

    try {
        const booksByTitle = await bookdb.getBooksByTitle(title);
        if (booksByTitle.length > 0) {
            res.send(JSON.stringify(booksByTitle, null, 2));
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books data" });
    }
});

module.exports.general = public_users;
