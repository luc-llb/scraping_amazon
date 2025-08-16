# Frontend for Amazon Scraping Project

## (EN-US) Overview
This is the frontend for the Amazon Scraping project. It provides a modern and interactive interface for users to search and view Amazon product data scraped by the backend.

### 🚀 Features
- **Interactive UI**: Built with vanilla JavaScript, HTML5, and CSS3.
- **API Integration**: Communicates with the backend API to fetch and display product data.
- **Responsive Design**: Optimized for various screen sizes.

### 🛠 Tech Stack
- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3
- **Build Tool**: Vite

### 📋 Prerequisites
- Node.js and npm (or Bun runtime)
- Docker (optional, for containerized development)

### 🚀 How to Run

#### Using Docker (Recommended)
```bash
docker compose up --build
```
The frontend will be available at: [http://localhost:5173](http://localhost:5173)

#### Using Bun (Without Docker)
```bash
cd frontend
bun install
bun run dev
```

### 📂 Project Structure
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── ErrorMessage.js
│   │   ├── NoResults.js
│   │   └── ProductCard.js
│   ├── services/
│   │   └── ApiService.js
│   ├── main.js
│   └── style.css
├── index.html
└── package.json
```

---

## (PT-BR) Visão Geral
Este é o frontend do projeto de Scraping da Amazon. Ele fornece uma interface moderna e interativa para os usuários pesquisarem e visualizarem os dados de produtos da Amazon extraídos pelo backend.

### 🚀 Funcionalidades
- **UI Interativa**: Construída com JavaScript puro, HTML5 e CSS3.
- **Integração com API**: Comunica-se com o backend para buscar e exibir dados de produtos.
- **Design Responsivo**: Otimizado para diferentes tamanhos de tela.

### 🛠 Tecnologias Utilizadas
- **Framework Frontend**: JavaScript puro (ES6+)
- **Estilização**: CSS3
- **Ferramenta de Build**: Vite

### 📋 Pré-requisitos
- Node.js e npm (ou runtime Bun)
- Docker (opcional, para desenvolvimento containerizado)

### 🚀 Como Executar

#### Usando Docker (Recomendado)
```bash
docker compose up --build
```
O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

#### Usando Bun (Sem Docker)
```bash
cd frontend
bun install
bun run dev
```

### 📂 Estrutura do Projeto
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── ErrorMessage.js
│   │   ├── NoResults.js
│   │   └── ProductCard.js
│   ├── services/
│   │   └── ApiService.js
│   ├── main.js
│   └── style.css
├── index.html
└── package.json
```
