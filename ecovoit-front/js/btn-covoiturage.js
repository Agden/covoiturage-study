// Pour fichier "proposition-trajet.html"
// Modification du bouton "démarrer" en "terminer"
document.querySelectorAll(".btn-covoiturage").forEach(button => {
    button.addEventListener("click", function () {
        if (this.textContent === "Démarrer le covoiturage") {
            this.textContent = "Fin du covoiturage";
        } else {
            alert("Vos crédits seront mis à jour. Un mail sera envoyé aux passagers pour valider le trajet et laisser une note et un avis.");

            function deduireCredits() {
                const creditElement = document.querySelector(".photo-profil p");
                if (!creditElement) {
                    console.error("Élément contenant les crédits introuvable !");
                    return;
                }
                const currentCreditText = creditElement.textContent;
                const creditMatch = currentCreditText.match(/(\d+)/);
                if (creditMatch) {
                    let currentCredits = parseInt(creditMatch[1], 10);
                    if (currentCredits >= 2) {
                        currentCredits -= 2;
                        creditElement.innerHTML = `<b>Crédits :</b> ${currentCredits}`;
                    } else {
                        alert("Vous n'avez pas assez de crédits pour effectuer cette action.");
                    }
                } else {
                    console.error("Aucun nombre de crédits détecté dans le texte.");
                }
            }

            if (sessionStorage.getItem("trajetTermine") === "true") {
                deduireCredits();
                sessionStorage.removeItem("trajetTermine");
            }

            this.disabled = true;
            this.textContent = "Covoiturage terminé";
            this.style.backgroundColor = "gray";
            console.log("Fin du covoiturage cliqué");
        }
    });
});

// GESTION DU FORMULAIRE : Ajouter un trajet dynamiquement
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const depart = document.getElementById("depart").value;
    const arrivee = document.getElementById("arrivee").value;
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;
    const places = document.getElementById("places").value;
    const prix = document.getElementById("prix").value;

    const nouvelleCarte = document.createElement("div");
    nouvelleCarte.className = "proposition-dynamique";
    nouvelleCarte.innerHTML = `
        <p><b>Départ :</b> ${depart}</p>
        <p><b>Arrivée :</b> ${arrivee}</p>
        <p><b>Le :</b> ${convertDateFr(date)}</p>
        <p><b>Heure :</b> ${convertHeureFr(heure)}</p>
        <p><b>Nb place :</b> ${places}</p>
        <p><b>Prix / personne :</b> ${prix}€</p>
        <div class="btn-bas-propo">
            <button class="btn-modifier" type="button">Modifier</button>
            <button class="btn-supprimer" type="button">Supprimer</button>
        </div>
    `;

    document.querySelector(".cadre-mes-propositions").appendChild(nouvelleCarte);

    attachDynamicButtons(nouvelleCarte);

    form.reset();
});

//Attacher boutons "Modifier" et "Supprimer"
function attachDynamicButtons(carte) {
    carte.querySelector(".btn-modifier").addEventListener("click", function () {
        const getValue = (label) => {
            const p = Array.from(carte.querySelectorAll("p")).find(p => p.textContent.startsWith(label));
            return p ? p.textContent.split(":")[1].trim() : "";
        };

        document.getElementById("depart").value = getValue("Départ");
        document.getElementById("arrivee").value = getValue("Arrivée");
        document.getElementById("date").value = convertDate(getValue("Le"));
        document.getElementById("heure").value = convertHeure(getValue("Heure"));
        document.getElementById("places").value = getValue("Nb place");
        document.getElementById("prix").value = getValue("Prix / personne").replace("€", "").trim();

        document.querySelector(".trajet-form").scrollIntoView({ behavior: "smooth" });
        carte.remove();
    });

    carte.querySelector(".btn-supprimer").addEventListener("click", function () {
        if (confirm("Voulez-vous vraiment supprimer ce trajet ?")) {
            carte.remove();
        }
    });
}

// Appliquer la logique aux trajets codés en dur
document.querySelectorAll(".cadre-mes-propositions > div").forEach(div => {
    attachDynamicButtons(div);
});

// Convertir date 26/07/2025 → 2025-07-26
function convertDate(dateStr) {
    const [jour, mois, annee] = dateStr.split("/");
    return `${annee}-${mois}-${jour}`;
}

// Convertir heure 14 H 30 → 14:30
function convertHeure(heureStr) {
    const [h, m] = heureStr.split("H").map(s => s.trim());
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
}

// Format affichage date 26/07/2025
function convertDateFr(dateStr) {
    const [annee, mois, jour] = dateStr.split("-");
    return `${jour}/${mois}/${annee}`;
}

// Format affichage heure avec H 
function convertHeureFr(heureStr) {
    const [h, m] = heureStr.split(":");
    return `${h} H ${m}`;
}

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.role === "admin") {
    console.log("Bienvenue admin !");
} else {
    console.log("Utilisateur standard ou non connecté");
}