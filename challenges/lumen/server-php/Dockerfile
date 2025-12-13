# Dockerfile pour le serveur LUMEN (PHP)

FROM php:8.2-apache

# Activer mod_rewrite et headers pour le routage et CORS
RUN a2enmod rewrite headers

# Copier la configuration Apache
COPY apache.conf /etc/apache2/conf-available/lumen.conf
RUN a2enconf lumen

# Copier les fichiers PHP
COPY . /var/www/html/

# Créer le répertoire de sessions
RUN mkdir -p /var/www/html/sessions

# Fixer les permissions pour Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod 644 /var/www/html/.htaccess \
    && chmod 777 /var/www/html/sessions

# Exposer le port 80
EXPOSE 80

# Démarrer Apache
CMD ["apache2-foreground"]
