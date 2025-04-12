# Use the official Bun image
FROM oven/bun:1.0.25

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first for efficient layer caching
COPY bun.lockb package.json tsconfig.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Run the app
CMD ["bun", "run", "index.ts"]
