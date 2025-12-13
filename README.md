# ACE 2025 - Plateforme CTFd

Plateforme CTFd personnalisée pour l'événement ACE (Antilles Cyber Escape) 2025 avec synchronisation automatique des équipes et challenges intégrés.

## 🎯 Fonctionnalités

- **CTFd 3.8.1** avec plugins personnalisés
- **Synchronisation automatique** avec le site d'inscription
- **5 challenges de test** pré-configurés
- **Gestion des salles** et affichage en temps réel
- **Traefik** pour le routage des challenges
- **Scoring automatique** synchronisé avec le site web

## 🚀 Démarrage Rapide

### Prérequis

- Docker et Docker Compose
- Site d'inscription ACE démarré (ACE-Website)

### Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd ACE-ctf-platform
   ```

2. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos paramètres
   ```

3. **Démarrer CTFd**
   ```bash
   make start
   ```

4. **Accéder à la plateforme**
   - CTFd : http://localhost:8000
   - Traefik Dashboard : http://localhost:8082
   - Challenges : http://localhost:8081

## 📋 Commandes Principales

```bash
make help              # Afficher toutes les commandes
make start             # Démarrer tous les services
make stop              # Arrêter tous les services
make logs              # Voir les logs CTFd
make status            # État des services
make health-check      # Vérifier la santé du système
```

## 🏗️ Architecture

```
ACE-ctf-platform/
├── plugins/           # Plugins CTFd personnalisés
├── challenges/        # 5 challenges de test
├── scripts/          # Scripts d'import et utilitaires
└── deployment/       # Configuration de déploiement
```

## 🔌 Plugins Personnalisés

### Plugins Principaux

- **registration_sync** : Synchronisation des équipes avec le site web
- **score_sync** : Synchronisation des scores en temps réel
- **auth_sync** : Authentification unifiée
- **room_display** : Affichage des salles assignées

### Plugins d'Interface

- **disable_team_editing** : Empêche la modification des équipes
- **disable_direct_auth** : Force l'authentification via le site web
- **homepage_redirect** : Redirection automatique
- **team_requirement_message** : Messages personnalisés

## 🎮 Challenges Intégrés

6 épreuves du Cyber Escape ACE 2025 :

| N° | Épreuve | Catégorie | Points |
|----|---------|-----------|--------|
| 1 | Identifier le Phishing | Sensibilisation | 100 |
| 2 | Mot de Passe Sécurisé | Sécurité | 150 |
| 3 | Captcha Echappatoire | Authentification | 125 |
| 6 | Décryptage des Logs | Cryptographie | 175 |
| 8 | Light Out | Logique | 150 |
| 9 | Récupération du Dispositif | Terrain | 200 |

### Accès aux Challenges

**Développement local :**
```bash
make challenges-start
```
- Épreuve 1 : http://epreuve1.localhost:8081
- Épreuve 2 : http://epreuve2.localhost:8081
- Épreuve 3 : http://epreuve3.localhost:8081
- Épreuve 6 : http://epreuve6.localhost:8081
- Épreuve 8 : http://epreuve8.localhost:8081
- Épreuve 9 : http://epreuve9.localhost:8081

**Production :** https://epreuve1.challenges.vizyondijital.fr (etc.)

## 🔧 Configuration

### Variables d'environnement (.env)

```bash
# Base de données
MYSQL_ROOT_PASSWORD=changeme
MYSQL_PASSWORD=changeme

# CTFd
SECRET_KEY=your-ctfd-secret-key

# Synchronisation
FRONTEND_URL=http://localhost:3000
REGISTRATION_SITE_URL=http://backend:5000/api

# JWT (doit correspondre au site web)
JWT_SECRET=same-as-website-jwt-secret
```

## 🔄 Synchronisation avec le Site Web

### Configuration Automatique

La synchronisation se fait automatiquement via les plugins :

1. **Équipes** : Créées automatiquement depuis le site d'inscription
2. **Utilisateurs** : Synchronisés avec leurs rôles
3. **Scores** : Mis à jour en temps réel
4. **Salles** : Affichées dans l'interface CTFd

### Synchronisation Manuelle

```bash
# Forcer une synchronisation
make sync-manual

# Vérifier les équipes synchronisées
make teams-count
make users-count
```

## 📊 Gestion des Données

### Base de Données

```bash
make db-shell          # Accès MariaDB
make db-backup         # Sauvegarder
make db-restore FILE=backup.sql  # Restaurer
make db-reset          # Réinitialiser (⚠️ perte de données)
```

### Statistiques

```bash
make scoreboard        # Classement actuel
make teams-count       # Nombre d'équipes
make users-count       # Nombre d'utilisateurs
```

## 🎯 Import des Challenges

### Prérequis

1. **Se connecter** à CTFd en tant qu'admin
2. **Créer un token** dans Settings > Access Tokens
3. **Exporter le token** : `export CTFD_TOKEN='votre-token'`

### Import

```bash
# Lister les challenges disponibles
make list-challenges

# Importer tous les challenges
make import-challenges
```

## 🚀 Déploiement

### Production

1. **Configurer** l'environnement de production dans `.env`
2. **Démarrer** les services :
   ```bash
   make start
   ```
3. **Vérifier** la santé :
   ```bash
   make health-check
   ```

### Mise à jour

```bash
make deploy           # Pull + rebuild
# ou
make pull            # Pull des changements Git
make rebuild         # Reconstruction CTFd
```

## 🔗 Intégration Réseau

### Réseau Partagé avec ACE-Website

CTFd utilise le réseau `ace-network` pour communiquer avec le site d'inscription :

```yaml
networks:
  ace-network:
    name: ace-website_ace-network
    external: true
```

### Ports Utilisés

- **8000** : Interface CTFd
- **8081** : Challenges (via Traefik)
- **8082** : Traefik Dashboard

## 🛠️ Développement

### Structure des Plugins

```
plugins/
├── registration_sync/    # Sync équipes
├── score_sync/          # Sync scores
├── auth_sync/           # Auth unifiée
└── room_display/        # Affichage salles
```

### Logs et Debug

```bash
make logs              # Logs CTFd
make logs-db           # Logs base de données
make logs-traefik      # Logs Traefik
make logs-all          # Tous les logs
```

## 📝 Troubleshooting

### Problèmes Courants

**CTFd ne démarre pas**
```bash
make status           # Vérifier l'état
make logs            # Voir les erreurs
make fresh           # Redémarrage complet
```

**Synchronisation échoue**
```bash
# Vérifier la configuration réseau
make website-status   # État du site web
# Vérifier JWT_SECRET identique dans les deux projets
```

**Challenges inaccessibles**
```bash
make logs-traefik     # Vérifier Traefik
# Vérifier la configuration DNS/hosts
```

## 📄 Licence

Projet développé pour Vizyon Dijital - ACE 2025

## 👨‍💻 Auteur

**Rénald DESIRE** - Développeur principal

---

Pour plus d'informations, consultez le [Guide de Démarrage Rapide](QUICKSTART.md) ou la [Structure du Projet](STRUCTURE.md).