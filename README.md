# (EN-US) Amazon Products Scraping & API
This repository contains a project that scrapes Amazon product data and provides an API to access this information. The project is built using TypeScript and utilizes the **Bun runtime** for fast execution, with a modern frontend interface.

## 🚀 Features
- **Product Scraping**: Extracts Amazon product listings from search results
- **REST API**: Provides endpoints to search and retrieve product data
- **Modern Frontend**: Interactive web interface built with vanilla JavaScript
- **Docker Support**: Full containerization for easy deployment
- **CORS Configured**: Ready for cross-origin requests
- **GitHub Codespace Ready**: Optimized for cloud development

## 🛠 Tech Stack
- **Backend**: Node.js with Bun runtime, Express.js, TypeScript
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Containerization**: Docker & Docker Compose
- **Development**: GitHub Codespaces support

## 📋 Prerequisites
- Docker and Docker Compose (recommended)
- OR Bun runtime (if running without Docker)
- Git

## 🚀 How to run the project

### Clone the repository
```bash
git clone https://github.com/luc-llb/scraping_amazon.git
cd scraping_amazon
```

### Using Docker (Recommended)
This project is fully developed using Docker, so it's recommended that you use this powerful tool. With Docker, just run the following command to start both API and frontend, without worrying about dependencies and version errors.

```bash
docker compose up --build
```

The services will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/health (health check)

### Using Bun (Without Docker)
If you prefer to run the project without Docker, you can use **Bun**. Make sure you have Bun installed on your machine. You can install Bun by following the instructions on the [Bun website](https://bun.sh/).

#### Backend Setup
```bash
cd backend
bun install
bun run index.ts
```

#### Frontend Setup
```bash
cd frontend
bun install
bun run dev
```

> This project was created using `bun init` in bun v1.2.20.

## 🔧 Development with Docker (GitHub Codespaces)
If you're using Docker and don't have Bun installed on your machine, here's a useful preset for using Bun commands:

```bash
cd backend/
alias bun='docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  oven/bun:latest \
  bun'
```

## 🐳 Dev Container Support

This project includes a `devcontainer.json` file to streamline development in GitHub Codespaces or any environment that supports Dev Containers. The configuration ensures **port forwarding**, automatically exposes ports `3000` (backend) and `5173` (frontend).

### How to Use
1. Open the project in VS Code.
2. Press `F1` and select **Dev Containers: Rebuild and Reopen in Container**.
3. The environment will be set up automatically, and you can start coding immediately.

For more details, see the [Dev Containers documentation](https://code.visualstudio.com/docs/devcontainers/containers).

## 📡 API Endpoints
- `GET /health` - Health check endpoint
- `GET /api/scrape?keyword=<search_term>` - Search products by keyword

### Example API Usage
```bash
curl "http://localhost:3000/api/scrape?keyword=notebook"
```

## 🌐 GitHub Codespaces
This project is optimized for GitHub Codespaces. The frontend automatically detects when running in Codespaces and adjusts API URLs accordingly. Make sure to set port 3000 as public for the backend API.

## 📂 Project Structure
```
scraping_amazon/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── repository/
│   ├── index.ts
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

# (PT-BR) Scraping e API de Produtos da Amazon
Este repositório contém um projeto que raspa dados de produtos da Amazon e fornece uma API para acessar essas informações. O projeto é construído usando TypeScript e utiliza o **Bun runtime** para execução rápida, com uma interface frontend moderna.

## 🚀 Funcionalidades
- **Scraping de Produtos**: Extrai listagens de produtos da Amazon dos resultados de pesquisa
- **API REST**: Fornece endpoints para pesquisar e recuperar dados de produtos
- **Frontend Moderno**: Interface web interativa construída com JavaScript vanilla
- **Suporte Docker**: Containerização completa para fácil implantação
- **CORS Configurado**: Pronto para requisições cross-origin
- **GitHub Codespace Ready**: Otimizado para desenvolvimento em nuvem

## 🛠 Stack Tecnológica
- **Backend**: Node.js com Bun runtime, Express.js, TypeScript
- **Frontend**: JavaScript Vanilla (ES6+), HTML5, CSS3
- **Containerização**: Docker & Docker Compose
- **Desenvolvimento**: Suporte ao GitHub Codespaces

## 📋 Pré-requisitos
- Docker e Docker Compose (recomendado)
- OU Bun runtime (se executar sem Docker)
- Git

## 🚀 Como executar o projeto

### Clone o repositório
```bash
git clone https://github.com/luc-llb/scraping_amazon.git
cd scraping_amazon
```

### Usando Docker (Recomendado)
Este projeto foi totalmente desenvolvido usando Docker, então é recomendado que você use essa poderosa ferramenta. Com o Docker, basta executar o seguinte comando para iniciar tanto a API quanto o frontend, sem se preocupar com dependências e erros de versão.

```bash
docker compose up --build
```

Os serviços estarão disponíveis em:
- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:3000
- **Documentação da API**: http://localhost:3000/health (verificação de saúde)

### Usando Bun (Sem Docker)
Se você prefere executar o projeto sem Docker, pode usar o **Bun**. Certifique-se de ter o Bun instalado em sua máquina. Você pode instalar o Bun seguindo as instruções no [site do Bun](https://bun.sh/).

#### Configuração do Backend
```bash
cd backend
bun install
bun run index.ts
```

#### Configuração do Frontend
```bash
cd frontend
bun install
bun run dev
```

> Este projeto foi criado usando `bun init` no bun v1.2.20.

## 🔧 Desenvolvimento com Docker (GitHub Codespaces)
Se você está usando Docker e não tem o Bun instalado em sua máquina, este é um preset que pode ser muito útil para utilizar os comandos do Bun:

```bash
cd backend/
alias bun='docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  oven/bun:latest \
  bun'
```

## 🐳 Suporte a Dev Container

Este projeto inclui um arquivo `devcontainer.json` para agilizar o desenvolvimento no GitHub Codespaces ou em qualquer ambiente que suporte Dev Containers. A configuração garante o **encaminhamento de porta**, expondo automaticamente as portas `3000` (backend) e `5173` (frontend).

### Como Usar
1. Abra o projeto no VS Code.
2. Pressione `F1` e selecione **Dev Containers: Rebuild and Reopen in Container**.
3. O ambiente será configurado automaticamente, e você pode começar a codar imediatamente.

Para mais detalhes, consulte a [documentação do Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

## 📡 Endpoints da API
- `GET /health` - Endpoint de verificação de saúde
- `GET /api/scrape?keyword=<termo_pesquisa>` - Pesquisar produtos por palavra-chave

### Exemplo de Uso da API
```bash
curl "http://localhost:3000/api/scrape?keyword=notebook"
```

## 🌐 GitHub Codespaces
Este projeto é otimizado para GitHub Codespaces. O frontend detecta automaticamente quando está rodando no Codespaces e ajusta as URLs da API adequadamente. Certifique-se de definir a porta 3000 como pública para a API do backend.

## 📂 Estrutura do Projeto
```
scraping_amazon/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── repository/
│   ├── index.ts
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🤝 Contribuindo
1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/funcionalidade-incrivel`)
3. Commit suas mudanças (`git commit -m 'Adiciona alguma funcionalidade incrível'`)
4. Push para a branch (`git push origin feature/funcionalidade-incrivel`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
