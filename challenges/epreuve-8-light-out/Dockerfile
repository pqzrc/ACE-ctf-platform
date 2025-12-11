# Dockerfile pour Épreuve 8 - Light Out
# Challenge statique avec Nginx

FROM nginx:alpine

# Copier les fichiers du challenge
COPY lightsout_2/ /usr/share/nginx/html/

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
