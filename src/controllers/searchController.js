import * as searchService from '../services/searchService.js';

export const searchNotes = async (req, res, next) => {
  try {
    const { q } = req.query;
    const userId = req.user?.id;
    const results = await searchService.searchNotes(q, userId);
    res.status(200).json({ results });
  } catch (err) {
    next(err);
  }
};

