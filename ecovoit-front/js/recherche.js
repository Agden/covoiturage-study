// --- carte + autocompletion + résultat de recherche (recherche.html)
const map = L.map("carte").setView([48.8566, 2.3522], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let marker;
let currentRoute;
const apiKey = "147507938da046bb8edfe1a25e43cc1b";
const apiKeyORS = "5b3ce3597851110001cf62487986bc5d0ec44130b4a80dc37c940ac6";

const zoneResultats = document.getElementById("zone-resultats");

// --- Tracage de l'itineraire
function tracerItineraireRoute(depart, arrivee) {
  const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": apiKeyORS,
    },
    body: JSON.stringify({
      coordinates: [
        [depart.lng, depart.lat],
        [arrivee.lng, arrivee.lat],
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (currentRoute) {
        map.removeLayer(currentRoute);
      }

      if (!data || !data.features || data.features.length === 0) {
        alert("Aucun itinéraire trouvé.");
        return;
      }

      currentRoute = L.geoJSON(data.features[0], {
        style: {
          color: "rgb(119, 173, 49)",
          weight: 5,
        },
      }).addTo(map);

      map.fitBounds(currentRoute.getBounds());
    })
    .catch((error) => {
      console.error("Erreur de routage :", error);
    });
}

// --- Auto complétion de villes
function setupAutocomplete(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestions = document.getElementById(suggestionsId);

  input.addEventListener("input", () => {
    const query = input.value.trim();
    if (query.length < 2) {
      suggestions.style.display = "none";
      return;
    }

    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        query
      )}&key=${apiKey}&language=fr&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        suggestions.innerHTML = "";
        if (data.results.length > 0) {
          data.results.forEach((result) => {
            const ville = result.formatted;
            const div = document.createElement("div");
            div.textContent = ville;
            div.classList.add("suggestion-item");
            div.addEventListener("click", () => {
              input.value = ville;
              input.dataset.lat = result.geometry.lat;
              input.dataset.lng = result.geometry.lng;
              suggestions.style.display = "none";
            });
            suggestions.appendChild(div);
          });
          suggestions.style.display = "block";
        } else {
          suggestions.style.display = "none";
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la recherche :", err);
        suggestions.style.display = "none";
      });
  });

  document.addEventListener("click", (e) => {
    if (!suggestions.contains(e.target) && e.target !== input) {
      suggestions.style.display = "none";
    }
  });
}

// --- Action du bouton de recherche
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchBtn");
  const departInput = document.getElementById("depart");
  const arriveeInput = document.getElementById("arrivee");

  setupAutocomplete("depart", "suggestions-depart");
  setupAutocomplete("arrivee", "suggestions-arrivee");

  btn.addEventListener("click", () => {
    let departCoordsPromise;

    if (departInput.value.trim() === "") {
      departCoordsPromise = new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          alert("La géolocalisation n'est pas disponible.");
          reject();
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                label: "Ma position",
              });
            },
            (err) => {
              alert("Impossible d'obtenir la position actuelle.");
              reject();
            }
          );
        }
      });
    } else {
      departCoordsPromise = Promise.resolve({
        lat: parseFloat(departInput.dataset.lat),
        lng: parseFloat(departInput.dataset.lng),
        label: departInput.value,
      });
    }

    const arriveeCoords = {
      lat: parseFloat(arriveeInput.dataset.lat),
      lng: parseFloat(arriveeInput.dataset.lng),
      label: arriveeInput.value,
    };

    departCoordsPromise.then((departCoords) => {
      if (
        !departCoords ||
        isNaN(arriveeCoords.lat) ||
        isNaN(arriveeCoords.lng)
      ) {
        alert("Veuillez sélectionner une adresse valide pour l'arrivée.");
        return;
      }

      tracerItineraireRoute(departCoords, arriveeCoords);

      if (marker) map.removeLayer(marker);

      const markerDepart = L.marker([departCoords.lat, departCoords.lng])
        .bindPopup(`<strong>Départ :</strong> ${departCoords.label}`)
        .addTo(map)
        .openPopup();

      const markerArrivee = L.marker([arriveeCoords.lat, arriveeCoords.lng])
        .bindPopup(`<strong>Arrivée :</strong> ${arriveeCoords.label}`)
        .addTo(map);

      marker = L.layerGroup([markerDepart, markerArrivee]).addTo(map);

      map.setView([departCoords.lat, departCoords.lng], 13);

      const trajetsFictifs = [
  {
    conducteur: "Maxence D.",
    note: "⭐️⭐️⭐️⭐️⭐️",
    profil: "../img/photo-profil-1.jpg",
    places: 2,
    prix: 27.5,
    eco: true,
    heureDepart: "14h30",
    heureArrivee: "19h00",
    date: "24/07/2025",
    lien: "../html/fiche-profil-1.html"
  },
  {
    conducteur: "Gauthier R.",
    note: "⭐️⭐️⭐️⭐️",
    profil: "../img/photo-profil-2.jpg",
    places: 1,
    prix: 30,
    eco: false,
    heureDepart: "13h00",
    heureArrivee: "17h45",
    date: "24/07/2025",
    lien: "../html/fiche-profil-2.html"
  },
  {
    conducteur: "Julie L.",
    note: "⭐️⭐️⭐️⭐️",
    profil: "../img/photo-profil-3.jpg",
    places: 3,
    prix: 26,
    eco: true,
    heureDepart: "17h45",
    heureArrivee: "22h00",
    date: "24/07/2025",
    lien: "../html/fiche-profil-3.html"
  }
];

let html = `<h3>${trajetsFictifs.length} trajets trouvés :</h3>`;
trajetsFictifs.forEach((trajet) => {
  html += `
    <div class="carte-trajet">
      <div class="infos-chauffeur">
        <img src="${trajet.profil}" alt="photo profil conducteur">
        <div>
          <p><strong>${trajet.conducteur}</strong> (${trajet.note})</p>
          <p>${trajet.places} place(s) restante(s)</p>
        </div>
      </div>
      <div class="infos-trajet">
        <p><strong>Départ :</strong> ${departCoords.label} - ${trajet.heureDepart}</p>
        <p><strong>Arrivée :</strong> ${arriveeCoords.label} - ${trajet.heureArrivee}</p>
        <p><strong>Date :</strong> ${trajet.date}</p>
        <p><strong>Prix :</strong> ${trajet.prix} €</p>
        <p><strong>Écologique :</strong> ${trajet.eco ? "🌱 Oui" : "❌ Non"}</p>
      </div>
       <a href="${trajet.lien}" class="btn-details">Détails</a>
      <button class="btn-reserver">Réserver</button>
    </div>
  `;
});

zoneResultats.innerHTML = html;

    });
  });
});

