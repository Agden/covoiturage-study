// Fichier : /js/nav.js
document.addEventListener("DOMContentLoaded", function () {
  const lienConnexion = document.querySelector(".connexion a");

  if (!lienConnexion) return; // Sécurité si le menu n'existe pas

  // Vérifie si l'utilisateur est connecté
  if (sessionStorage.getItem("connecte") === "true") {
    // Change le lien en "Mon profil"
    lienConnexion.textContent = "Mon profil";
    lienConnexion.setAttribute("href", "/html/profil-user.html");

    // Crée et insère un bouton "Déconnexion"
    const boutonDeconnexion = document.createElement("li");
    boutonDeconnexion.className = "deconnexion";
    boutonDeconnexion.innerHTML = `<a href="#">Déconnexion</a>`;

    boutonDeconnexion.addEventListener("click", function (e) {
      e.preventDefault();
      sessionStorage.removeItem("connecte");
      window.location.reload(); // Recharge pour mettre à jour la nav
    });

    // Ajoute après le bouton "connexion"/"profil"
    lienConnexion.parentElement.insertAdjacentElement("afterend", boutonDeconnexion);
  }
});
