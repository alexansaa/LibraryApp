const bookCtr = document.getElementById('book-ctr');
const addBtn = document.getElementById('add-btn');

class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

const someBooks = [
  {
    name: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes Saavedra'
  },
  {
    name: 'La ilitada',
    author: 'Homero'
  }
];

// Loading existing books data from local storage if there is already
// existing data, otherwise, creates an empty array.
let booksData = JSON.parse(localStorage.getItem('books'));
if (booksData == null || booksData.length === 0) {
  booksData = someBooks;
}

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
  bookElement.innerHTML = `<p>${name} by ${author}</p>
                        <button>Remove</button>`;
  bookElement.querySelector('button').addEventListener('click', () => {
    booksData = booksData.filter((item) => item.name !== name);
    bookElement.remove();
    updateData();
  });

  bookCtr.appendChild(bookElement);
}

if (booksData.length > 0) {
  booksData.forEach((book, i) => {
    const bookElement = document.createElement('div');
    if (i % 2 === 0) {
      bookElement.className = 'book_bg';
    } else {
      bookElement.className = 'book';
    }
    bookElement.innerHTML = `<p>"${book.name}" by ${book.author}</p>
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