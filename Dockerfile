# ============================================================
#  Dockerfile – eglisepjd
#  Stack : PHP 8.2 + Apache + extensions PDO/MySQL
# ============================================================
FROM php:8.2-apache

# --- Extensions PHP nécessaires ---
RUN docker-php-ext-install pdo pdo_mysql mysqli

# --- Activer mod_rewrite Apache (utile si tu ajoutes un .htaccess) ---
RUN a2enmod rewrite

# --- Copier tout le projet dans le dossier web d'Apache ---
COPY . /var/www/html/

# --- Permissions correctes ---
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# --- Script d'entrée : attend MySQL puis initialise le schéma ---
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
