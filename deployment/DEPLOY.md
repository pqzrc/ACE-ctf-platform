# Comment Déployer ACE CTF Platform sur VPS

Guide simple pour déployer ACE CTF Platform en production sur un serveur Ubuntu avec Apache.

## Prérequis

- ACE-Website **déjà déployé** (important !)
- Un VPS Ubuntu 20.04+
- Les domaines `ctfd.vizyondijital.fr` et `challenges.vizyondijital.fr` pointent vers votre IP VPS
- Docker et Docker Compose installés

## Étapes de Déploiement

### 1. Vérifier qu'ACE-Website tourne

```bash
# Vérifier que le réseau Docker existe
docker network ls | grep ace-website_ace-network

# Si absent, déployez ACE-Website d'abord !
```

### 2. Cloner le projet

```bash
git clone <votre-repo-github> /opt/ace-ctf-platform
cd /opt/ace-ctf-platform
```

### 3. Configurer les secrets

```bash
# Copier le template
cp .env.production .env

# Éditer le fichier
nano .env
```

**CRITIQUE** : Le `JWT_SECRET` et `WEBHOOK_SECRET` doivent être **EXACTEMENT les mêmes** que dans ACE-Website !

Récupérez-les depuis `/opt/ace-website/.env` :

```bash
grep JWT_SECRET /opt/ace-website/.env
grep WEBHOOK_SECRET /opt/ace-website/.env
```

Copiez ces valeurs dans `/opt/ace-ctf-platform/.env`.

### 4. Démarrer CTFd

```bash
make start
```

### 5. Démarrer les Challenges (Épreuves)

```bash
# Construire et démarrer tous les challenges
make challenges-start
```

Les challenges seront accessibles via Traefik sur le port 8081.

### 6. Configurer Apache (Reverse Proxy)

```bash
# Copier les configurations Apache
sudo cp deployment/apache/ctfd.vizyondijital.fr.conf /etc/apache2/sites-available/
sudo cp deployment/apache/challenges.vizyondijital.fr.conf /etc/apache2/sites-available/

# Activer les modules nécessaires
sudo a2enmod proxy proxy_http ssl headers rewrite

# Activer les sites
sudo a2ensite ctfd.vizyondijital.fr.conf
sudo a2ensite challenges.vizyondijital.fr.conf

# Obtenir les certificats SSL
sudo certbot certonly --apache -d ctfd.vizyondijital.fr
sudo certbot certonly --apache -d challenges.vizyondijital.fr \
    -d epreuve1.challenges.vizyondijital.fr \
    -d epreuve2.challenges.vizyondijital.fr \
    -d epreuve3.challenges.vizyondijital.fr \
    -d epreuve6.challenges.vizyondijital.fr \
    -d epreuve9.challenges.vizyondijital.fr

# Redémarrer Apache
sudo systemctl restart apache2
```

### 7. Vérifier que tout fonctionne

```bash
# Tester CTFd
curl https://ctfd.vizyondijital.fr/healthcheck

# Tester les challenges
curl https://epreuve1.challenges.vizyondijital.fr
curl https://epreuve2.challenges.vizyondijital.fr
curl https://epreuve3.challenges.vizyondijital.fr
curl https://epreuve6.challenges.vizyondijital.fr
curl https://epreuve9.challenges.vizyondijital.fr
```

## Importer les Challenges dans CTFd

### 1. Créer un Token Admin

1. Connectez-vous à CTFd : https://ctfd.vizyondijital.fr
2. Allez dans **Settings > Access Tokens**
3. Créez un nouveau token avec les permissions admin
4. Copiez le token

### 2. Importer les Challenges

```bash
export CTFD_TOKEN='votre-token-ici'
export CTFD_URL='https://ctfd.vizyondijital.fr'

make import-challenges
```

## Liste des Challenges (Épreuves)

| N° | Nom | URL Production | Points |
|----|-----|----------------|--------|
| 1 | Identifier le Phishing | https://epreuve1.challenges.vizyondijital.fr | 100 |
| 2 | Reprise du Compte | https://epreuve2.challenges.vizyondijital.fr | 150 |
| 3 | Captcha Echappatoire | https://epreuve3.challenges.vizyondijital.fr | 125 |
| 6 | Décryptage des Logs | https://epreuve6.challenges.vizyondijital.fr | 175 |
| 9 | Traçage du Signal | https://epreuve9.challenges.vizyondijital.fr | 200 |

## Commandes de Gestion

```bash
# CTFd
make start           # Démarrer CTFd
make stop            # Arrêter CTFd
make logs            # Logs CTFd
make health-check    # Vérifier la santé

# Challenges
make challenges-start    # Démarrer les épreuves
make challenges-stop     # Arrêter les épreuves
make challenges-logs     # Logs des épreuves
make challenges-rebuild  # Reconstruire les épreuves

# Base de données
make db-backup       # Sauvegarder la BDD
make scoreboard      # Voir le classement
```

## Tester le SSO

1. Allez sur `https://ace.vizyondijital.fr`
2. Créez un compte et une équipe
3. Cliquez sur "Accéder aux challenges"
4. Vous devriez être automatiquement connecté sur CTFd

## Dépannage

### Les challenges ne répondent pas

```bash
# Vérifier l'état
make challenges-status

# Voir les logs
make challenges-logs

# Reconstruire
make challenges-rebuild
```

### CTFd ne démarre pas

```bash
# Vérifier l'état
make status

# Voir les logs
make logs

# Redémarrer proprement
make fresh
```

### Synchronisation échoue

1. Vérifier que ACE-Website est démarré
2. Vérifier que `JWT_SECRET` est identique dans les deux projets
3. Tester la connectivité : `curl http://backend:5000/health` depuis le conteneur CTFd

---

**Auteur :** Rénald DESIRE  
**Projet :** ACE 2025 - Vizyon Dijital
