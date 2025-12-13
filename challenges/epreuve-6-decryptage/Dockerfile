# Dockerfile pour Épreuve 6 - Logs Décryptage
# Challenge PHP avec Apache

FROM php:8.2-apache

# Activer les modules Apache nécessaires
RUN a2enmod headers rewrite

# Créer le dossier pour les logs
RUN mkdir -p /var/www/html/logs && chmod 777 /var/www/html/logs

# Copier les fichiers du challenge
COPY index.html /var/www/html/
COPY css/ /var/www/html/css/
COPY js/ /var/www/html/js/
COPY api/ /var/www/html/api/
COPY logs/ /var/www/html/logs/

# Configuration Apache avec CORS et rewrite
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    Header set Access-Control-Allow-Origin "*"\n\
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"\n\
    Header set Access-Control-Allow-Headers "Content-Type"\n\
</Directory>' >> /etc/apache2/apache2.conf

# Activer .htaccess
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Apache
CMD ["apache2-foreground"]
