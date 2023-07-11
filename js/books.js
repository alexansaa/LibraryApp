const bookCtr = document.getElementById('book-ctr');
const addBtn = document.getElementById('add-btn');

class Bookshelf {
  constructor() {
    this.shelf = [];
  }
}

class Book {
  static someBooks = [
    {
      name: 'Don Quijote de la Mancha',
      author: 'Miguel de Cervantes Saavedra'
    },
    {
      name: 'La ilitada',
      author: 'Homero'
    }
  ];

  constructor(name, author) {
    this.name = name;
    this.author = author;
  }

  static addNewBook(name, author) {
    const newBook = new Book(name, author);
    bookshelf.shelf.push(newBook);
    Book.updateData();

    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.innerHTML = `<p>"${name}" by ${author}</p>
                          <button>Remove</button>`;
    bookElement.querySelector('button').addEventListener('click', () => {
      Book.removeBook(name);
      bookElement.remove();
      Book.updateData();
    });

    bookCtr.appendChild(bookElement);
  }

  static removeBook(name) {
    bookshelf.shelf = bookshelf.shelf.filter((item) => item.name !== name);
  }

  static updateData() {
    localStorage.setItem('books', JSON.stringify(bookshelf.shelf));
  }
}

const bookshelf = new Bookshelf();

// Loading existing books data from local storage if there is already
// existing data, otherwise, creates an empty array.
bookshelf.shelf = JSON.parse(localStorage.getItem('books'));
if (bookshelf.shelf === null || bookshelf.shelf.length === 0) {
  bookshelf.shelf = Book.someBooks;
}

if (bookshelf.shelf.length > 0) {
  bookshelf.shelf.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.innerHTML = `<p>"${book.name}" by ${book.author}</p>
                          <button>Remove</button>`;
    bookElement.querySelector('button').addEventListener('click', () => {
      Book.removeBook(book.name);
      bookElement.remove();
      Book.updateData();
    });

    bookCtr.appendChild(bookElement);
  });
}

addBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;

  Book.addNewBook(name, author);
});