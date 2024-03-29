import express from 'express';
import { 
  handleGenerateShortURL, 
  handleRedirectShortURL,
  handleGetAnalytics } from '../controllers/url.js';

const router = express.Router();

router.post('/', handleGenerateShortURL);

router.get('/:shortId', handleRedirectShortURL)
router.get('/analytics/:shortId', handleGetAnalytics)

export default router;