FROM oven/bun:1 AS base
WORKDIR /app

# Install deps first for better build caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source + prisma schema
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src

# Generate Prisma client (writes to generated/client based on schema.prisma)
RUN cd prisma && bunx prisma generate

ENV NODE_ENV=production
EXPOSE 5000

# Run your server (Bun can run TS directly)
CMD ["bun", "src/index.ts"]