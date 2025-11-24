.PHONY: help setup start stop restart logs build rebuild clean fresh fresh-all status shell test deploy-prod redeploy update vps-fix vps-start vps-stop vps-logs vps-status

# Variables
DOCKER_COMPOSE = docker compose

help: ## Afficher l'aide
	@echo "=========================================="
	@echo "CTFd ACE 2025 - Commandes disponibles"
	@echo "=========================================="
	@echo ""
	@echo "📦 Développement local:"
	@grep -E '^(setup|start|stop|restart|logs|logs-all|status|build|rebuild|shell|test|clean|fresh|fresh-all):.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "🚀 Déploiement production:"
	@grep -E '^(deploy-prod|redeploy|update):.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "🔧 Gestion VPS (à distance):"
	@grep -E '^vps-.*:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "📚 Challenges:"
	@grep -E '^import-challenges:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""

setup: ## Créer le fichier .env depuis .env.example
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✓ Fichier .env créé"; \
		echo "⚠ Éditez .env avec vos valeurs (JWT_SECRET, passwords, etc.)"; \
	else \
		echo "✓ .env existe déjà"; \
	fi

start: ## Démarrer tous les services
	@echo "Démarrage de CTFd..."
	$(DOCKER_COMPOSE) up -d
	@echo ""
	@echo "✓ CTFd démarré"
	@echo "  Interface: http://localhost:8000"
	@echo "  Traefik:   http://localhost:8082"
	@echo "  Challenge: http://test.challenges.local (ajoutez au /etc/hosts)"

stop: ## Arrêter tous les services
	$(DOCKER_COMPOSE) down
	@echo "✓ Services arrêtés"

restart: ## Redémarrer tous les services
	$(DOCKER_COMPOSE) restart
	@echo "✓ Services redémarrés"

logs: ## Afficher les logs CTFd
	$(DOCKER_COMPOSE) logs -f --tail=100 ctfd

logs-all: ## Afficher tous les logs
	$(DOCKER_COMPOSE) logs -f --tail=50

status: ## Afficher l'état des services
	@echo "État des services:"
	@$(DOCKER_COMPOSE) ps

build: ## Reconstruire l'image CTFd (après modification plugins)
	@echo "Reconstruction de l'image CTFd..."
	$(DOCKER_COMPOSE) build ctfd
	@echo "✓ Image reconstruite"

rebuild: ## Reconstruire et redémarrer CTFd
	@echo "Reconstruction et redémarrage..."
	$(DOCKER_COMPOSE) up -d --build ctfd
	@echo "✓ CTFd reconstruit et redémarré"

shell: ## Ouvrir un shell dans le conteneur CTFd
	$(DOCKER_COMPOSE) exec ctfd /bin/bash

test: ## Tester l'accès aux services
	@echo "Test des services..."
	@curl -s http://localhost:8000/healthcheck > /dev/null && echo "✓ CTFd accessible" || echo "✗ CTFd inaccessible"
	@curl -s http://localhost:8082/api/http/routers > /dev/null && echo "✓ Traefik accessible" || echo "✗ Traefik inaccessible"
	@echo ""
	@echo "Pour tester le challenge:"
	@echo "  1. Ajoutez '127.0.0.1 test.challenges.local' au /etc/hosts"
	@echo "  2. Ouvrez http://test.challenges.local"

clean: ## Supprimer tous les conteneurs et volumes (⚠ perte de données)
	@echo "⚠ ATTENTION: Suppression de toutes les données !"
	@read -p "Confirmer ? (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		$(DOCKER_COMPOSE) down -v --remove-orphans; \
		docker volume rm -f ace-ctf-platform_ctfd_db ace-ctf-platform_ctfd_redis ace-ctf-platform_ctfd_uploads ace-ctf-platform_ctfd_logs 2>/dev/null || true; \
		echo "✓ Nettoyage terminé"; \
	else \
		echo "✗ Annulé"; \
	fi

fresh: ## Nettoyage complet CTFd + rebuild + redémarrage
	@echo "⚠ ATTENTION: Fresh start CTFd - Suppression totale des données !"
	@read -p "Confirmer ? (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "→ Arrêt des conteneurs..."; \
		$(DOCKER_COMPOSE) down -v --remove-orphans 2>/dev/null || true; \
		echo "→ Suppression des volumes..."; \
		docker volume rm -f ace-ctf-platform_ctfd_db ace-ctf-platform_ctfd_redis ace-ctf-platform_ctfd_uploads ace-ctf-platform_ctfd_logs 2>/dev/null || true; \
		echo "→ Vérification..."; \
		sleep 2; \
		echo "→ Reconstruction des images..."; \
		$(DOCKER_COMPOSE) build --no-cache ctfd; \
		echo "→ Démarrage..."; \
		$(DOCKER_COMPOSE) up -d; \
		echo ""; \
		echo "✓ Fresh start terminé !"; \
		echo "  Interface: http://localhost:8000"; \
		echo "  Logs: make logs"; \
		echo ""; \
		echo "⏳ Attendez 30 secondes pour l'initialisation complète"; \
	else \
		echo "✗ Annulé"; \
	fi

fresh-all: ## Fresh start TOTAL (CTFd + site d'inscription)
	@echo "⚠ ATTENTION: Fresh start TOTAL - Suppression CTFd + Site d'inscription !"
	@read -p "Confirmer ? (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "→ Arrêt CTFd..."; \
		$(DOCKER_COMPOSE) down -v --remove-orphans 2>/dev/null || true; \
		echo "→ Suppression volumes CTFd..."; \
		docker volume rm -f ace-ctf-platform_ctfd_db ace-ctf-platform_ctfd_redis ace-ctf-platform_ctfd_uploads ace-ctf-platform_ctfd_logs 2>/dev/null || true; \
		echo "→ Arrêt site d'inscription..."; \
		cd ../ACE-website && docker compose down -v --remove-orphans 2>/dev/null || true; \
		echo "→ Suppression volumes site..."; \
		docker volume rm -f ace-website_postgres_data ace-website_redis_data 2>/dev/null || true; \
		echo "→ Reconstruction..."; \
		cd ../ACE-website && docker compose build --no-cache backend && docker compose up -d; \
		cd ../ACE-ctf-platform && $(DOCKER_COMPOSE) build --no-cache ctfd && $(DOCKER_COMPOSE) up -d; \
		echo ""; \
		echo "✓ Fresh start TOTAL terminé !"; \
		echo "  Site: http://localhost:3000"; \
		echo "  CTFd: http://localhost:8000"; \
		echo ""; \
		echo "⏳ Attendez 30 secondes pour l'initialisation complète"; \
	else \
		echo "✗ Annulé"; \
	fi

import-challenges: ## Importer les challenges dans CTFd
	@echo "📦 Import des challenges dans CTFd"
	@echo ""
	@if [ -z "$$CTFD_TOKEN" ]; then \
		echo "❌ Erreur: Variable CTFD_TOKEN non définie"; \
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
	@echo "✅ Import terminé"

# ==== Commandes de déploiement ====

deploy-prod: ## Déploiement complet sur le VPS (première installation)
	@echo "🚀 Déploiement production ACE CTF Platform"
	@echo "⚠️  Ce script doit être exécuté sur le VPS"
	@bash deployment/deploy.sh

redeploy: ## Redéploiement rapide (mise à jour du code)
	@echo "🔄 Redéploiement rapide..."
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) pull 2>/dev/null || true
	$(DOCKER_COMPOSE) build --no-cache ctfd
	$(DOCKER_COMPOSE) up -d
	@echo ""
	@echo "✅ Redéploiement terminé"
	@echo "Logs: make logs"

update: ## Mise à jour depuis Git + redeploy
	@echo "📥 Mise à jour depuis Git..."
	git pull
	@echo ""
	@make redeploy

# ==== Commandes VPS (à distance) ====

VPS_HOST = VPS-VZ2
VPS_DIR = /opt/ace-ctf-platform
VPS_WEBSITE_DIR = /opt/ace-website

vps-fix: ## Corriger la config .env sur le VPS et redémarrer
	@echo "🔧 Correction de la configuration VPS..."
	@echo "→ Correction du fichier .env..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && \
		sed -i '/^FRONTEND_URL=/d' .env && \
		echo 'FRONTEND_URL=https://ace.vizyondijital.fr' >> .env && \
		echo '✓ FRONTEND_URL corrigé'"
	@echo "→ Vérification des secrets..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && \
		if grep -q 'CHANGEME' .env; then \
			echo '⚠️  ATTENTION: Le fichier .env contient encore des valeurs CHANGEME'; \
			grep 'CHANGEME' .env; \
		else \
			echo '✓ Pas de CHANGEME trouvé'; \
		fi"
	@echo ""
	@echo "✅ Configuration corrigée"

vps-start: ## Démarrer tous les services sur le VPS
	@echo "🚀 Démarrage des services sur le VPS..."
	@echo "→ Démarrage ACE-Website..."
	@ssh $(VPS_HOST) "cd $(VPS_WEBSITE_DIR) && docker compose up -d"
	@echo "→ Attente 10 secondes..."
	@sleep 10
	@echo "→ Démarrage ACE-CTF-Platform..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && docker compose up -d"
	@echo ""
	@echo "✅ Services démarrés"
	@echo "→ Vérification: make vps-status"

vps-stop: ## Arrêter tous les services sur le VPS
	@echo "🛑 Arrêt des services sur le VPS..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && docker compose down"
	@ssh $(VPS_HOST) "cd $(VPS_WEBSITE_DIR) && docker compose down"
	@echo "✅ Services arrêtés"

vps-restart: ## Redémarrer tous les services sur le VPS
	@make vps-stop
	@sleep 5
	@make vps-start

vps-logs: ## Voir les logs CTFd sur le VPS
	@echo "📋 Logs CTFd (Ctrl+C pour quitter)..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && docker compose logs -f --tail=100 ctfd"

vps-status: ## Voir l'état des services sur le VPS
	@echo "📊 État des services sur le VPS"
	@echo ""
	@echo "=== ACE-Website ==="
	@ssh $(VPS_HOST) "cd $(VPS_WEBSITE_DIR) && docker compose ps"
	@echo ""
	@echo "=== ACE-CTF-Platform ==="
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && docker compose ps"
	@echo ""
	@echo "=== Réseaux Docker ==="
	@ssh $(VPS_HOST) "docker network ls | grep -E '(ace-website_ace-network|ctfd)'"

vps-rebuild: ## Rebuild et redémarrer CTFd sur le VPS
	@echo "🔨 Rebuild CTFd sur le VPS..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && docker compose down && docker compose build --no-cache ctfd && docker compose up -d"
	@echo "✅ Rebuild terminé"

vps-update: ## Pull depuis Git et rebuild sur le VPS
	@echo "📥 Mise à jour VPS depuis Git..."
	@ssh $(VPS_HOST) "cd $(VPS_DIR) && git pull"
	@make vps-rebuild
