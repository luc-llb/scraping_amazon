FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ts.config ./
COPY index.html ./
COPY src ./src
COPY public ./public

RUN bun install

EXPOSE 5173

CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]
