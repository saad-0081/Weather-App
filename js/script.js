const form = document.querySelector("#form-meteo");
const ville = document.querySelector("#ville");
const erreur = document.querySelector("#erreur");
const chargement = document.querySelector("#chargement");
const resultat = document.querySelector("#resultat");

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    const nomVille = ville.value.trim();

    if (nomVille === "") {
        erreur.textContent = "Veuillez saisir une ville.";
        erreur.classList.remove("hidden");
        resultat.textContent = "";
        return;
    }

    erreur.classList.add("hidden");
    resultat.textContent = "";

    chargement.classList.remove("hidden");

    try {

        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomVille)}&count=1&language=fr&format=json`;

        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("Erreu communication API.");
        }

        const data = await response.json();

        console.log(data);

        if (!data.results || data.results.length === 0) {
            throw new Error("Ville introuvee.");
        }

        const villeTrouvee = data.results[0];

        resultat.textContent =
            `Ville trouvee : ${villeTrouvee.name}, ${villeTrouvee.country}`;

    } catch (error) {

        erreur.textContent = error.message;
        erreur.classList.remove("hide");

    } finally {

        chargement.classList.add("hide");
    }
})