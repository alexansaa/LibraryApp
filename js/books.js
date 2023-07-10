const bookCtr = document.getElementById('book-ctr');
const addBtn = document.getElementById('add-btn');

class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

// Loading existing books data from local storage if there is already
// existing data, otherwise, creates an empty array.
let booksData = JSON.parse(localStorage.getItem('books') || '[]');

// Function to update local storage for books data
function updateData() {
  localStorage.setItem('books', JSON.stringify(booksData));
}

// Add new book function
function addBook(name, author) {
  const newBook = new Book(name, author);
  booksData.push(newBook);
  updateData();

  const bookElement = document.createElement('div');
  bookElement.className = 'book';
  bookElement.innerHTML = `<h2>${name} by ${author}</h2>
                        <button>Remove</button>`;
  bookElement.querySelector('button').addEventListener('click', () => {
    booksData = booksData.filter((item) => item.name !== name);
    bookElement.remove();
    updateData();
  });

  bookCtr.appendChild(bookElement);
}

if (booksData.length > 0) {
  booksData.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.innerHTML = `<h2>${book.name} by ${book.author}</h2>
                          <button>Remove</button>`;
    bookElement.querySelector('button').addEventListener('click', () => {
      booksData = booksData.filter((item) => item.name !== book.name);
      bookElement.remove();
      updateData();
    });

    bookCtr.appendChild(bookElement);
  });
}

addBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;

  addBook(name, author);
});