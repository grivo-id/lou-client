# Use Node.js 20 as a base image
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Install dependencies (package.json and package-lock.json)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application source
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package.json (optional but good for debugging)
COPY package.json ./

# Copy built app and necessary files from the build stage
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/next.config.mjs ./next.config.mjs
COPY --from=deps /app/package.json ./package.json

# Expose port 3000 (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
