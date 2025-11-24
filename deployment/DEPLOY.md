# Comment Déployer ACE CTF Platform sur VPS

Guide simple pour déployer ACE CTF Platform en production sur un serveur Ubuntu avec Apache.

## Prérequis

- ACE-Website **déjà déployé** (important !)
- Un VPS Ubuntu 20.04+
- Les domaines `ctfd.vizyondijital.fr` et `challenges.vizyondijital.fr` pointent vers votre IP VPS

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

### 4. Lancer le déploiement automatique

```bash
cd deployment
sudo ./deploy.sh
```

Le script va :
- Configurer Apache
- Installer les certificats SSL (incluant wildcard pour `*.challenges.vizyondijital.fr`)
- Démarrer les services Docker

**Note** : Pour le certificat wildcard, vous devrez suivre les instructions DNS de Certbot.

### 5. Vérifier que tout fonctionne

```bash
# Tester CTFd
curl https://ctfd.vizyondijital.fr

# Tester un challenge
curl https://test1.challenges.vizyondijital.fr
```

Ouvrez votre navigateur sur `https://ctfd.vizyondijital.fr` - vous devriez voir CTFd.

## Tester le SSO

1. Allez sur `https://ace.vizyondijital.fr`
2. Créez un compte et une équipe
3. Cliquez sur "Accéder aux challenges"
4. Vous devriez être automatiquement connecté sur CTFd

