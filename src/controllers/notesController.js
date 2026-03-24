import * as notesService from '../services/notesService.js';

export const getNotes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await notesService.getNotes({
      userId: req.user?.id,
      page,
      limit
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await notesService.createNote({
      ...req.body,
      authorId: req.user.id
    });
    res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await notesService.getNoteById(req.params.id, req.user?.id);
    res.status(200).json({ note });
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await notesService.updateNote(req.params.id, req.user.id, req.body);
    res.status(200).json({ note });
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await notesService.deleteNote(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const forkNote = async (req, res, next) => {
  try {
    const note = await notesService.forkNote(req.params.id, req.user.id);
    res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
};

export const getNeighbors = async (req, res, next) => {
  try {
    const neighbors = await notesService.getNeighbors(req.params.id, req.user?.id);
    res.status(200).json({ neighbors });
  } catch (err) {
    next(err);
  }
};

export const exploreGraph = async (req, res, next) => {
  try {
    const depth = Number(req.query.depth) || 2;
    const exploration = await notesService.exploreGraph(req.params.id, depth, req.user?.id);
    res.status(200).json(exploration);
  } catch (err) {
    next(err);
  }
};

