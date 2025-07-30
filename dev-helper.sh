#!/bin/bash

# Optimal Wordle - Development Helper Script

echo "🎯 Optimal Wordle Development Helper"
echo "===================================="

case "$1" in
    "docker-build")
        echo "🐳 Building Docker image..."
        docker build -t optimal-wordle .
        echo "✅ Docker image built successfully!"
        ;;
    "docker-run")
        echo "🚀 Starting Docker container..."
        docker run -d -p 8080:80 --name optimal-wordle-app optimal-wordle
        echo "✅ Container started! Visit http://localhost:8080"
        ;;
    "docker-stop")
        echo "🛑 Stopping Docker container..."
        docker stop optimal-wordle-app
        docker rm optimal-wordle-app
        echo "✅ Container stopped!"
        ;;
    "compose-up")
        echo "🚀 Starting with Docker Compose..."
        docker-compose up -d
        echo "✅ Application started! Visit http://localhost:8080"
        ;;
    "compose-down")
        echo "🛑 Stopping Docker Compose..."
        docker-compose down
        echo "✅ Application stopped!"
        ;;
    "logs")
        echo "📋 Showing container logs..."
        docker logs optimal-wordle-app
        ;;
    "clean")
        echo "🧹 Cleaning up Docker resources..."
        docker-compose down
        docker rmi optimal-wordle 2>/dev/null || true
        docker system prune -f
        echo "✅ Cleanup complete!"
        ;;
    *)
        echo "Usage: $0 {docker-build|docker-run|docker-stop|compose-up|compose-down|logs|clean}"
        echo ""
        echo "Commands:"
        echo "  docker-build  - Build the Docker image"
        echo "  docker-run    - Run the container manually"
        echo "  docker-stop   - Stop the running container"
        echo "  compose-up    - Start with Docker Compose (recommended)"
        echo "  compose-down  - Stop Docker Compose"
        echo "  logs          - Show container logs"
        echo "  clean         - Clean up all Docker resources"
        echo ""
        echo "Quick start: $0 compose-up"
        ;;
esac
