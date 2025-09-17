// Affichage / masquage du formulaire connexion
const btnConnexion = document.getElementById("bouton-connexion");
const formConnexion = document.getElementById("formulaire-connexion");

btnConnexion.addEventListener("click", () => {
  formConnexion.style.display = "block";
});

// CONNEXION
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
      // Stocker le token pour gérer la session
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/html/profil-user.html";
    } else {
      alert("Erreur : " + data.error);
    }
  } catch (err) {
    console.error("Erreur requête login :", err);
    alert("Erreur lors de la connexion, vérifie ton serveur");
  }
});

// Compte admin en dur
const adminCredentials = {
    email: "ecovoit.test@gmail.com",
    password: "ecovoittest01122012"
};

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Vérification admin
    if (email === adminCredentials.email && password === adminCredentials.password) {
        sessionStorage.setItem("user", JSON.stringify({
            email: email,
            role: "admin"
        }));
        alert("Connexion réussie en tant qu'administrateur !");
        window.location.href = "profil-user.html";
    } else {
        alert("Identifiants incorrects !");
    }
});