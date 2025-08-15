import express from 'express';
import { scrapingService } from '../services/scrapingService';

const router = express.Router();

router.get('/scrape', async (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    return res.status(400).json({ success: false, error: 'Parâmetro "keyword" é obrigatório.' });
  }

  try {
    const result = await scrapingService(keyword);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao realizar scraping.' });
  }
});

export default router;