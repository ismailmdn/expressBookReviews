// Sample book data
const books = {
    "1": { title: "Book One", author: "Author One", reviews: ["Great book!", "Loved it!"] },
    "2": { title: "Book Two", author: "Author Two", reviews: ["Not bad", "Pretty good"] },
    // Add more books here as needed
};

// Function to get all books
function getAllBooks() {
    return new Promise((resolve, reject) => {
        // Simulate a delay to mimic database query
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });
}

// Function to get a book by ISBN
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        // Simulate a delay to mimic database query
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

// Function to get books by author
function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        // Simulate a delay to mimic database query
        setTimeout(() => {
            const booksByAuthor = [];
            for (let key in books) {
                if (books[key].author.toLowerCase() === author.toLowerCase()) {
                    booksByAuthor.push(books[key]);
                }
            }
            resolve(booksByAuthor);
        }, 1000);
    });
}

// Function to get books by title
function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        // Simulate a delay to mimic database query
        setTimeout(() => {
            const booksByTitle = [];
            for (let key in books) {
                if (books[key].title.toLowerCase() === title.toLowerCase()) {
                    booksByTitle.push(books[key]);
                }
            }
            resolve(booksByTitle);
        }, 1000);
    });
}

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle
};
    