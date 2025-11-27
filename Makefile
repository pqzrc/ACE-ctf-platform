.PHONY: help start stop restart rebuild logs logs-all status clean db-reset db-shell import-challenges deploy pull push

# ACE CTFd Platform - Makefile (Production)
# Usage: make <commande>

DOCKER_COMPOSE = docker compose

help: ## Afficher l'aide
	@echo ""
	@echo "ACE CTFd Platform - Commandes disponibles (Production)"
	@echo "======================================================"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'
	@echo ""

# --- Commandes de base ---

start: ## Démarrer tous les services (production)
	@echo "Démarrage de CTFd ACE..."
	$(DOCKER_COMPOSE) up -d
	@echo ""
	@echo "Services démarrés:"
	@echo "  CTFd:      http://localhost:8000"
	@echo "  Traefik:   http://localhost:8082"
	@echo "  Challenges: http://localhost:8081"
	@echo ""
	@echo "Voir les logs: make logs"

stop: ## Arrêter tous les services
	$(DOCKER_COMPOSE) down
	@echo "Services arrêtés"

restart: ## Redémarrer tous les services
	$(DOCKER_COMPOSE) restart
	@echo "Services redémarrés"

restart-ctfd: ## Redémarrer CTFd uniquement
	$(DOCKER_COMPOSE) restart ctfd
	@echo "CTFd redémarré"

# --- Build & Rebuild ---

rebuild: ## Rebuild complet et redémarrage
	@echo "Reconstruction et redémarrage..."
	$(DOCKER_COMPOSE) up -d --build ctfd
	@echo "Rebuild terminé"

rebuild-challenges: ## Rebuild les challenges
	@echo "Reconstruction des challenges..."
	$(DOCKER_COMPOSE) up -d --build challenge_test1 challenge_test2 challenge_test3 challenge_test4 challenge_test5
	@echo "Challenges reconstruits"

# --- Logs ---

logs: logs-ctfd ## Logs CTFd (par défaut)

logs-ctfd: ## Logs CTFd en temps réel
	$(DOCKER_COMPOSE) logs -f --tail=100 ctfd

logs-db: ## Logs de la base de données
	$(DOCKER_COMPOSE) logs -f --tail=100 db

logs-traefik: ## Logs Traefik
	$(DOCKER_COMPOSE) logs -f --tail=100 traefik

logs-all: ## Tous les logs en temps réel
	$(DOCKER_COMPOSE) logs -f --tail=50

logs-errors: ## Afficher seulement les erreurs
	$(DOCKER_COMPOSE) logs --tail=500 | grep -i error

# --- Base de données ---

db-shell: ## Ouvrir un shell MariaDB
	$(DOCKER_COMPOSE) exec db mysql -u ctfd -p ctfd

db-reset: ## Réinitialiser la base (PERTE DE DONNÉES)
	@echo "ATTENTION: Réinitialisation de la base CTFd"
	@echo "Cette action va SUPPRIMER toutes les données."
	@read -p "Confirmer (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "Arrêt de CTFd..."; \
		$(DOCKER_COMPOSE) stop ctfd; \
		echo "Suppression de la base..."; \
		$(DOCKER_COMPOSE) exec db mysql -u root -p$${MYSQL_ROOT_PASSWORD:-changeme} -e "DROP DATABASE IF EXISTS ctfd; CREATE DATABASE ctfd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"; \
		echo "Redémarrage de CTFd..."; \
		$(DOCKER_COMPOSE) start ctfd; \
		sleep 5; \
		echo "Base réinitialisée"; \
	else \
		echo "Annulé"; \
	fi

db-backup: ## Backup de la base de données
	@echo "Création d'un backup..."
	@mkdir -p ./backups
	@TIMESTAMP=$$(date +%Y%m%d_%H%M%S); \
	$(DOCKER_COMPOSE) exec -T db mysqldump -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd > ./backups/ctfd_$$TIMESTAMP.sql; \
	echo "Backup créé: ./backups/ctfd_$$TIMESTAMP.sql"

db-restore: ## Restaurer un backup (spécifier FILE=backup.sql)
	@if [ -z "$(FILE)" ]; then \
		echo "Erreur: spécifiez FILE=backup.sql"; \
		echo "Exemple: make db-restore FILE=./backups/ctfd_20250101_120000.sql"; \
		exit 1; \
	fi
	@echo "ATTENTION: Restauration du backup $(FILE)"
	@read -p "Confirmer (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "Restauration du backup..."; \
		cat $(FILE) | $(DOCKER_COMPOSE) exec -T db mysql -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd; \
		echo "Backup restauré"; \
	else \
		echo "Annulé"; \
	fi

# --- Challenges ---

import-challenges: ## Importer les challenges dans CTFd
	@echo "Import des challenges dans CTFd"
	@echo ""
	@if [ -z "$$CTFD_TOKEN" ]; then \
		echo "Erreur: Variable CTFD_TOKEN non définie"; \
		echo ""; \
		echo "Pour obtenir un token:"; \
		echo "  1. Connectez-vous à CTFd en tant qu'admin"; \
		echo "  2. Allez dans Settings > Access Tokens"; \
		echo "  3. Créez un token avec les permissions admin"; \
		echo "  4. Exportez: export CTFD_TOKEN='votre-token'"; \
		echo "  5. Relancez: make import-challenges"; \
		echo ""; \
		exit 1; \
	fi
	@echo "Token CTFd: $$CTFD_TOKEN"
	@echo "URL CTFd: $${CTFD_URL:-http://localhost:8000}"
	@echo ""
	@CTFD_URL=$${CTFD_URL:-http://localhost:8000} python3 scripts/import_challenges.py
	@echo ""
	@echo "Import terminé"

list-challenges: ## Lister les challenges disponibles
	@echo "Challenges disponibles dans ./challenges:"
	@ls -1 challenges/ | grep -E '^test[0-9]' | nl
	@echo ""
	@echo "Pour les importer: make import-challenges"

# --- Nettoyage ---

clean: ## Supprimer conteneurs et volumes (PERTE DE DONNÉES)
	@echo "ATTENTION: Suppression de TOUTES les données CTFd"
	@read -p "Confirmer (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		$(DOCKER_COMPOSE) down -v --remove-orphans; \
		docker volume rm -f ace-ctf-platform_ctfd_db ace-ctf-platform_ctfd_redis ace-ctf-platform_ctfd_uploads ace-ctf-platform_ctfd_logs 2>/dev/null || true; \
		echo "Nettoyage terminé"; \
	else \
		echo "Annulé"; \
	fi

fresh: ## Fresh start complet (PERTE TOTALE)
	@echo "ATTENTION: Fresh start - Suppression TOTALE des données CTFd"
	@read -p "Confirmer (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "Arrêt des conteneurs..."; \
		$(DOCKER_COMPOSE) down -v --remove-orphans 2>/dev/null || true; \
		echo "Suppression des volumes..."; \
		docker volume rm -f ace-ctf-platform_ctfd_db ace-ctf-platform_ctfd_redis ace-ctf-platform_ctfd_uploads ace-ctf-platform_ctfd_logs 2>/dev/null || true; \
		sleep 2; \
		echo "Reconstruction sans cache..."; \
		$(DOCKER_COMPOSE) build --no-cache ctfd; \
		echo "Démarrage..."; \
		$(DOCKER_COMPOSE) up -d; \
		echo ""; \
		echo "Fresh start terminé"; \
		echo "  Interface: http://localhost:8000"; \
		echo ""; \
		echo "Attendez 30 secondes pour l'initialisation"; \
	else \
		echo "Annulé"; \
	fi

# --- Debug & Info ---

status: ## État des services
	@echo "État des services:"
	@$(DOCKER_COMPOSE) ps

test: ## Tester l'accès aux services
	@echo "Test des services..."
	@curl -s http://localhost:8000/healthcheck > /dev/null && echo "  CTFd: OK" || echo "  CTFd: FAIL"
	@curl -s http://localhost:8082/api/http/routers > /dev/null && echo "  Traefik: OK" || echo "  Traefik: FAIL"
	@curl -s http://localhost:8081 > /dev/null && echo "  Test challenge: OK" || echo "  Test challenge: FAIL"

shell: ## Shell dans le conteneur CTFd
	$(DOCKER_COMPOSE) exec ctfd /bin/bash

shell-db: ## Shell MariaDB (alias de db-shell)
	$(DOCKER_COMPOSE) exec db mysql -u ctfd -p ctfd

# --- Déploiement & Git ---

pull: ## Pull les derniers changements et rebuild
	@echo "Pull des changements depuis Git..."
	git pull origin deploy-2
	@echo "Rebuild de CTFd..."
	$(DOCKER_COMPOSE) up -d --build ctfd
	@echo "Mise à jour terminée"

push: ## Push les changements vers Git
	git push origin deploy-2
	@echo "Push terminé"

deploy: pull ## Déployer la dernière version (alias de pull)

# --- Site d'inscription (ACE Website) ---

website-logs: ## Voir les logs du site d'inscription
	@cd ../ACE-Website && docker compose logs -f --tail=100 backend

website-restart: ## Redémarrer le site d'inscription
	@cd ../ACE-Website && docker compose restart backend
	@echo "Site d'inscription redémarré"

website-status: ## État du site d'inscription
	@cd ../ACE-Website && docker compose ps

sync-manual: ## Forcer une synchronisation manuelle des équipes
	@echo "Synchronisation manuelle des équipes..."
	@curl -X POST http://localhost:8000/admin/registration-sync/manual-sync \
		-H "Content-Type: application/json" \
		--cookie-jar /tmp/cookies.txt --cookie /tmp/cookies.txt || true
	@echo "Synchronisation déclenchée"

# --- Stats & Monitoring ---

stats: ## Statistiques d'utilisation des conteneurs
	docker stats --no-stream

teams-count: ## Compter les équipes synchronisées
	$(DOCKER_COMPOSE) exec db mysql -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd -e "SELECT COUNT(*) as total_teams FROM teams;"

users-count: ## Compter les utilisateurs
	$(DOCKER_COMPOSE) exec db mysql -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd -e "SELECT COUNT(*) as total_users FROM users;"

scoreboard: ## Afficher le scoreboard actuel
	@echo "Scoreboard CTFd (Top 10):"
	@$(DOCKER_COMPOSE) exec db mysql -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd -e "SELECT name, score FROM teams ORDER BY score DESC LIMIT 10;"

leaderboard: scoreboard ## Alias de scoreboard

health-check: ## Vérifier la santé du système
	@echo "Health check complet"
	@echo "===================="
	@echo ""
	@echo "Services Docker:"
	@$(DOCKER_COMPOSE) ps
	@echo ""
	@echo "Tests de connexion:"
	@curl -s http://localhost:8000/healthcheck > /dev/null && echo "  CTFd: OK" || echo "  CTFd: FAIL"
	@echo ""
	@echo "Base de données:"
	@$(DOCKER_COMPOSE) exec db mysql -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd -e "SELECT COUNT(*) as total_teams FROM teams;" -sN | xargs -I {} echo "  Équipes: {}"
	@$(DOCKER_COMPOSE) exec db mysql -u ctfd -p$${MYSQL_PASSWORD:-changeme} ctfd -e "SELECT COUNT(*) as total_users FROM users;" -sN | xargs -I {} echo "  Utilisateurs: {}"

.DEFAULT_GOAL := help