import apiRouter from './src/routes/api';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

/*
// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173'], // Permite essas origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
*/

// Configuração CORS mais permissiva (apenas para desenvolvimento)
app.use(cors({
  origin: true, // Permite qualquer origem
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Para suporte a browsers legados
}));

app.use(express.json());

// Middleware de log para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Run server on http://localhost:${port}`);
});

