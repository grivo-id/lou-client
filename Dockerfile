# ---- Base image for dependencies ----
FROM node:18-alpine AS deps

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Build stage ----
FROM node:18-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app in production mode
RUN npm run build

# ---- Production image ----
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package.json and built files
COPY package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Set environment variables if needed
ENV NODE_ENV production
ENV PORT 3001

EXPOSE 3001

# Start Next.js app
CMD ["npm", "start"]
