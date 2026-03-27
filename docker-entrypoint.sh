#!/bin/bash
set -e

# ============================================================
#  docker-entrypoint.sh
#  Attend que MySQL soit prêt, puis initialise le schéma SQL
# ============================================================

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-eglisep}"
DB_USER="${DB_USER:-eglisep_user}"
DB_PASS="${DB_PASS:-eglisep_pass}"

echo "[entrypoint] Attente de MySQL sur $DB_HOST:$DB_PORT ..."
until php -r "
  try {
    \$pdo = new PDO('mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4', '$DB_USER', '$DB_PASS');
    echo 'ok';
  } catch(Exception \$e) {
    exit(1);
  }
" 2>/dev/null; do
  echo "[entrypoint] MySQL pas encore prêt, nouvelle tentative dans 2s..."
  sleep 2
done

echo "[entrypoint] MySQL prêt ! Initialisation du schéma..."
php -r "
  \$pdo = new PDO('mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4', '$DB_USER', '$DB_PASS', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
  ]);
  \$sql = file_get_contents('/var/www/html/backend/schema.sql');
  // Supprimer les lignes CREATE DATABASE / USE qui ne sont pas nécessaires en conteneur
  \$sql = preg_replace('/^CREATE DATABASE.*$/mi', '', \$sql);
  \$sql = preg_replace('/^USE.*;$/mi', '', \$sql);
  foreach(array_filter(array_map('trim', explode(';', \$sql))) as \$stmt) {
    if(\$stmt) \$pdo->exec(\$stmt);
  }
  echo '[entrypoint] Schéma initialisé.' . PHP_EOL;
"

# Démarrer Apache
exec "$@"
