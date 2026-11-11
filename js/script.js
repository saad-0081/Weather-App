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
    56: { label: "Bruine verglaçante", icon: "🌧️" },
    57: { label: "Bruine verglaçante", icon: "🌧️" },
    61: { label: "Pluie légère", icon: "🌧️" },
    63: { label: "Pluie", icon: "🌧️" },
    65: { label: "Pluie forte", icon: "🌧️" },
    66: { label: "Pluie verglaçante", icon: "🌧️" },
    67: { label: "Pluie verglaçante", icon: "🌧️" },
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
const chargement = document.querySelector("#chargement");
const resultat = document.querySelector("#resultat");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nomVille = ville.value.trim();

    if (!nomVille) {
        erreur.textContent = "Veuillez saisir une ville.";
        erreur.classList.remove("hidden");
        chargement.classList.add("hidden");
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
            throw new Error("Ville  pqs trouvee.");
        }

        const villeTrouvee = data.results[0];

        const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${villeTrouvee.latitude}&longitude=${villeTrouvee.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`;

        const responseMeteo = await fetch(urlMeteo);
        const meteo = await responseMeteo.json();

        if (!responseMeteo.ok || !meteo.current || !meteo.daily) {
            throw new Error("Impossible de recuperer la météo.");
        }

        const current = meteo.current;
        const previsions = meteo.daily;

        const creerElement = (tag, texte, classes = []) => {
            const element = document.createElement(tag);
            element.textContent = texte;
            element.classList.add(...classes);
            return element;
        };

        const carte = document.createElement("div");
        carte.classList.add("p-6", "bg-blue-100", "rounded-lg", "shadow", "space-y-3");

        carte.appendChild(creerElement("h2", villeTrouvee.name, ["text-2xl", "font-bold"]));

        const description = WEATHER_CODES[current.weather_code];

        const infos = [
            villeTrouvee.country ? `Pays : ${villeTrouvee.country}` : "Pays : Donnée indisponible",
            description ? `${description.icon} ${description.label}` : "Donnée indisponible",
            current.temperature_2m != null ? `Température : ${current.temperature_2m} °C` : "Température : Donnée indisponible",
            current.relative_humidity_2m != null ? `Humidité : ${current.relative_humidity_2m} %` : "Humidité : Donnée indisponible",
            current.wind_speed_10m != null ? `Vent : ${current.wind_speed_10m} km/h` : "Vent : Donnée indisponible"
        ];

        infos.forEach(info => carte.appendChild(creerElement("p", info)));

        resultat.appendChild(carte);

        resultat.appendChild(creerElement(
            "h2",
            "Prévisions des 5 prochains jours", ["text-2xl", "font-bold", "mt-6"]
        ));

        const listeCartes = document.createElement("div");
        listeCartes.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4");

        previsions.time.forEach((date, i) => {
            const jour = document.createElement("div");
            jour.classList.add("p-4", "bg-white", "rounded-lg", "shadow", "space-y-3");

            const dateFormatee = date ?
                new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                }) :
                "Donnée indisponible";

            const descriptionJour = WEATHER_CODES[previsions.weather_code[i]];

            const infosJour = [
                dateFormatee,
                descriptionJour ? `${descriptionJour.icon} ${descriptionJour.label}` : "Donnée indisponible",
                previsions.temperature_2m_max[i] != null ? `Température maximale : ${previsions.temperature_2m_max[i]} °C` : "Température maximale : Donnée indisponible",
                previsions.temperature_2m_min[i] != null ? `Température minimale : ${previsions.temperature_2m_min[i]} °C` : "Température minimale : Donnée indisponible"
            ];

            infosJour.forEach((info, index) => {
                jour.appendChild(creerElement(index === 0 ? "h3" : "p", info));
            });

            listeCartes.appendChild(jour);
        });

        resultat.appendChild(listeCartes);

    } catch (error) {
        erreur.textContent = error.message;
        erreur.classList.remove("hidden");
    } finally {
        chargement.classList.add("hidden");
    }
});