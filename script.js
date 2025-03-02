const myLibrary = [];

// Convert Book constructor to a class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    // Toggle Read Status (Method)
    toggleRead() {
        this.read = !this.read;
    }
}

// Add New Book
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks(); // Refresh UI
}

// Display Books
function displayBooks() {
    const libraryContainer = document.querySelector(".library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", index);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: <span>${book.read ? "Yes" : "No"}</span></p>
            <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        libraryContainer.appendChild(bookCard);
    });

    // Event Listeners for Buttons
    document.querySelectorAll(".toggle-read-btn").forEach(button => {
        button.addEventListener("click", function() {
            toggleReadStatus(this.getAttribute("data-index"));
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function() {
            removeBook(this.getAttribute("data-index"));
        });
    });
}

// Remove Book
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Toggle Read Status
function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Handle Form Submission
const bookForm = document.getElementById("bookForm");
if (bookForm) {
    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;

        addBookToLibrary(title, author, pages, read);

        bookForm.reset();
        bookForm.style.display = "none";
    });
}

// Show Form When "New Book" Button is Clicked
const newBookBtn = document.getElementById("newBookBtn");
if (newBookBtn) {
    newBookBtn.addEventListener("click", function() {
        bookForm.style.display = "block";
    });
}

// Initial Books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);

// Initial Display
displayBooks();