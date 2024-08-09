// booksdb.js

const books = {
    "1": { title: "Book One", author: "Author One", reviews: ["Great book!", "Loved it!"] },
    "2": { title: "Book Two", author: "Author Two", reviews: ["Not bad", "Pretty good"] },
    // Add more books here as needed
};

// Task 10: Get all books using an async callback function
function getAllBooks(callback) {
    setTimeout(() => {
        callback(null, books); 
    }, 1000);
}

// Task 11: Search by ISBN using Promises
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const book = books[isbn];
            if (book) {
                resolve(book);
            } else {
                reject(new Error('Book not found'));
            }
        }, 1000);
    });
}

// Task 12: Search by Author using Promises
function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const booksByAuthor = [];
            for (let key in books) {
                if (books[key].author.toLowerCase() === author.toLowerCase()) {
                    booksByAuthor.push(books[key]);
                }
            }
            if (booksByAuthor.length > 0) {
                resolve(booksByAuthor);
            } else {
                reject(new Error('No books found by this author'));
            }
        }, 1000);
    });
}

// Task 13: Search by Title using Promises
function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const booksByTitle = [];
            for (let key in books) {
                if (books[key].title.toLowerCase() === title.toLowerCase()) {
                    booksByTitle.push(books[key]);
                }
            }
            if (booksByTitle.length > 0) {
                resolve(booksByTitle);
            } else {
                reject(new Error('No books found with this title'));
            }
        }, 1000);
    });
}

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle
};
