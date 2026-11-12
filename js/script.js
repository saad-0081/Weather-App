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
    56: { label: "Bruine verglaçante légère", icon: "🌧️" },
    57: { label: "Bruine verglaçante forte", icon: "🌧️" },
    61: { label: "Pluie légère", icon: "🌧️" },
    63: { label: "Pluie", icon: "🌧️" },
    65: { label: "Pluie forte", icon: "🌧️" },
    66: { label: "Pluie verglaçante légère", icon: "🌧️" },
    67: { label: "Pluie verglaçante forte", icon: "🌧️" },
    71: { label: "Neige légère", icon: "🌨️" },
    73: { label: "Neige", icon: "🌨️" },
    75: { label: "Neige forte", icon: "❄️" },
    77: { label: "Grains de neige", icon: "🌨️" },
    80: { label: "Averses légères", icon: "🌦️" },
    81: { label: "Averses", icon: "🌧️" },
    82: { label: "Averses violentes", icon: "⛈️" },
    85: { label: "Averses de neige", icon: "🌨️" },
    86: { label: "Fortes averses de neige", icon: "❄️" },
    95: { label: "Orage", icon: "⛈️" },
    96: { label: "Orage avec grêle", icon: "⛈️" },
    99: { label: "Orage avec forte grêle", icon: "⛈️" }
};

const form = document.querySelector("#form-meteo");
const ville = document.querySelector("#ville");
const erreur = document.querySelector("#erreur");
const resultat = document.querySelector("#resultat");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nomVille = ville.value.trim();

    if (!nomVille) {
        erreur.textContent = "Veuillez saisir une ville.";
        erreur.classList.remove("hidden");
        return;
    }

    erreur.classList.add("hidden");
    resultat.replaceChildren();

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomVille)}&count=10&language=fr&format=json&countryCode=MA`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API indisponible.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("Ville inconnue.");
        }

        const villeTrouvee = data.results.find(
            v => v.country_code === "MA"
        );

        if (!villeTrouvee) {
            throw new Error("Ville marocaine introuvable.");
        }

        const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${villeTrouvee.latitude}&longitude=${villeTrouvee.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        const responseMeteo = await fetch(urlMeteo);

        if (!responseMeteo.ok) {
            throw new Error("API météo indisponible.");
        }

        const meteo = await responseMeteo.json();

        if (!meteo.current) {
            throw new Error("Données météo introuvables.");
        }

        const current = meteo.current;
        const description = WEATHER_CODES[current.weather_code];

        const carte = document.createElement("div");

        carte.classList.add(
            "p-6",
            "bg-blue-100",
            "rounded-2xl",
            "shadow",
            "space-y-3"
        );

        const titre = document.createElement("h2");
        titre.textContent = villeTrouvee.name;
        titre.classList.add("text-2xl", "font-bold", "text-blue-900");

        carte.appendChild(titre);

        const infos = [
            description ?
            `${description.icon} ${description.label}` :
            "Donnée indisponible",

            current.temperature_2m != null ?
            `Température : ${current.temperature_2m} °C` :
            "Température : Donnée indisponible",

            current.relative_humidity_2m != null ?
            `Humidité : ${current.relative_humidity_2m} %` :
            "Humidité : Donnée indisponible",

            current.wind_speed_10m != null ?
            `Vent : ${current.wind_speed_10m} km/h` :
            "Vent : Donnée indisponible"
        ];

        infos.forEach(info => {
            const p = document.createElement("p");
            p.textContent = info;
            carte.appendChild(p);
        });

        resultat.appendChild(carte);

    } catch (error) {
        erreur.textContent = error.message;
        erreur.classList.remove("hidden");
    }
});