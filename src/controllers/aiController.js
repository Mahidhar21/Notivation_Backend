import * as aiService from '../services/aiService.js';

export const formatNotes = async (req, res, next) => {
  try {
    const { text } = req.body;
    const markdown = await aiService.formatTextToMarkdown(text);
    res.status(200).json({ markdown });
  } catch (err) {
    next(err);
  }
};

