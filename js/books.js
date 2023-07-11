const bookCtr = document.getElementById('book-ctr');
const addBtn = document.getElementById('add-btn');

class Bookshelf {
  static shelf = [];

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
    const newBook = new Bookshelf(name, author);
    Bookshelf.shelf.push(newBook);
    Bookshelf.updateData();

    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.innerHTML = `<p>"${name}" by ${author}</p>
                          <button>Remove</button>`;
    bookElement.querySelector('button').addEventListener('click', () => {
      Bookshelf.removeBook(name);
      bookElement.remove();
      Bookshelf.updateData();
    });

    bookCtr.appendChild(bookElement);
  }

  static removeBook(name) {
    Bookshelf.shelf = Bookshelf.shelf.filter((item) => item.name !== name);
  }

  static updateData() {
    localStorage.setItem('books', JSON.stringify(Bookshelf.shelf));
  }
}

// Loading existing books data from local storage if there is already
// existing data, otherwise, creates an empty array.
Bookshelf.shelf = JSON.parse(localStorage.getItem('books'));
if (Bookshelf.shelf === null || Bookshelf.shelf.length === 0) {
  Bookshelf.shelf = Bookshelf.someBooks;
}

if (Bookshelf.shelf.length > 0) {
  Bookshelf.shelf.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.innerHTML = `<p>"${book.name}" by ${book.author}</p>
                          <button>Remove</button>`;
    bookElement.querySelector('button').addEventListener('click', () => {
      Bookshelf.removeBook(book.name);
      bookElement.remove();
      Bookshelf.updateData();
    });

    bookCtr.appendChild(bookElement);
  });
}

addBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;

  Bookshelf.addNewBook(name, author);
});