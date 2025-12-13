# Dockerfile pour Épreuve 9 - QR Code Game
# Challenge statique avec Nginx

FROM nginx:alpine

# Copier les fichiers du challenge
COPY *.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
