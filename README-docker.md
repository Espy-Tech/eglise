# 🚀 Déploiement Docker – eglisepjd

## Fichiers fournis

| Fichier | Rôle |
|---|---|
| `Dockerfile` | Image PHP 8.2 + Apache |
| `docker-entrypoint.sh` | Attend MySQL et initialise le schéma au démarrage |
| `docker-compose.yml` | Dev local uniquement (app + MySQL) |
| `config.php` | Remplace `backend/config.php` – lit les variables d'env |

---

## 1. Préparation du projet

**Remplace** ton fichier `backend/config.php` par le `config.php` fourni.

Place les 3 fichiers Docker à la **racine** de ton projet :
```
eglisepjd/
├── Dockerfile
├── docker-entrypoint.sh
├── docker-compose.yml        ← dev local seulement
├── backend/
│   ├── config.php            ← remplacé
│   └── schema.sql
├── index.php
└── ...
```

---

## 2. Test en local

```bash
docker compose up --build
# → ouvre http://localhost:8080
```

---

## 3. Déploiement sur Render

### A) Base de données
1. Render Dashboard → **New > PostgreSQL** … ou utilise un **MySQL externe** (PlanetScale, Railway, etc.)
2. Note les credentials : host, port, user, password, database name.

> ⚠️ Render ne propose pas MySQL natif. Utilise **Railway** ou **PlanetScale** pour MySQL, c'est gratuit au démarrage.

### B) Web Service
1. Render Dashboard → **New > Web Service**
2. Connecte ton dépôt GitHub
3. **Environment** : `Docker`
4. **Dockerfile Path** : `Dockerfile`
5. **Port** : `80`

### C) Variables d'environnement (à définir dans Render)

| Variable | Valeur |
|---|---|
| `DB_HOST` | host de ta base MySQL externe |
| `DB_PORT` | `3306` |
| `DB_NAME` | `eglisep` |
| `DB_USER` | ton user |
| `DB_PASS` | ton mot de passe |

### D) Initialisation du schéma
Le script `docker-entrypoint.sh` exécute automatiquement `backend/schema.sql` au premier démarrage (tables créées avec `IF NOT EXISTS`).

---

## 4. Commandes utiles

```bash
# Build seul
docker build -t eglisepjd .

# Run avec variables d'env manuelles
docker run -p 8080:80 \
  -e DB_HOST=mon-host-mysql \
  -e DB_NAME=eglisep \
  -e DB_USER=mon_user \
  -e DB_PASS=mon_pass \
  eglisepjd
```
