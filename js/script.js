const WEATHER_CODES = {
    0: { label: "Ciel dégagé", icon: "☀️" },
    1: { label: "Plutôt dégagé", icon: "🌤️" },
    2: { label: "Partiellement nuageux", icon: "⛅" },
    3: { label: "Couvert", icon: "☁️" },
    45: { label: "Brouillard", icon: "🌫️" },
    48: { label: "Brouillard givrant", icon: "🌫️" },
    51: { label: "Bruine légère", icon: "🌦️" },
    53: { label: "Bruine", icon: "🌦️" },
    55: { label: "Bruine forte", icon: "🌦️" },
    61: { label: "Pluie légère", icon: "🌧️" },
    63: { label: "Pluie", icon: "🌧️" },
    65: { label: "Pluie forte", icon: "🌧️" },
    71: { label: "Neige légère", icon: "🌨️" },
    73: { label: "Neige", icon: "🌨️" },
    75: { label: "Neige forte", icon: "❄️" },
    80: { label: "Averses légères", icon: "🌦️" },
    81: { label: "Averses", icon: "🌧️" },
    82: { label: "Averses violentes", icon: "⛈️" },
    95: { label: "Orage", icon: "⛈️" },
    96: { label: "Orage avec grêle", icon: "⛈️" },
    99: { label: "Orage avec forte grêle", icon: "⛈️" }
};

const form = document.querySelector("#form-meteo");
const ville = document.querySelector("#ville");
const erreur = document.querySelector("#erreur");
const chargement = document.querySelector("#chargement");
const resultat = document.querySelector("#resultat");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nomVille = ville.value.trim();

    if (!nomVille) {
        erreur.textContent = "Veuillez saisir une ville.";
        erreur.classList.remove("hidden");
        resultat.replaceChildren();
        return;
    }

    erreur.classList.add("hidden");
    chargement.classList.remove("hidden");
    resultat.replaceChildren();

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomVille)}&count=1&language=fr&format=json&countryCode=MA`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || !data.results || !data.results.length) {
            throw new Error("Ville pas trouvee.");
        }

        const villeTrouvee = data.results[0];

        const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${villeTrouvee.latitude}&longitude=${villeTrouvee.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        const responseMeteo = await fetch(urlMeteo);
        const meteo = await responseMeteo.json();

        if (!responseMeteo.ok || !meteo.current) {
            throw new Error("pas recuperer la météo.");
        }

        const current = meteo.current;
        const description = WEATHER_CODES[current.weather_code];

        const creerElement = (tag, texte, classes = []) => {
            const element = document.createElement(tag);
            element.textContent = texte;
            element.classList.add(...classes);
            return element;
        };

        const carte = document.createElement("div");
        carte.classList.add("p-6", "bg-blue-100", "rounded-lg", "shadow", "space-y-3");

        carte.appendChild(creerElement("h2", villeTrouvee.name, ["text-2xl", "font-bold"]));

        const infos = [
            `Pays : ${villeTrouvee.country || "Donnée indisponible"}`,
            description ? `${description.icon} ${description.label}` : "Donnée indisponible",
            current.temperature_2m != null ? `Température : ${current.temperature_2m} °C` : "Température : Donnée indisponible",
            current.relative_humidity_2m != null ? `Humidité : ${current.relative_humidity_2m} %` : "Humidité : Donnée indisponible",
            current.wind_speed_10m != null ? `Vent : ${current.wind_speed_10m} km/h` : "Vent : Donnée indisponible"
        ];

        infos.forEach(info => {
            carte.appendChild(creerElement("p", info));
        });

        resultat.appendChild(carte);

    } catch (error) {
        erreur.textContent = error.message;
        erreur.classList.remove("hidden");
    } finally {
        chargement.classList.add("hidden");
    }
});