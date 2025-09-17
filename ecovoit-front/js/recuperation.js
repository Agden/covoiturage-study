const utilisateur = JSON.parse(sessionStorage.getItem("user"));

if (utilisateur) {
  // Affichage nom, prénom, email
  document.getElementById("utilisateur-nom").textContent = utilisateur.nom || '';
  document.getElementById("utilisateur-prenom").textContent = utilisateur.prenom || '';
  document.getElementById("utilisateur-email").textContent = utilisateur.email || '';

  // Affichage téléphone et ville (coordonnées)
  document.getElementById("utilisateur-telephone").textContent = utilisatteur.telephone || '';
} else {
  // Si aucun utilisateur n'est connecté, redirection
  window.location.href = "/html/connexion-inscription.html";
}

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}