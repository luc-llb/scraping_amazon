# Backend confing
FROM oven/bun:latest

WORKDIR /backend/

COPY backend/package.json ./
COPY backend/bun.lock ./
COPY backend/src ./
COPY backend/index.ts ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "index.ts"]

# Frontend config
