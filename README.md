
# 🌤️ Weather App — Météo Maroc

## 1. Présentation du projet

Météo Maroc est une application web qui permet de rechercher une ville marocaine et de consulter les conditions météorologiques actuelles ainsi que les prévisions des 7 prochains jours.

## 2. Fonctionnalités

- Rechercher une ville au Maroc.
- Afficher la température actuelle.
- Afficher l'humidité.
- Afficher la vitesse du vent.
- Afficher une description et une icône météo.
- Afficher les prévisions des 7 prochains jours.
- Afficher un indicateur de chargement.
- Gérer les erreurs.
- Réessayer une recherche après une erreur.

## 3. Technologies utilisées

- HTML5 : structure de la page.
- Tailwind CSS : design et responsive.
- JavaScript ES6+ : logique de l'application.
- Fetch API : communication avec les API.
- Open-Meteo : données météorologiques.
- Git et GitHub : versionnement.
- GitHub Pages : déploiement.

## 4. API utilisée

Le projet utilise Open-Meteo.

Documentation officielle :
https://open-meteo.com/en/docs

L'API utilisée ne nécessite pas de clé API pour les requêtes de ce projet.

### 4.1 Geocoding API

Endpoint :

https://geocoding-api.open-meteo.com/v1/search

Paramètres :

| Paramètre | Description |
|---|---|
| name | Nom de la ville recherchée |
| count | Nombre de résultats demandés |
| language | Langue des résultats |
| format | Format de réponse JSON |
| countryCode | Code du pays : MA |

Rôle :

Cette API recherche une ville et retourne ses coordonnées géographiques : latitude et longitude.

### 4.2 Forecast API

Endpoint :

https://api.open-meteo.com/v1/forecast

Paramètres :

| Paramètre | Description |
|---|---|
| latitude | Latitude de la ville |
| longitude | Longitude de la ville |
| current | Données météo actuelles |
| daily | Prévisions journalières |
| forecast_days | Nombre de jours : 7 |
| timezone | Fuseau horaire automatique |

Données actuelles demandées :

- temperature_2m
- relative_humidity_2m
- wind_speed_10m
- weather_code

Prévisions journalières demandées :

- temperature_2m_max
- temperature_2m_min
- weather_code

## 5. Fonctionnement technique

1. L'utilisateur saisit le nom d'une ville.
2. JavaScript envoie une requête à Geocoding API.
3. L'application vérifie la réponse HTTP.
4. L'application vérifie que la ville appartient au Maroc.
5. Les coordonnées sont récupérées.
6. Une deuxième requête est envoyée à Forecast API.
7. Les données JSON sont récupérées.
8. JavaScript crée les éléments HTML avec DOM.
9. Les informations météo sont affichées à l'utilisateur.

## 6. Exemple de réponse JSON résumé

```json
{
  "current": {
    "temperature_2m": 22,
    "relative_humidity_2m": 55,
    "wind_speed_10m": 12,
    "weather_code": 1
  },
  "daily": {
    "time": ["2026-11-11"],
    "temperature_2m_max": [25],
    "temperature_2m_min": [16],
    "weather_code": [2]
  }
}
```

Ces valeurs sont des exemples illustratifs.

### Correspondance des données

| Valeur JSON | Affichage |
|---|---|
| temperature_2m | Température : 22 °C |
| relative_humidity_2m | Humidité : 55 % |
| wind_speed_10m | Vent : 12 km/h |
| weather_code | Description et icône météo |
| time | Date de la prévision |
| temperature_2m_max | Température maximale |
| temperature_2m_min | Température minimale |

Le tableau WEATHER_CODES permet de transformer les codes météo en descriptions et icônes.

## 7. Gestion des erreurs

L'application vérifie les erreurs suivantes :

- Champ vide : Veuillez saisir une ville.
- Ville inconnue : Ville inconnue.
- Ville hors du Maroc : Veuillez entrer une ville au Maroc.
- Erreur réseau : API indisponible.
- Erreur HTTP 429 : Quota atteint.
- Données absentes : Données météo indisponibles.

La propriété response.ok est vérifiée après chaque requête Fetch.

## 8. Limites de l'API

- L'utilisation gratuite est soumise aux conditions d'Open-Meteo.
- Des limites de requêtes peuvent s'appliquer selon les conditions du service.
- Une erreur HTTP 429 indique que la limite de requêtes a été atteinte.
- Les données disponibles dépendent des paramètres demandés et de la disponibilité du service.
- Une connexion Internet est nécessaire.

### Respect des limites

- Les requêtes sont envoyées uniquement après une recherche.
- Les réponses HTTP sont vérifiées.
- Les erreurs sont gérées avec try/catch.
- Aucun appel API inutile n'est effectué automatiquement.

## 9. Installation

Cloner le dépôt :

```bash
git clone URL_DU_DEPOT
```

Accéder au dossier :

```bash
cd weather-app
```

Installer les dépendances :

```bash
npm install
```

Lancer le projet :

```bash
npm run dev
```

Créer la version de production :

```bash
npm run build
```

## 10. Tests

Les tests manuels sont disponibles dans :

tests/test-manuel.md

## 11. Captures d'écran

Les captures d'écran de l'application sont disponibles dans le dossier :

screenshots/

## 12. Sécurité

Open-Meteo ne nécessite pas de clé API pour les requêtes utilisées dans ce projet.

Aucune clé secrète n'est stockée dans le code source ou dans le dépôt GitHub.
