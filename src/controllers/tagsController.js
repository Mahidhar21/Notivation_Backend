import * as tagsService from '../services/tagsService.js';

export const getTags = async (req, res, next) => {
  try {
    const tags = await tagsService.getTags();
    res.status(200).json({ tags });
  } catch (err) {
    next(err);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const tag = await tagsService.createTag(req.body);
    res.status(201).json({ tag });
  } catch (err) {
    next(err);
  }
};

export const addTagsToNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const { tags } = req.body;
    const result = await tagsService.addTagsToNote(noteId, tags, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

