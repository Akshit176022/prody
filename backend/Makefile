include .env


pre-commit:
	pip install pre-commit --upgrade
	pre-commit install

up:
	docker compose -f docker-compose.yml up --build -d

logs:
	docker compose logs -f --no-log-prefix app
	
logs-db:
	docker compose logs -f db

logs-celery:
	docker compose logs -f --no-log-prefix worker


down:
	docker compose down

shell:
	docker compose exec app python -m ptpython

shell-redis:
	docker compose exec redis redis-cli

makemigrations:
	docker compose exec app python -m manage makemigrations

migrate:
	docker compose exec app python -m manage migrate 

clean-db:
	rm -rf .docker

clean-redis:
	rm -rf .docker/redis-data

clean: clean-db clean-migrations

