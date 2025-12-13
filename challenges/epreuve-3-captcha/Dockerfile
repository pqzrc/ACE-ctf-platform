# Dockerfile pour Épreuve 3 - Captcha Game
# Challenge PHP avec Apache

FROM php:8.2-apache

# Activer les modules Apache nécessaires
RUN a2enmod rewrite headers

# Copier les fichiers du challenge
COPY index.html /var/www/html/
COPY script.js /var/www/html/
COPY style.css /var/www/html/
COPY api.php /var/www/html/
COPY images/ /var/www/html/images/

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

