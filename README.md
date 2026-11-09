# 🌤️ Application Météo

## 1. Présentation

Application web permettant de consulter la météo de plusieurs villes et les prévisions des prochains jours grâce à une API publique.

## 2. Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- Open-Meteo API
- Git et GitHub

## 3. API utilisée

Le projet utilise **Open-Meteo**, une API gratuite sans clé API pour un usage non commercial.

Documentation : https://open-meteo.com/en/docs

**Endpoints :**

- Geocoding : recherche d'une ville et récupération de ses coordonnées.
- Forecast : récupération des conditions actuelles et des prévisions.

## 4. Fonctionnalités

- **US-01 :** Recherche d'une ville.
- **US-02 :** Affichage de la météo actuelle (température, humidité, vent et description).
- **US-03 :** Affichage des prévisions sur 7 jours.
- **US-04 :** Gestion des erreurs et indicateur de chargement.
- **US-05 :** Documentation de l'API.
- **US-06 :** Versionnement avec GitHub et déploiement.

## 5. Fonctionnement

1. L'utilisateur saisit une ville.
2. JavaScript envoie une requête GET avec Fetch API.
3. L'application vérifie `response.ok`.
4. Les données sont récupérées avec `response.json()`.
5. Les informations sont affichées dans le DOM sous forme de cartes météo.

## 6. Structure du projet

```text
weather-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── screenshots/
├── tests/
│   └── test-manuel.md
└── README.md
```

## 7. Installation

```bash
git clone URL_DU_DEPOT
cd weather-app
```

Ouvrir `index.html` avec Live Server.

## 8. Tests

- Recherche d'une ville valide.
- Recherche d'une ville inconnue.
- Vérification du champ vide.
- Vérification des conditions actuelles.
- Vérification des prévisions.
- Test en cas de problème Internet.

## 9. Déploiement

Le projet sera hébergé avec GitHub Pages.

## 10. Conclusion

Ce projet permet de pratiquer JavaScript, Fetch API, JSON, async/await et la manipulation du DOM à travers une application météo simple et fonctionnelle.

**Auteur :saad el moudnib

