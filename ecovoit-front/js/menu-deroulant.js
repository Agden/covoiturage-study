document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".nav-h-btn-profil");
  const menu = document.getElementById("profil-menu");
  if (!toggleBtn || !menu) return;

  // Laisse le CSS décider de l'état initial (tu as déjà display:none)
  // mais si un style inline traîne, on normalise :
  // menu.style.removeProperty("display");

  const isOpen = () => menu.style.display === "block";

  const open = () => {
    menu.style.display = "block";
    toggleBtn.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    menu.style.display = "none";
    toggleBtn.setAttribute("aria-expanded", "false");
  };
  const toggle = (e) => {
    e.stopPropagation();
    isOpen() ? close() : open();
  };

  // Accessibilité
  toggleBtn.setAttribute("aria-haspopup", "true");
  toggleBtn.setAttribute("aria-expanded", "false");

  // Ouvrir/fermer
  toggleBtn.addEventListener("click", toggle);

  // Clic à l’extérieur → ferme
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== toggleBtn && isOpen()) close();
  });

  // Échap → ferme
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) close();
  });

  // Empêche la fermeture immédiate quand on clique dans le menu
  menu.addEventListener("click", (e) => e.stopPropagation());
});