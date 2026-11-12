const form = document.querySelector("#form-meteo");
const villeInput = document.querySelector("#ville");
const erreur = document.querySelector("#erreur");
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const ville = villeInput.value.trim();

    if (!ville) {
        erreur.textContent = "Veuillez saisir une ville";
        return;
    }

    erreur.textContent = "";
});
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const ville = villeInput.value.trim();

    erreur.textContent = "";

    if (!ville) {
        erreur.textContent = "Veuillez saisir une ville";
        return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=10&language=fr&format=json&countryCode=MA`;

    const response = await fetch(url);
    const data = await response.json();

    const resultat = data.results || find(
        item => item.country_code === "MA"
    );

    if (!resultat) {
        erreur.textContent = "Ville marocaine introuvable";
        return;
    }

    erreur.textContent = `Ville trouvée : ${resultat.name}`;
});
const latitude = resultat.latitude;
const longitude = resultat.longitude;

erreur.textContent = `Latitude : ${latitude} | Longitude : ${longitude}`;

function creerElement(tag, texte, classes = []) {
    const element = document.createElement(tag);
    element.textContent = texte;
    element.classList.add(...classes);
    return element;
}
const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;
const meteoResponse = await fetch(meteoUrl);
const meteoData = await meteoResponse.json();
const temperature = meteoData.current.temperature_2m;

const carte = creerElement("div", "", [
    "bg-blue-100",
    "p-5",
    "rounded-xl"
]);

carte.appendChild(
    creerElement("h2", resultat.name, ["text-2xl", "font-bold"])
);

carte.appendChild(
    creerElement("p", `Température : ${temperature} °C`)
);

resultatMeteo.replaceChildren(carte);
carte.appendChild(
    creerElement("p", `Humidité : ${meteoData.current.relative_humidity_2m} %`)
);

carte.appendChild(
    creerElement("p", `Vent : ${meteoData.current.wind_speed_10m} km/h`)
);
const code = WEATHER_CODES[meteoData.current.weather_code] || {
    label: "Météo inconnue",
};

carte.appendChild(
    creerElement("p", `${code.icon} ${code.label}`)
);
const titrePrevisions = document.createElement("h2");

titrePrevisions.textContent = "Prévisions des 5 prochains jours";

titrePrevisions.classList.add(
    "text-xl",
    "font-bold",
    "my-5"
);

resultat.appendChild(titrePrevisions);
const titrePrevisions = document.createElement("h2");

titrePrevisions.textContent = "Prévisions des 5 prochains jours";

titrePrevisions.classList.add(
    "text-xl",
    "font-bold",
    "my-5"
);

resultat.appendChild(titrePrevisions);
const cartes = document.createElement("div");

cartes.classList.add(
    "grid",
    "grid-cols-1",
    "sm:grid-cols-2",
    "md:grid-cols-5",
    "gap-4"
);

resultat.appendChild(cartes);
jours.forEach((date, index) => {
    const carteJour = document.createElement("div");
    cartes.appendChild(carteJour);
});
carteJour.classList.add(
    "bg-white",
    "p-4",
    "rounded-xl",
    "shadow",
    "text-center"
);
const dateFormatee = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
});
const dateElement = document.createElement("h3");
dateElement.textContent = dateFormatee;
carteJour.appendChild(dateElement);
dateElement.classList.add("font-bold", "capitalize");
const codeJour = WEATHER_CODES[codesJours[index]] || {
    label: "Météo inconnue",
};
const icon = document.createElement("p");
icon.textContent = codeJour.icon;
carteJour.appendChild(icon);
const descriptionJour = document.createElement("p");
descriptionJour.textContent = codeJour.label;

carteJour.appendChild(descriptionJour);