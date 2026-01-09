build:
	@echo "Building production version..."
	@docker build -t remi-app:latest .
	@echo "Production version has been built"

run:
	@echo "Running production version..."
	@docker run -d -p 3000:3000 --env NODE_ENV=production --name remi-app remi-app:latest
	@echo "Production version has started"


stop:
	@echo "Stopping production version..."
	@docker stop remi-app || true
	@docker rm remi-app || true
	@echo "Production version has been stopped"


build-dev:
	@echo "Building development version..."
	@docker build -f Dockerfile.dev -t remi-app-dev:latest .
	@echo "Development version has been built"

run-dev:
	@echo "Running development version..."
	@docker run -d -p 3000:3000 --env NODE_ENV=development --name remi-app-dev remi-app-dev:latest
	@echo "Development version has started"

stop-dev:
	@echo "Stopping development version..."
	@docker stop remi-app-dev || true
	@docker rm remi-app-dev || true
	@echo "Development version has been stopped"
