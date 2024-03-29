import { nanoid } from 'nanoid';
import URL from '../models/url.js';

export const handleGenerateShortURL = async (req, res) => {
  const body = req.body;
  if(!body.originalURL) return res.status(400).json({ error: 'URL is req...' })

  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.originalURL,
    visitHistory: [],
  })

  return res.render('home', {
    id: shortId,
  })
  // return res.status(201).json({ status: 'success', id: shortId })
}

export const handleRedirectShortURL = async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate({ shortId }, {
    $push: {
      visitHistory: {
        timestamp: Date.now(),
      }
    }
  })

  return res.status(202).redirect(entry.redirectURL)
}

export const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  const urlData = await URL.findOne({ shortId });
  const analyticsCount = urlData.visitHistory.length;
  const analytics = urlData.visitHistory;

  return res.status(200).json({
    totalClick: analyticsCount,
    analytics,
  })
}
