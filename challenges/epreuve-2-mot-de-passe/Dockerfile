# Dockerfile pour Épreuve 2 - CyberGame
# Challenge PHP avec Apache

FROM php:8.2-apache

# Activer les modules Apache nécessaires
RUN a2enmod rewrite headers

# Activer l'extension mbstring pour le support UTF-8
RUN apt-get update && apt-get install -y libonig-dev \
    && docker-php-ext-install mbstring \
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers du challenge
COPY index.html /var/www/html/
COPY css/ /var/www/html/css/
COPY js/ /var/www/html/js/
COPY api/ /var/www/html/api/

# Configurer les permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Configuration Apache pour CORS
RUN echo '<Directory /var/www/html>\n\
    Header set Access-Control-Allow-Origin "*"\n\
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"\n\
    Header set Access-Control-Allow-Headers "Content-Type"\n\
</Directory>' > /etc/apache2/conf-available/cors.conf \
    && a2enconf cors

# Exposer le port 80
EXPOSE 80

# Démarrer Apache
CMD ["apache2-foreground"]

