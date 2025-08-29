const apiKey = "147507938da046bb8edfe1a25e43cc1b";

function setupAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestions = document.getElementById(suggestionsId);

    input.addEventListener("input", async () => {
        const query = input.value;
        if (query.length < 2) {
            suggestions.innerHTML = "";
            return;
        }

        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=fr&limit=5`);
        const data = await response.json();

        suggestions.innerHTML = ""; // Vide les anciennes suggestions

        data.results.forEach(result => {
            const city = result.components.city || result.components.town || result.components.village;
            if (city) {
                const item = document.createElement("div");
                item.textContent = city;
                item.classList.add("suggestion-item");

                item.addEventListener("click", () => {
                    input.value = city;
                    suggestions.innerHTML = ""; // Cache suggestions après le clic
                });

                suggestions.appendChild(item);
            }
        });
    });
}

// Initialise l'autocomplétion sur les deux champs
setupAutocomplete("depart", "suggestions-depart");
setupAutocomplete("arrivee", "suggestions-arrivee");
