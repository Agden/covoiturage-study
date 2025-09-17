// Sélectionne tous les boutons "Annuler"
document.querySelectorAll('.btn-annuler').forEach(bouton => {
    bouton.addEventListener('click', () => {
        const confirmation = confirm("Souhaitez-vous vraiment annuler ce trajet ? Si oui, un mail sera envoyé au conducteur pour l'avertir.");
        if (confirmation) {
            // Supprime le bloc parent
            const trajet = bouton.closest('.trajet-1');
            if (trajet) {
                trajet.remove();
            }
        }
    });
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}