const user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
  // Affichage nom, prénom, email
  document.getElementById("user-nom").textContent = user.nom || '';
  document.getElementById("user-prenom").textContent = user.prenom || '';
  document.getElementById("user-email").textContent = user.email || '';

  // Affichage téléphone et ville (coordonnées)
  document.getElementById("user-telephone").textContent = user.telephone || '';
} else {
  // Si aucun utilisateur n'est connecté, redirection
  window.location.href = "/html/connexion-inscription.html";
}
