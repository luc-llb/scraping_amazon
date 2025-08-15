import apiRouter from './src/routes/api';
import express from 'express';

const app = express();
const port = 3000;

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Run server on http://localhost:${port}`);
});