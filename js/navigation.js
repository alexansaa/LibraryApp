// Sections
const list = document.querySelector('#List');
const add = document.querySelector('#New');
const contact = document.querySelector('#Contact');

// Navigation links array
const links = document.querySelectorAll('#myLinks a');

// Function for showing the chosen section when a link gets clicked
function GoToSection(e) {
  // Name of the section to show
  const name = e.target.textContent;

  switch (name) {
    case 'List':
      list.classList.remove('hidden');
      add.classList.add('hidden');
      contact.classList.add('hidden');
      break;
    case 'Add New':
      list.classList.add('hidden');
      add.classList.remove('hidden');
      contact.classList.add('hidden');
      break;
    case 'Contact':
      list.classList.add('hidden');
      add.classList.add('hidden');
      contact.classList.remove('hidden');
      break;
    default:
      break;
  }
}

// Click event listener added for each navigation link
links.forEach((section) => {
  section.addEventListener('click', GoToSection);
});