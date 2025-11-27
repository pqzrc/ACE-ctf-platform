# Structure du Projet ACE CTFd

Ce document décrit l'organisation et l'architecture de la plateforme CTFd personnalisée pour ACE 2025.

## 📁 Structure des Dossiers

```
ACE-ctf-platform/
├── plugins/              # Plugins CTFd personnalisés
│   ├── registration_sync/    # Synchronisation des équipes
│   ├── score_sync/          # Synchronisation des scores
│   ├── auth_sync/           # Authentification unifiée
│   ├── room_display/        # Affichage des salles
│   ├── disable_team_editing/ # Désactivation édition équipes
│   ├── disable_direct_auth/ # Désactivation auth directe
│   ├── homepage_redirect/   # Redirection page d'accueil
│   ├── team_requirement_message/ # Messages personnalisés
│   ├── disable_user_settings/ # Désactivation paramètres
│   ├── empty_challenges_message/ # Message challenges vides
│   ├── scoreboard_lock/     # Verrouillage scoreboard
│   └── initial_setup/       # Configuration automatique
├── challenges/           # Challenges de test
│   ├── test1-static/        # Challenge HTML statique
│   ├── test2-source/        # Challenge avec code source
│   ├── test3-file/          # Challenge avec fichier
│   ├── test4-form/          # Challenge avec formulaire
│   └── test5-calc/          # Challenge de calcul
├── scripts/              # Scripts utilitaires
│   ├── import_challenges.py # Import automatique des challenges
│   └── test_sync.py        # Test de synchronisation
├── deployment/           # Configuration de déploiement
│   ├── apache/             # Configuration Apache
│   ├── deploy.sh           # Script de déploiement
│   └── DEPLOY.md           # Guide de déploiement
├── docker-compose.yml    # Configuration Docker production
├── Dockerfile           # Image CTFd personnalisée
├── Makefile            # Commandes de gestion
├── .env.example        # Variables d'environnement exemple
└── README.md           # Documentation principale
```

## 🔌 Architecture des Plugins

### Plugins de Synchronisation

#### registration_sync
- **Rôle** : Synchronise les équipes depuis le site d'inscription
- **Fonctionnement** : 
  - Écoute les webhooks du site web
  - Crée/met à jour les équipes CTFd
  - Gère les membres et capitaines
- **Configuration** : URL du site d'inscription

#### score_sync
- **Rôle** : Synchronise les scores vers le site web
- **Fonctionnement** :
  - Intercepte les changements de score
  - Envoie les mises à jour via API
  - Maintient la cohérence des classements
- **Déclencheurs** : Soumission de flag, modification manuelle

#### auth_sync
- **Rôle** : Authentification unifiée avec le site web
- **Fonctionnement** :
  - Valide les tokens JWT du site web
  - Crée les sessions CTFd automatiquement
  - Synchronise les informations utilisateur

### Plugins d'Interface

#### room_display
- **Rôle** : Affiche les salles assignées aux équipes
- **Fonctionnement** :
  - Récupère les assignations de salle
  - Affiche dans l'interface CTFd
  - Met à jour en temps réel

#### disable_team_editing
- **Rôle** : Empêche la modification des équipes dans CTFd
- **Fonctionnement** :
  - Désactive les formulaires d'édition
  - Redirige vers le site d'inscription
  - Affiche des messages informatifs

#### homepage_redirect
- **Rôle** : Redirige la page d'accueil
- **Fonctionnement** :
  - Redirige vers le site d'inscription
  - Ou vers le scoreboard selon le contexte
  - Gère les utilisateurs connectés

### Plugins de Configuration

#### initial_setup
- **Rôle** : Configuration automatique de CTFd
- **Fonctionnement** :
  - Configure le mode équipe
  - Active les plugins nécessaires
  - Définit les paramètres de base
- **Exécution** : Au premier démarrage

#### disable_direct_auth
- **Rôle** : Force l'authentification via le site web
- **Fonctionnement** :
  - Désactive les formulaires de connexion/inscription
  - Redirige vers le site d'inscription
  - Maintient les sessions existantes

## 🎮 Architecture des Challenges

### Structure Type d'un Challenge

```
challenges/test1-static/
├── challenge.yml         # Métadonnées du challenge
└── deploy/
    ├── Dockerfile       # Image Docker du challenge
    ├── index.html       # Contenu principal
    └── [autres fichiers]
```

### Métadonnées (challenge.yml)

```yaml
name: "Test Challenge 1"
category: "Web"
description: "Challenge de test statique"
value: 100
flags:
  - "ACE{test_flag_1}"
tags:
  - "beginner"
  - "html"
```

### Types de Challenges

1. **Statique** (test1) : Page HTML simple
2. **Source** (test2) : Code source à analyser
3. **Fichier** (test3) : Fichier à télécharger
4. **Formulaire** (test4) : Application web interactive
5. **Calcul** (test5) : Challenge algorithmique

## 🌐 Architecture Réseau

### Réseaux Docker

```yaml
networks:
  ctfd-internal:        # Base de données et cache (isolé)
  ctfd-challenges:      # Challenges et Traefik
  ace-network:          # Communication avec ACE-Website (externe)
```

### Communication Inter-Services

```
ACE-Website (backend:5000)
    ↕ (ace-network)
CTFd (ctfd:8000)
    ↕ (ctfd-internal)
MariaDB (db:3306) + Redis (cache:6379)
    ↕ (ctfd-challenges)
Traefik (traefik:80) ← Challenges
```

### Routage des Challenges

Traefik route les challenges selon les domaines :
- `test1.challenges.vizyondijital.fr` → challenge_test1
- `test2.challenges.vizyondijital.fr` → challenge_test2
- etc.

## 🔄 Flux de Synchronisation

### 1. Création d'Équipe

```
Site Web → Webhook → registration_sync → CTFd Database
                                      ↓
                                   Équipe créée
```

### 2. Soumission de Flag

```
CTFd → score_sync → API Site Web → Base de données Site Web
                                ↓
                           Score mis à jour
```

### 3. Authentification

```
Site Web → JWT Token → auth_sync → Session CTFd
                                ↓
                           Utilisateur connecté
```

## 📊 Base de Données

### Tables CTFd Principales

- **teams** : Équipes synchronisées
- **users** : Utilisateurs synchronisés
- **challenges** : Challenges importés
- **submissions** : Soumissions de flags
- **solves** : Solutions validées

### Données Synchronisées

- **Équipes** : Nom, membres, capitaine, salle
- **Utilisateurs** : Email, nom, rôle
- **Scores** : Points, classement, temps de résolution

## 🚀 Déploiement

### Environnements

1. **Développement** : Docker local avec hot-reload
2. **Production** : Docker avec Apache reverse proxy

### Configuration par Environnement

- **Développement** : `.env` avec URLs localhost
- **Production** : `.env` avec domaines réels

### Volumes Persistants

- `ctfd_db` : Base de données MariaDB
- `ctfd_redis` : Cache Redis
- `ctfd_uploads` : Fichiers uploadés
- `ctfd_logs` : Logs CTFd

## 🔧 Personnalisation

### Ajouter un Plugin

1. **Créer** le dossier `plugins/mon_plugin/`
2. **Implémenter** `__init__.py` avec la classe plugin
3. **Ajouter** au volume dans `docker-compose.yml`
4. **Redémarrer** CTFd

### Ajouter un Challenge

1. **Créer** le dossier `challenges/mon_challenge/`
2. **Créer** `challenge.yml` et `deploy/Dockerfile`
3. **Ajouter** le service dans `docker-compose.yml`
4. **Configurer** les labels Traefik
5. **Importer** via le script Python

### Modifier l'Interface

Les plugins peuvent :
- Ajouter des routes Flask
- Modifier les templates Jinja2
- Injecter du CSS/JavaScript
- Créer des pages personnalisées

## 📝 Bonnes Pratiques

### Développement de Plugins

1. **Hériter** de `CTFdPlugin`
2. **Utiliser** les hooks CTFd appropriés
3. **Gérer** les erreurs proprement
4. **Logger** les actions importantes
5. **Tester** avec différents scénarios

### Sécurité

1. **Valider** toutes les entrées
2. **Utiliser** les permissions CTFd
3. **Chiffrer** les communications sensibles
4. **Auditer** les logs régulièrement

### Performance

1. **Optimiser** les requêtes base de données
2. **Utiliser** le cache Redis
3. **Limiter** les appels API externes
4. **Monitorer** les ressources

---

**Auteur** : Rénald DESIRE  
**Projet** : ACE 2025 - Vizyon Dijital