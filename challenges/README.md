# Challenges ACE 2025 - Épreuves du Cyber Escape

Ce dossier contient toutes les épreuves du challenge ACE 2025.

## 📋 Liste des Épreuves

| N° | Nom | Catégorie | Points | Technologie | Flag |
|----|-----|-----------|--------|-------------|------|
| 1 | Identifier le Phishing | Sensibilisation | 100 | PHP/Apache | Identifier email `m4` |
| 2 | Mot de Passe Sécurisé | Sécurité | 150 | PHP/Apache | `FLAG-LUMEN-02` |
| 3 | Captcha Echappatoire | Authentification | 125 | PHP/Apache | Validation serveur |
| 6 | Décryptage des Logs | Cryptographie | 175 | Node.js | `FLAG-LOGS-DECRYPT-6` |
| 8 | Light Out | Logique | 150 | Nginx (statique) | `FLAG-LIGHT-OUT-08` |
| 9 | Récupération du Dispositif | Terrain | 200 | Nginx (statique) | QR Codes physiques |

## 🚀 Démarrage Rapide

### Prérequis

- Docker et Docker Compose installés
- Entrées `/etc/hosts` configurées (voir ci-dessous)

### 1. Configurer les hosts locaux

Ajoutez ces lignes à votre fichier `/etc/hosts` :

```bash
127.0.0.1 hamecon-phishing.localhost
127.0.0.1 verrouillage-mdp.localhost
127.0.0.1 verification-humaine.localhost
127.0.0.1 logs-cryptes.localhost
127.0.0.1 localisation-qr.localhost
```

### 2. Démarrer les challenges

```bash
# Depuis le dossier ACE-ctf-platform
make challenges-start
```

### 3. Accéder aux épreuves

| Épreuve | URL Locale | URL Production |
|---------|------------|----------------|
| Épreuve 1 | http://hamecon-phishing.localhost:8081 | https://epreuve1.challenges.vizyondijital.fr |
| Épreuve 2 | http://verrouillage-mdp.localhost:8081 | https://epreuve2.challenges.vizyondijital.fr |
| Épreuve 3 | http://verification-humaine.localhost:8081 | https://epreuve3.challenges.vizyondijital.fr |
| Épreuve 6 | http://logs-cryptes.localhost:8081 | https://epreuve6.challenges.vizyondijital.fr |
| Épreuve 8 | http://dsin-dashboard.localhost:8081 | https://epreuve8.challenges.vizyondijital.fr |
| Épreuve 9 | http://localisation-qr.localhost:8081 | https://epreuve9.challenges.vizyondijital.fr |

## 🛠️ Commandes Utiles

```bash
make challenges-start    # Démarrer tous les challenges
make challenges-stop     # Arrêter tous les challenges
make challenges-restart  # Redémarrer les challenges
make challenges-rebuild  # Reconstruire et redémarrer
make challenges-logs     # Voir les logs
make challenges-status   # État des conteneurs
```

## 📁 Structure des Dossiers

```
challenges/
├── epreuve-1-phishing/              # Épreuve 1 - Identifier le phishing
│   ├── Hameçon/                     # Fichiers de l'application
│   ├── challenge.yml
│   └── Dockerfile
│
├── epreuve-2-mot-de-passe/          # Épreuve 2 - Mot de passe sécurisé
│   ├── index.html
│   ├── api/get-flag.php
│   ├── challenge.yml
│   └── Dockerfile
│
├── epreuve-3-captcha/               # Épreuve 3 - CAPTCHA
│   ├── index.html
│   ├── api.php
│   ├── images/
│   ├── challenge.yml
│   └── Dockerfile
│
├── epreuve-6-decryptage/            # Épreuve 6 - Décryptage logs
│   ├── index.html
│   ├── server.js
│   ├── challenge.yml
│   └── Dockerfile
│
├── epreuve-8-light-out/             # Épreuve 8 - Light Out
│   ├── lightsout_2/
│   ├── challenge.yml
│   └── Dockerfile
│
└── epreuve-9-recuperation-dispositif/  # Épreuve 9 - QR Code / Terrain
    ├── qr-code_*.html
    ├── images/
    ├── challenge.yml
    └── Dockerfile
```

## 🎯 Détails des Épreuves

### Épreuve 1 - Identifier le Phishing

**Objectif :** Identifier l'email de phishing parmi une boîte mail professionnelle.

**Technologie :** HTML/CSS/JS + PHP

**Solution :** L'email `m4` (de `mickaelcollegue@mickaelcollegue.mtq`) est le phishing car :
- Domaine email suspect
- Demande d'identifiants
- Pièce jointe `.exe`
- Lien vers un domaine non officiel

---

### Épreuve 2 - Reprise du Compte Compromis

**Objectif :** Créer un mot de passe ultra-sécurisé respectant toutes les règles.

**Technologie :** HTML/CSS/JS + PHP

**Règles du mot de passe :**
- Minimum 16 caractères
- 1+ majuscule, 1+ minuscule
- 2+ chiffres
- 2+ caractères spéciaux
- 1+ caractère Unicode (é, à, ß, Ω...)
- Pas de répétition > 2 fois
- Pas de suites (abc, 123, azerty)

**Flag :** `FLAG-LUMEN-02`

---

### Épreuve 3 - Captcha Echappatoire

**Objectif :** Se connecter et résoudre un CAPTCHA visuel.

**Technologie :** HTML/CSS/JS + PHP

**Solution :** Sélectionner les images correspondant au thème demandé.

---

### Épreuve 6 - Décryptage des Logs

**Objectif :** Décrypter les logs chiffrés pour trouver le flag.

**Technologie :** Node.js + Express

**Solution :** Les logs sont chiffrés en ROT13. Le flag se trouve dans le log n°3.

**Flag :** `FLAG-LOGS-DECRYPT-6`

---

### Épreuve 9 - Traçage du Signal

**Objectif :** Suivre les indices sur les plans et scanner les QR Codes physiques.

**Technologie :** HTML statique + Nginx

**Solution :** Suivre le parcours en 3 étapes avec les QR Codes physiques.

## 🔧 Développement

### Ajouter une nouvelle épreuve

1. Créer un dossier dans `challenges/`
2. Ajouter un fichier `challenge.yml` avec la configuration
3. Ajouter un `Dockerfile`
4. Mettre à jour `docker-compose.challenges.yml`

### Format du fichier challenge.yml

```yaml
name: "Nom de l'épreuve"
category: "Catégorie"
description: |
  Description détaillée...
value: 100
type: standard
state: visible
connection_info: "http://epreuveX.challenges.vizyondijital.fr"
flags:
  - "FLAG-XXXX-XX"
hints:
  - content: "Premier indice"
    cost: 25
tags:
  - "tag1"
  - "tag2"
```

## 📝 Import dans CTFd

```bash
# 1. Obtenir un token admin CTFd
# 2. Exporter le token
export CTFD_TOKEN='votre-token'

# 3. Importer les challenges
make import-challenges
```

## 🐛 Dépannage

### Les challenges ne démarrent pas

```bash
# Vérifier l'état
make challenges-status

# Voir les logs
make challenges-logs

# Reconstruire
make challenges-rebuild
```

### Erreur de connexion aux épreuves

1. Vérifier que les hosts sont configurés dans `/etc/hosts`
2. Vérifier que le port 8081 est disponible
3. Vérifier les logs Traefik : `docker compose -f docker-compose.challenges.yml logs traefik`

---

**Auteur :** Rénald DESIRE  
**Projet :** ACE 2025 - Vizyon Dijital

