# Dockerfile pour Épreuve 6 - Logs Décryptage
# Challenge Node.js avec Express

FROM node:20-alpine

# Créer le répertoire de travail
WORKDIR /app

# Installer les dépendances
RUN npm init -y && npm install express

# Copier les fichiers du challenge
COPY index.html .
COPY style.css .
COPY server.js .

# Exposer le port
EXPOSE 3000

# Variable d'environnement pour le port
ENV PORT=3000

# Démarrer le serveur Node.js
CMD ["node", "server.js"]

