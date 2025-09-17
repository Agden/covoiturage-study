// Pour modifier les info dans body-1
document.addEventListener("DOMContentLoaded", function () {
  // sélection des boutons "Modifier"
  const buttons = document.querySelectorAll(".btn-modifier");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // remonte au <tr> et trouve le <td class="editable">
      const row = btn.closest("tr");
      const editableTd = row.querySelector(".editable");

      // Si déjà en mode édition → on sauvegarde
      if (editableTd.querySelector("input")) {
        const input = editableTd.querySelector("input");
        editableTd.textContent = input.value; // on remplace par la nouvelle valeur
        btn.textContent = "Modifier"; // on remet le bouton normal
      } else {
        // Sinon → on passe en mode édition
        const currentText = editableTd.textContent;
        editableTd.innerHTML = `<input type="text" value="${currentText}">`;
        btn.textContent = "Enregistrer"; // on change le bouton
      }
    });
  });
});

  // Champs du formulaire
  const nomPrenom = document.getElementById("inputNomPrenom");
  const tel = document.getElementById("inputTel");
  const email = document.getElementById("inputEmail");
  const permis = document.getElementById("inputPermis");
  const marque = document.getElementById("inputMarque");
  const modele = document.getElementById("inputModele");
  const plaque = document.getElementById("inputPlaque");
  const dateImmat = document.getElementById("inputDateImmat");

  // Champs à afficher
  const spanNomPrenom = document.getElementById("nom-prenom");
  const spanTel = document.getElementById("tel");
  const spanEmail = document.getElementById("email");
  const spanPermis = document.getElementById("permis");
  const spanMarque = document.getElementById("marque");
  const spanModele = document.getElementById("modele");
  const spanPlaque = document.getElementById("plaque");
  const spanDateImmat = document.getElementById("dateImmat");

  // Remplir les champs du formulaire avec les valeurs actuelles
  editBtn.addEventListener("click", function () {
    infosForm.style.display = "block";
    infosDisplay.style.display = "none";
    nomPrenom.value = spanNomPrenom.textContent;
    tel.value = spanTel.textContent;
    email.value = spanEmail.textContent;
    permis.value = spanPermis.textContent;
    marque.value = spanMarque.textContent;
    modele.value = spanModele.textContent;
    plaque.value = spanPlaque.textContent;
    dateImmat.value = spanDateImmat.textContent.slice(3) + "-" + spanDateImmat.textContent.slice(0,2);
  });

  infosForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Mettre à jour les champs affichés
    spanNomPrenom.textContent = nomPrenom.value;
    spanTel.textContent = tel.value;
    spanEmail.textContent = email.value;
    spanPermis.textContent = permis.value;
    spanMarque.textContent = marque.value;
    spanModele.textContent = modele.value;
    spanPlaque.textContent = plaque.value;
    spanDateImmat.textContent = dateImmat.value ? dateImmat.value.split("-").reverse().join("/") : "";

    infosForm.style.display = "none";
    infosDisplay.style.display = "block";
  });


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("description-form");
  const textarea = document.getElementById("description");
  const modifierBtn = document.querySelector(".modif-3");
  const body3 = document.querySelector(".body-3");

  let descriptionDisplay;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const description = textarea.value.trim();

    // Supprime l'ancien paragraphe s'il y a pour éviter les doublons
    if (descriptionDisplay) {
      descriptionDisplay.remove();
    }

    // Création dynamique à chaque fois
    descriptionDisplay = document.createElement("p");
    descriptionDisplay.style.margin = "15px";
    descriptionDisplay.style.color = "rgb(65, 65, 65)";
    descriptionDisplay.style.whiteSpace = "pre-wrap";
    descriptionDisplay.textContent = description || "(Aucune description fournie)";

    form.style.display = "none";
    body3.insertBefore(descriptionDisplay, form);
    modifierBtn.style.display = "flex";
  });

  modifierBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (descriptionDisplay) {
      descriptionDisplay.remove();
    }
    form.style.display = "block";
    modifierBtn.style.display = "none"; // Cache le bouton pendant la modification
  });
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}