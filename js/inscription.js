// ======================
// Affichage / masquage des formulaires
// ======================
const btnCreation = document.getElementById("bouton-creation");
const btnConnexion = document.getElementById("bouton-connexion");

const formCreation = document.getElementById("formulaire-creation");
const formConnexion = document.getElementById("formulaire-connexion");

btnCreation.addEventListener("click", () => {
  formCreation.style.display = "block";
  formConnexion.style.display = "none";
});

btnConnexion.addEventListener("click", () => {
  formConnexion.style.display = "block";
  formCreation.style.display = "none";
});

// ======================
// INSCRIPTION
// ======================
document.querySelector("#formulaire-creation form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const genre = document.querySelector('input[name="genre"]:checked')?.value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const langue = document.querySelector(".form-langue").value;

  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, genre, telephone, email, password, langue })
    });

    const data = await res.json();
    console.log("Réponse serveur :", data);

    if (data.success) {
      alert("Compte créé avec succès !");
      formCreation.reset();
    } else {
      alert("Erreur : " + data.error);
    }
  } catch (err) {
    console.error("Erreur requête :", err);
  }
});

// ======================
// CONNEXION
// ======================
document.querySelector("#formulaire-connexion form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#formulaire-connexion input[type='email']").value;
  const password = document.querySelector("#formulaire-connexion input[type='password']").value;

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("Réponse login :", data);

    if (data.success) {
      alert("Connexion réussie !");
      // Ici tu pourras stocker le token pour gérer la session
      // sessionStorage.setItem("token", data.token)
    } else {
      alert("Erreur : " + data.error);
    }
  } catch (err) {
    console.error("Erreur requête login :", err);
  }
});