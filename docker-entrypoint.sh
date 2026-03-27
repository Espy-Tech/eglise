#!/bin/bash

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-eglisep}"
DB_USER="${DB_USER:-eglisep_user}"
DB_PASS="${DB_PASS:-eglisep_pass}"

(
  MAX=30
  COUNT=0
  until php -r "try { new PDO('mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4','$DB_USER','$DB_PASS'); } catch(Exception \$e){ exit(1); }" 2>/dev/null; do
    COUNT=$((COUNT+1))
    [ $COUNT -ge $MAX ] && exit 1
    echo "[db] tentative $COUNT/$MAX..."
    sleep 3
  done
  php -r "
    \$p = new PDO('mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4','$DB_USER','$DB_PASS');
    \$s = file_get_contents('/var/www/html/backend/schema.sql');
    \$s = preg_replace('/^CREATE DATABASE.*$/mi','',preg_replace('/^USE.*;$/mi','',\$s));
    foreach(array_filter(array_map('trim',explode(';',\$s))) as \$q){ if(\$q) \$p->exec(\$q); }
    echo 'Schema OK'.PHP_EOL;
  "
) &

echo "[entrypoint] Démarrage Apache..."
exec apache2-foreground
