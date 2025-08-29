// FORMULAIRES CONNEXION / CRÉATION / OUBLI
// Pour connexion-inscription.html

document.addEventListener("DOMContentLoaded", () => {
  const boutonCreation = document.getElementById("bouton-creation");
  const boutonConnexion = document.getElementById("bouton-connexion");
  const formulaireCreation = document.getElementById("formulaire-creation");
  const formulaireConnexion = document.getElementById("formulaire-connexion");
  const boutonOublie = document.getElementById("oublie-mdp");
  const formulaireOublie = document.getElementById("formulaire-oublie");

  boutonCreation.addEventListener("click", () => {
    formulaireCreation.style.display = "block";
    formulaireConnexion.style.display = "none";
    formulaireOublie.style.display = "none";
  });

  boutonConnexion.addEventListener("click", () => {
    formulaireConnexion.style.display = "block";
    formulaireCreation.style.display = "none";
    formulaireOublie.style.display = "none";
  });

  boutonOublie.addEventListener("click", () => {
    formulaireOublie.style.display = "block";
    formulaireCreation.style.display = "none";
    formulaireConnexion.style.display = "none";
  });
});