document.addEventListener("DOMContentLoaded", () => {
  const formCreation  = document.querySelector("#formulaire-creation form, #formulaire-creation");
  const formConnexion = document.querySelector("#formulaire-connexion form, #formulaire-connexion");
  const getCreationData = () => {
    const root = formCreation;
    return {
      nom:      root?.querySelector('input[name="nom"], #nom')?.value?.trim(),
      email:    root?.querySelector('input[name="email"], #email')?.value?.trim(),
      password: root?.querySelector('input[name="password"], #password')?.value
    };
  };

  const getConnexionData = () => {
    const root = formConnexion;
    return {
      email:    root?.querySelector('input[name="email"], #email')?.value?.trim(),
      password: root?.querySelector('input[name="password"], #password')?.value
    };
  };

  // === CRÉATION DE COMPTE ===
  if (formCreation) {
    formCreation.addEventListener("submit", (e) => {
      e.preventDefault();

      const { nom, email, password } = getCreationData();
      if (!nom || !email || !password) {
        alert("Merci de remplir nom, email et mot de passe.");
        return;
      }

      alert("Compte créé (simulation).");
      window.location.href = "./profil-user.html";
    });
  }

  // === CONNEXION ===
  if (formConnexion) {
    formConnexion.addEventListener("submit", (e) => {
      e.preventDefault();

      const { email, password } = getConnexionData();
      if (!email || !password) {
        alert("Merci d’entrer email et mot de passe.");
        return;
      }

      // Simulation
      localStorage.setItem("token", "FAUX_TOKEN_DE_TEST");
      alert("Connexion réussie (simulation).");
      window.location.href = "./index.html";
    });
  }

  console.log("[forms] JS chargé.");
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}