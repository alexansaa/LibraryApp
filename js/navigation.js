// Sections
const list = document.getElementById('List');
const add = document.getElementById('New');
const contact = document.getElementsByName('Contact');

// Navigation links array
const links = document.querySelectorAll('#myLinks a');

// Function for showing the chosen section when a link gets clicked
function GoToSection(e) {
    // Name of the section to show
    const name = e.target.textContent();
    
    switch(name) {
        case 'List':
                // Change the classes of the sections in the way that the section selected is the only one visible,
                // there's already a class selector created in CSS to hide the sections called "hidden"

            break;
        case 'Add New':
            break;
        case 'Contact':
            break;
        default:
            break;
    }
}

// Click event listener added for each navigation link
links.forEach((section) => {
    section.addEventListener('click', GoToSection);
});