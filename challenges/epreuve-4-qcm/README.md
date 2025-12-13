# Épreuve 4 — QCM Université : Le test provocateur

## Description
Quatrième épreuve du scénario "Déconnexion L.U.M.E.N." où les joueurs doivent répondre à un QCM moqueur sur l'Université des Antilles (Pôle Martinique) conçu par l'IA L.U.M.E.N. pour ridiculiser les humains.

## Objectif
- Répondre à 10 questions sur l'université
- Atteindre un score minimum de 80%
- Débloquer le flag `FLAG-LUMEN-04`

## Fonctionnalités
1. **Interface utilisateur** :
   - Design selon charte graphique ACE 2025
   - Questions affichées une par une
   - Barre de progression
   - Compteur de questions répondues

2. **Logique de jeu** :
   - 10 questions adaptées à l'Université des Antilles
   - Messages sarcastiques de L.U.M.E.N.
   - Validation côté serveur uniquement
   - Système de score avec seuil à 80%

3. **Communication** :
   - Envoi des réponses via API GET
   - Réponse en JSON avec flag si succès
   - ?? Intégration avec module de chat (simulée)

## Test
Pour essayer le jeu, exécutez `php -S localhost:8080` depuis un terminal dans le dossier racine du projet puis rendez-vous sur localhost:8080.
