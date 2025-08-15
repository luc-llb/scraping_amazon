FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
COPY src ./src
COPY index.ts ./

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "index.ts"]
