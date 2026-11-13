const WEATHER_CODES = {
    0: ["Ciel dégagé", "☀️"],
    1: ["Plutôt dégagé", "🌤️"],
    2: ["Partiellement nuageux", "⛅"],
    3: ["Couvert", "☁️"],
    45: ["Brouillard", "🌫️"],
    48: ["Brouillard givrant", "🌫️"],
    51: ["Bruine légère", "🌦️"],
    53: ["Bruine", "🌦️"],
    55: ["Bruine forte", "🌦️"],
    56: ["Bruine verglaçante légère", "🌧️"],
    57: ["Bruine verglaçante forte", "🌧️"],
    61: ["Pluie légère", "🌧️"],
    63: ["Pluie", "🌧️"],
    65: ["Pluie forte", "🌧️"],
    66: ["Pluie verglaçante légère", "🌧️"],
    67: ["Pluie verglaçante forte", "🌧️"],
    71: ["Neige légère", "🌨️"],
    73: ["Neige", "🌨️"],
    75: ["Neige forte", "❄️"],
    77: ["Grains de neige", "🌨️"],
    80: ["Averses légères", "🌦️"],
    81: ["Averses", "🌧️"],
    82: ["Averses violentes", "⛈️"],
    85: ["Averses de neige", "🌨️"],
    86: ["Fortes averses de neige", "❄️"],
    95: ["Orage", "⛈️"],
    96: ["Orage avec grêle", "⛈️"],
    99: ["Orage avec forte grêle", "⛈️"]
};

const form = document.querySelector("#form-meteo");
const ville = document.querySelector("#ville");
const erreur = document.querySelector("#erreur");
const chargement = document.querySelector("#chargement");
const resultat = document.querySelector("#resultat");
const reessayer = document.querySelector("#reessayer");

let derniereRecherche = "";

const creer = (tag, texte, classes = []) => {
    const el = document.createElement(tag);
    el.textContent = texte;
    el.classList.add(...classes);
    return el;
};

async function demander(url) {
    let res;

    try {
        res = await fetch(url);
    } catch {
        throw new Error("Vérifiez votre connexion internet.");
    }

    if (res.status === 429)
        throw new Error("quota atteint. re essayez .");

    if (!res.ok)
        throw new Error(`Erreur ${res.status}. API indisponible.`);

    try {
        return await res.json();
    } catch {
        throw new Error("Réponse JSON invalide.");
    }
}

form.addEventListener("submit", async e => {
    e.preventDefault();

    const nom = ville.value.trim();

    if (!nom) {
        erreur.textContent = "Veuillez saisir une ville.";
        erreur.classList.remove("hidden");
        chargement.classList.add("hidden");
        reessayer.classList.add("hidden");
        resultat.replaceChildren();
        return;
    }

    derniereRecherche = nom;

    erreur.classList.add("hidden");
    reessayer.classList.add("hidden");
    chargement.classList.remove("hidden");
    resultat.replaceChildren();

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nom)}&count=10&language=fr&format=json`;

        const data = await demander(url);

        let city;

        if (data.results) {
            city = data.results.find(v => v.country_code === "MA");
        }

        if (!city)
            throw new Error("Ville inconnue. Entrez une ville marocaine.");

        const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`;

        const meteo = await demander(urlMeteo);

        const current = meteo.current;
        const daily = meteo.daily;

        if (!current || !daily)
            throw new Error("Données météo introuvables.");

        const carte = creer("div", "", [
            "p-6", "bg-blue-100", "rounded-2xl", "shadow", "space-y-3"
        ]);

        carte.appendChild(creer("h2", city.name, [
            "text-2xl", "font-bold", "text-blue-900"
        ]));

        const info = WEATHER_CODES[current.weather_code];

        [
            `Pays : ${city.country || "Indisponible"}`,
            info ? `${info[1]} ${info[0]}` : "Météo indisponible",
            `Température : ${current.temperature_2m ?? "indisponible"} °C`,
            `Humidité : ${current.relative_humidity_2m ?? "indisponible"} %`,
            `Vent : ${current.wind_speed_10m ?? "indisponible"} km/h`
        ].forEach(t => carte.appendChild(creer("p", t)));

        resultat.appendChild(carte);

        resultat.appendChild(creer("h2", "Prévisions des 5 prochains jours", [
            "text-2xl", "font-bold", "text-blue-900", "mt-6"
        ]));

        const liste = creer("div", "", [
            "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-4"
        ]);

        daily.time.forEach((date, i) => {
            const jour = creer("div", "", [
                "p-4", "bg-white", "rounded-xl", "shadow", "space-y-3"
            ]);

            const dateFr = new Date(date + "T12:00:00")
                .toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                });

            const infoJour = WEATHER_CODES[daily.weather_code[i]];

            jour.appendChild(creer("h3", dateFr, [
                "font-bold", "text-blue-800", "capitalize"
            ]));

            [
                infoJour ? `${infoJour[1]} ${infoJour[0]}` : "Météo indisponible",
                `Température maximale : ${daily.temperature_2m_max[i] ?? "Indisponible"} °C`,
                `Température minimale : ${daily.temperature_2m_min[i] ?? "Indisponible"} °C`
            ].forEach(t => jour.appendChild(creer("p", t, ["text-gray-700"])));

            liste.appendChild(jour);
        });

        resultat.appendChild(liste);

    } catch (err) {
        erreur.textContent = err.message;
        erreur.classList.remove("hidden");
        reessayer.classList.remove("hidden");

    } finally {
        chargement.classList.add("hidden");
    }
});

reessayer.onclick = () => form.requestSubmit();