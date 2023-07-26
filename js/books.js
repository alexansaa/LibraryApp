const bookCtr = document.getElementById('book-ctr');
const addBtn = document.getElementById('add-btn');
const alertMsg = document.getElementById('alert-msg');

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

let alertTimeOut = null;

addBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;

  if (name === '' || author === '') {
    clearTimeout(alertTimeOut);
    alertMsg.textContent = 'Name and author of the book should be filled';
    alertTimeOut = setTimeout(() => {
      alertMsg.textContent = '';
    }, 1500);
    return;
  }
  alertMsg.classList.add('success');
  alertMsg.textContent = 'Book succesfully added!';
  alertTimeOut = setTimeout(() => {
    alertMsg.textContent = '';
    alertMsg.classList.remove('success');
  }, 1500);

  document.getElementById('name').value = '';
  document.getElementById('author').value = '';

  Bookshelf.addNewBook(name, author);
});