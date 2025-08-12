# (EN-US) Scraping and API of Amazon Products
This repository contains a project that scrapes Amazon product data and provides an API to access this information. The project is built using TypeScript and utilizes the **Bun runtime** for fast execution.

## How to run the project
Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/luc-llb/scraping_amazon.git
cd scraping_amazon
```

### Using Docker (Recommended)
This project is fully developed using Docker, so is recommended that you using this powerfully tool. With the Docker, enough to tun the folliwing commando to run the API, without worrying about dependencies and version errors.

```bash
docker compose up
```

### Using Bun
If you prefer to run the project without Docker, you can use **Bun**. Make sure you have Bun installed on your machine. You can install Bun by following the instructions on the [Bun website](https://bun.sh/).

After installing Bun, run this command to install the dependencies:

```bash
bun install
```

To run the API, execute the following command:

```bash
bun run index.ts
```

> This project was created using `bun init` in bun v1.2.20.

## More info
The API will be available at `http://localhost:3000`.

If you too are using Docker and don'r have the Bun installed on you machine, this is a preseet that can is vety useful for **manually installing packages**:

```bash
cd backend/
alias ADD='docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  oven/bun:latest \
  bun add'
```

---

# (PT-BR) Scraping e API de Produtos da Amazon
Este repositório contém um projeto que raspa dados de produtos da Amazon e fornece uma API para acessar essas informações. O projeto é construído usando TypeScript e utiliza o **Bun runtime** para execução rápida.

## Como executar o projeto
Clone o repositório e navegue até o diretório do projeto:
```bash
git clone https://github.com/luc-llb/scraping_amazon.git
cd scraping_amazon
```

### Usando Docker (Recomendado)
Este projeto foi totalmente desenvolvido usando Docker, então é recomendado que você use essa poderosa ferramenta. Com o Docker, basta executar o seguinte comando para rodar a API, sem se preocupar com dependências e erros de versão.

```bash
docker compose up
```

### Usando Bun
Se você prefere executar o projeto sem Docker, pode usar o **Bun**. Certifique-se de ter o Bun instalado em sua máquina. Você pode instalar o Bun seguindo as instruções no [site do Bun](https://bun.sh/).

Após instalar o Bun, execute este comando para instalar as dependências:

```bash
bun install
```

Para executar a API, execute o seguinte comando:

```bash
bun run index.ts
```
> Este projeto foi criado usando `bun init` no bun v1.2.20.

## Mais informações
A API estará disponível em `http://localhost:3000`.

Se você também estiver usando Docker e não tiver o Bun instalado em sua máquina, este é um preset que pode ser muito útil para **instalar pacotes manualmente**:

```bash
cd backend/
alias ADD='docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  oven/bun:latest \
  bun add'
```