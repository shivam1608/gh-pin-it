#!/bin/bash

APP_NAME="ghpinit"

echo "🚀 Starting deployment for $APP_NAME..."

# Step 1: Stop any existing container
echo "🛑 Stopping and removing old container (if exists)..."
docker-compose down

# Step 2: Build and start the container
echo "🐳 Building and starting Docker container..."
docker-compose up --build -d

# Step 3: Show container status
echo "📦 Container status:"
docker ps | grep $APP_NAME

# Step 4: Show last few logs
echo "📜 Last 10 lines of logs:"
docker-compose logs --tail=10 $APP_NAME

echo "✅ Deployment complete! Visit http://ghpinit.shivzee.in"
