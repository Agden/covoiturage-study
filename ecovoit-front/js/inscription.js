document.addEventListener("DOMContentLoaded", () => {
  // Boutons
  const btnCreation  = document.getElementById("bouton-creation");
  const btnConnexion = document.getElementById("bouton-connexion");
  const btnOublie    = document.getElementById("oublie-mdp");

  // Panneaux
  const panelCreation  = document.getElementById("formulaire-creation");
  const panelConnexion = document.getElementById("formulaire-connexion");
  const panelOublie    = document.getElementById("formulaire-oublie");

  // Sécurité si des IDs manquent
  if (!panelCreation || !panelConnexion || !panelOublie) return;

  const panels = {
    cre: panelCreation,
    con: panelConnexion,
    ouv: panelOublie,
  };

  // Ferme tout
  function hideAll() {
    for (const p of Object.values(panels)) p.style.display = "none";
  }

  // État courant (null = rien d'ouvert)
  let openKey = null;

  // Ouvre/ferme selon la clé ("cre" | "con" | "ouv")
  function togglePanel(key) {
    if (openKey === key) {
      // Re-clic sur le même bouton -> tout fermer
      hideAll();
      openKey = null;
      return;
    }
    // Ouvre le demandé, ferme le reste
    hideAll();
    panels[key].style.display = "block";
    openKey = key;
  }

  // État initial : tout fermé
  hideAll();

  // Listeners (only if the button exists)
  if (btnCreation)  btnCreation.addEventListener("click",  () => togglePanel("cre"));
  if (btnConnexion) btnConnexion.addEventListener("click", () => togglePanel("con"));
  if (btnOublie)    btnOublie.addEventListener("click",   () => togglePanel("ouv"));
});
