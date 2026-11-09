# 🌤️ Weather App — Application Météo

## 1. Présentation du projet

Le client souhaite une application web météo simple permettant aux utilisateurs de rechercher plusieurs villes, consulter les conditions météorologiques actuelles et visualiser les prévisions des prochains jours grâce à une API publique.

## 2. Éléments à afficher sur l'écran

- Titre de l'application.
- Champ de recherche d'une ville.
- Bouton de recherche.
- Indicateur de chargement.
- Carte météo actuelle.
- Température, humidité et vitesse du vent.
- Description et icône météo.
- Prévisions des 7 prochains jours.
- Messages d'erreur.

## 3. API choisie

**Open-Meteo API**

- Gratuite pour un usage non commercial.
- Sans clé API.
- Données météorologiques actuelles et prévisions.

Documentation officielle : https://open-meteo.com/en/docs

### Endpoints utilisés

**Geocoding :** rechercher une ville et récupérer ses coordonnées.

https://geocoding-api.open-meteo.com/v1/search

**Forecast :** récupérer les données météorologiques.

https://api.open-meteo.com/v1/forecast

## 4. User Stories

### US-01 — Rechercher une ville
Permettre à l'utilisateur de saisir une ville et lancer une recherche avec un bouton.

### US-02 — Consulter la météo actuelle
Afficher la température, l'humidité, le vent et la description météorologique.

### US-03 — Consulter les prévisions
Afficher les prévisions météorologiques des prochains jours sous forme de cartes.

### US-04 — Gérer les erreurs
Afficher des messages clairs en cas de ville inconnue, de problème Internet ou d'indisponibilité de l'API.

### US-05 — Documenter l'intégration
Expliquer l'API utilisée, les endpoints et le fonctionnement des données JSON.

### US-06 — Versionner et présenter
Organiser le projet sur GitHub, utiliser des commits réguliers et préparer une démonstration.

## 5. Technologies utilisées
HTML5 : structure de l'application.
Tailwind CSS : design et responsive.
JavaScript ES6+ : logique de l'application.

Fetch API : communication avec l'API météo.

Open-Meteo : données météorologiques.

Git et GitHub : versionnement.

GitHub Pages : déploiement.

## 6. Fonctionnement technique

1. L'utilisateur saisit une ville.
2. JavaScript envoie une requête HTTP GET avec Fetch API.
3. L'application vérifie `response.ok`.
4. Les données sont récupérées avec `response.json()`.
5. Les données sont affichées dans le DOM.

## 7. Structure du projet

weather-app/
├── index.html
├── src/
│   └── style.css
├── js/
│   └── script.js
├── screenshots/
├── tests/
│   └── test-manuel.md
├── package.json
└── README.md

## 8. Installation

Cloner le dépôt :

```bash
git clone URL_DU_DEPOT
```

Accéder au dossier :

```bash
cd weather-app
```

Ouvrir `index.html` avec Live Server.

## 9. Tests

- Rechercher une ville valide.
- Rechercher une ville inconnue.
- Tester le champ vide.
- Vérifier les données météo.
- Vérifier les prévisions.
- Tester la gestion des erreurs.

## 10. Déploiement

L'application sera hébergée sur GitHub Pages.

