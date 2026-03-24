import * as edgeRepository from '../repositories/edgeRepository.js';
import * as noteRepository from '../repositories/noteRepository.js';
import { toReactFlowGraph } from '../utils/graphUtils.js';

export const getGraph = async (userId) => {
  const nodes = await noteRepository.getAllVisibleNotes(userId);
  const edges = await edgeRepository.getAllEdgesForUser(userId);
  return toReactFlowGraph(nodes, edges);
};

export const createEdge = async ({ source_note_id, target_note_id, relation_type }, userId) => {
  const source = await noteRepository.getNoteById(source_note_id);
  const target = await noteRepository.getNoteById(target_note_id);
  if (!source || !target) {
    const err = new Error('Source or target note not found');
    err.status = 404;
    throw err;
  }
  if (source.author_id !== userId && target.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  const edge = await edgeRepository.createEdge({
    sourceNoteId: source_note_id,
    targetNoteId: target_note_id,
    relationType: relation_type
  });
  return edge;
};

export const deleteEdge = async (edgeId, userId) => {
  const edge = await edgeRepository.getEdgeById(edgeId);
  if (!edge) {
    const err = new Error('Edge not found');
    err.status = 404;
    throw err;
  }
  const source = await noteRepository.getNoteById(edge.source_note_id);
  const target = await noteRepository.getNoteById(edge.target_note_id);
  if (source?.author_id !== userId && target?.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  await edgeRepository.deleteEdge(edgeId);
};

