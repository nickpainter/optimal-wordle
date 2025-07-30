# Optimal Wordle - Development Helper Script (PowerShell)

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("docker-build", "docker-run", "docker-stop", "compose-up", "compose-down", "logs", "clean", "help")]
    [string]$Command
)

Write-Host "🎯 Optimal Wordle Development Helper" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

switch ($Command) {
    "docker-build" {
        Write-Host "🐳 Building Docker image..." -ForegroundColor Blue
        docker build -t optimal-wordle .
        Write-Host "✅ Docker image built successfully!" -ForegroundColor Green
    }
    "docker-run" {
        Write-Host "🚀 Starting Docker container..." -ForegroundColor Blue
        docker run -d -p 8080:80 --name optimal-wordle-app optimal-wordle
        Write-Host "✅ Container started! Visit http://localhost:8080" -ForegroundColor Green
    }
    "docker-stop" {
        Write-Host "🛑 Stopping Docker container..." -ForegroundColor Blue
        docker stop optimal-wordle-app
        docker rm optimal-wordle-app
        Write-Host "✅ Container stopped!" -ForegroundColor Green
    }
    "compose-up" {
        Write-Host "🚀 Starting with Docker Compose..." -ForegroundColor Blue
        docker-compose up -d
        Write-Host "✅ Application started! Visit http://localhost:8080" -ForegroundColor Green
    }
    "compose-down" {
        Write-Host "🛑 Stopping Docker Compose..." -ForegroundColor Blue
        docker-compose down
        Write-Host "✅ Application stopped!" -ForegroundColor Green
    }
    "logs" {
        Write-Host "📋 Showing container logs..." -ForegroundColor Blue
        docker logs optimal-wordle-app
    }
    "clean" {
        Write-Host "🧹 Cleaning up Docker resources..." -ForegroundColor Blue
        docker-compose down
        docker rmi optimal-wordle -ErrorAction SilentlyContinue
        docker system prune -f
        Write-Host "✅ Cleanup complete!" -ForegroundColor Green
    }
    "help" {
        Write-Host "Usage: .\dev-helper.ps1 -Command <command>" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Commands:" -ForegroundColor Yellow
        Write-Host "  docker-build  - Build the Docker image"
        Write-Host "  docker-run    - Run the container manually"
        Write-Host "  docker-stop   - Stop the running container"
        Write-Host "  compose-up    - Start with Docker Compose (recommended)"
        Write-Host "  compose-down  - Stop Docker Compose"
        Write-Host "  logs          - Show container logs"
        Write-Host "  clean         - Clean up all Docker resources"
        Write-Host ""
        Write-Host "Quick start: .\dev-helper.ps1 -Command compose-up" -ForegroundColor Cyan
    }
}
