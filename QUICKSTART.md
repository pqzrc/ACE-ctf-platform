# Guide de Démarrage Rapide - ACE CTFd

Ce guide vous permet de démarrer rapidement la plateforme CTFd ACE en quelques minutes.

## 🚀 Installation Express (3 minutes)

### 1. Prérequis

- **Docker** et **Docker Compose** installés
- **ACE-Website** déjà démarré (requis pour la synchronisation)

### 2. Cloner et Configurer

```bash
# Cloner le projet
git clone <repository-url>
cd ACE-ctf-platform

# Copier la configuration
cp .env.example .env
```

### 3. Configurer les Variables Essentielles

Éditez le fichier `.env` :

```bash
# Base de données
MYSQL_ROOT_PASSWORD=changeme
MYSQL_PASSWORD=changeme

# CTFd (IMPORTANT : changer en production)
SECRET_KEY=your-super-secret-ctfd-key

# Synchronisation (URLs du site d'inscription)
FRONTEND_URL=http://localhost:3000
REGISTRATION_SITE_URL=http://backend:5000/api

# JWT (DOIT être identique à ACE-Website)
JWT_SECRET=same-as-website-jwt-secret
```

### 4. Démarrer CTFd

```bash
# Démarrer tous les services
make start

# Attendre 1 minute pour l'initialisation
# Vérifier que tout fonctionne
make health-check
```

### 5. Accéder à la Plateforme

- **CTFd** : http://localhost:8000
- **Traefik Dashboard** : http://localhost:8082
- **Challenges** : http://localhost:8081

## ✅ Vérification du Fonctionnement

### Test de Base

1. **Ouvrir** http://localhost:8000
2. **Vérifier** que CTFd s'affiche correctement
3. **Tester** l'authentification via le site d'inscription

### Vérifier la Synchronisation

```bash
# Compter les équipes synchronisées
make teams-count

# Compter les utilisateurs
make users-count

# Voir le classement
make scoreboard
```

### Configuration Automatique

CTFd est configuré automatiquement par le plugin `initial_setup` :
- **Mode équipe** activé
- **Plugins** chargés et configurés
- **Thème** personnalisé appliqué

## 🎮 Importer les Challenges

### 1. Créer un Token Admin

1. **Se connecter** à CTFd : http://localhost:8000
2. **Aller** dans Settings > Access Tokens
3. **Créer** un nouveau token avec permissions admin
4. **Copier** le token

### 2. Importer les Challenges

```bash
# Exporter le token
export CTFD_TOKEN='votre-token-ici'

# Lister les challenges disponibles
make list-challenges

# Importer tous les challenges
make import-challenges
```

### 3. Tester les Challenges

Accéder aux challenges via :
- http://localhost:8081 (développement)
- http://test1.challenges.vizyondijital.fr (production)

## 🔧 Commandes Utiles

```bash
# Gestion des services
make start              # Démarrer
make stop               # Arrêter
make restart            # Redémarrer
make restart-ctfd       # Redémarrer CTFd uniquement

# Logs et debug
make logs               # Logs CTFd
make logs-all           # Tous les logs
make health-check       # Vérifier la santé

# Base de données
make db-shell           # Accès MariaDB
make db-backup          # Sauvegarder
make scoreboard         # Voir le classement

# Site d'inscription
make website-status     # État du site web
make website-restart    # Redémarrer le site web
```

## 🚨 Résolution de Problèmes

### CTFd ne démarre pas

```bash
# Vérifier l'état des services
make status

# Voir les erreurs
make logs

# Redémarrage complet
make fresh
```

### Synchronisation échoue

1. **Vérifier** que ACE-Website est démarré :
   ```bash
   make website-status
   ```

2. **Vérifier** que `JWT_SECRET` est identique dans les deux projets

3. **Tester** la connectivité réseau :
   ```bash
   # Depuis le conteneur CTFd
   make shell
   curl http://backend:5000/health
   ```

### Challenges inaccessibles

```bash
# Vérifier Traefik
make logs-traefik

# Vérifier les conteneurs de challenges
make status | grep challenge
```

### Base de données corrompue

```bash
# Sauvegarder d'abord (si possible)
make db-backup

# Réinitialiser complètement
make db-reset

# Redémarrer CTFd
make restart-ctfd
```

## 🔄 Synchronisation avec ACE-Website

### Fonctionnement Automatique

La synchronisation se fait automatiquement :

1. **Équipes** créées sur le site web → Apparaissent dans CTFd
2. **Utilisateurs** inscrits → Comptes CTFd créés
3. **Scores** CTFd → Synchronisés vers le site web
4. **Salles** assignées → Affichées dans CTFd

### Forcer une Synchronisation

```bash
# Synchronisation manuelle
make sync-manual

# Vérifier les résultats
make teams-count
make users-count
```

## 📊 Monitoring

### Statistiques Rapides

```bash
# Classement actuel
make scoreboard

# Nombre d'équipes et utilisateurs
make teams-count && make users-count

# État général du système
make health-check
```

### Logs en Temps Réel

```bash
# Logs CTFd
make logs

# Tous les logs
make logs-all

# Logs spécifiques
make logs-db        # Base de données
make logs-traefik   # Traefik/Challenges
```

## 🔗 Intégration Réseau

CTFd utilise le réseau Docker `ace-network` créé par ACE-Website pour communiquer avec le backend d'inscription.

**Important** : ACE-Website doit être démarré en premier pour créer le réseau partagé.

## 📞 Support

En cas de problème :

1. **Vérifier** les logs : `make logs-all`
2. **Tester** la connectivité : `make health-check`
3. **Vérifier** la synchronisation : `make teams-count`

---

**Auteur** : Rénald DESIRE  
**Projet** : ACE 2025 - Vizyon Dijital