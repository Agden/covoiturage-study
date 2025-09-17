// Sélection des éléments
const messagerie = document.querySelector('.messagerie-container');
const contacts = document.querySelectorAll('.contact');
const backBtn = document.querySelector('.back-btn');

// Pour afficher le nom du contact dans la discussion (optionnel)
const contactNameHeader = document.createElement('h3');
contactNameHeader.style.margin = '0';
contactNameHeader.style.padding = '10px';
contactNameHeader.style.fontSize = '1.2rem';
contactNameHeader.style.fontWeight = 'bold';
backBtn.insertAdjacentElement('afterend', contactNameHeader);

// Clique sur un contact
contacts.forEach(contact => {
    contact.addEventListener('click', () => {
        messagerie.classList.add('active');
        contactNameHeader.textContent = contact.textContent; // afficher le nom sélectionné
    });
});

// Clique sur le bouton retour
backBtn.addEventListener('click', () => {
    messagerie.classList.remove('active');
    contactNameHeader.textContent = ''; // vide le nom
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}