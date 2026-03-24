import * as graphService from '../services/graphService.js';

export const getGraph = async (req, res, next) => {
  try {
    const graph = await graphService.getGraph(req.user?.id);
    res.status(200).json(graph);
  } catch (err) {
    next(err);
  }
};

export const createEdge = async (req, res, next) => {
  try {
    const edge = await graphService.createEdge(req.body, req.user?.id);
    res.status(201).json({ edge });
  } catch (err) {
    next(err);
  }
};

export const deleteEdge = async (req, res, next) => {
  try {
    await graphService.deleteEdge(req.body.id, req.user?.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

