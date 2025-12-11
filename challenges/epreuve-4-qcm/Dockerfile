# Dockerfile pour Épreuve 4 - QCM Université
# Challenge PHP avec Apache

FROM php:8.2-apache

# Activer les headers CORS
RUN a2enmod headers

# Copier les fichiers du challenge
COPY index.html /var/www/html/
COPY style.css /var/www/html/
COPY script.js /var/www/html/
COPY validate.php /var/www/html/

# Configuration Apache avec CORS
RUN echo '<Directory /var/www/html>\n\
    Header set Access-Control-Allow-Origin "*"\n\
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"\n\
    Header set Access-Control-Allow-Headers "Content-Type"\n\
</Directory>' >> /etc/apache2/apache2.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Apache
CMD ["apache2-foreground"]
