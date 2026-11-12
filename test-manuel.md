
# Journal de tests manuels — Météo Maroc

**Projet :** Application Météo Maroc  
**Date :** 11/11/2026

| ID | Test | Action | Résultat attendu | Résultat obtenu | Statut |
|---|---|---|---|---|---|
| T01 | Ville valide | Rechercher Nador | Afficher la météo | Météo affichée | Réussi |
| T02 | Autre ville marocaine | Rechercher Casablanca | Afficher la météo | À compléter | En attente |
| T03 | Ville inconnue | Saisir une ville inexistante | Afficher un message d'erreur | Message affiché | Réussi |
| T04 | Ville étrangère | Saisir Paris | Refuser la ville | À compléter | En attente |
| T05 | Champ vide | Cliquer sur Rechercher sans saisir de ville | Afficher le message de saisie | Message affiché | Réussi |
| T06 | Prévisions | Rechercher une ville valide | Afficher 7 jours | À compléter | En attente |
| T07 | API indisponible | Simuler une erreur réseau | Afficher API indisponible | À tester | En attente |
| T08 | Quota atteint | Simuler HTTP 429 | Afficher Quota atteint | À tester | En attente |
| T09 | Réessayer | Cliquer sur Réessayer après une erreur | Relancer la dernière recherche | À tester | En attente |
| T10 | Chargement | Lancer une recherche | Afficher Chargement | À compléter | En attente |

## Conclusion

Les tests permettent de vérifier la recherche des villes marocaines, l'affichage des données météo, les prévisions et la gestion des erreurs.
