# Backend confing
FROM oven/bun:latest

WORKDIR /app/backend/

COPY backend/package.json ./
COPY backend/bun.lock ./
COPY backend/src ./
COPY backend/index.ts ./

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "index.ts"]

# Frontend config
