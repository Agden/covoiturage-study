// === MENU DÉROULANT (Navigateur mobile) ===
document.addEventListener("DOMContentLoaded", function () {
  const profilBtn = document.querySelector(".nav-h-btn-profil");
  const profilMenu = document.getElementById("profil-menu");

  profilBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profilMenu.style.display =
      profilMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!profilMenu.contains(e.target) && !profilBtn.contains(e.target)) {
      profilMenu.style.display = "none";
    }
  });
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}