#!/bin/bash

# ============================================================
#  docker-entrypoint.sh – version corrigée pour Render
#  Apache démarre IMMÉDIATEMENT, MySQL est initialisé en fond
# ============================================================

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-eglisep}"
DB_USER="${DB_USER:-eglisep_user}"
DB_PASS="${DB_PASS:-eglisep_pass}"

# Initialisation de la base en arrière-plan (ne bloque pas Apache)
(
  echo "[entrypoint] Attente de MySQL en arrière-plan..."
  MAX=30
  COUNT=0
  until php -r "
    try {
      \$pdo = new PDO('mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4', '$DB_USER', '$DB_PASS');
      echo 'ok';
    } catch(Exception \$e) {
      exit(1);
    }
  " 2>/dev/null; do
    COUNT=\$((COUNT+1))
    if [ \$COUNT -ge \$MAX ]; then
      echo "[entrypoint] Impossible de joindre MySQL après \$MAX tentatives, abandon."
      exit 1
    fi
    echo "[entrypoint] MySQL pas encore prêt (\$COUNT/\$MAX), nouvelle tentative dans 3s..."
    sleep 3
  done

  echo "[entrypoint] MySQL prêt ! Initialisation du schéma..."
  php -r "
    \$pdo = new PDO('mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4', '$DB_USER', '$DB_PASS', [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    \$sql = file_get_contents('/var/www/html/backend/schema.sql');
    \$sql = preg_replace('/^CREATE DATABASE.*$/mi', '', \$sql);
    \$sql = preg_replace('/^USE.*;$/mi', '', \$sql);
    foreach(array_filter(array_map('trim', explode(';', \$sql))) as \$stmt) {
      if(\$stmt) \$pdo->exec(\$stmt);
    }
    echo '[entrypoint] Schema initialisé avec succès.' . PHP_EOL;
  "
) &

# Démarrer Apache immédiatement (sans attendre MySQL)
echo "[entrypoint] Démarrage d'Apache sur le port 80..."
exec "$@"
