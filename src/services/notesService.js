import * as noteRepository from '../repositories/noteRepository.js';
import * as edgeRepository from '../repositories/edgeRepository.js';
import { paginate } from '../utils/pagination.js';
import { bfsNeighbors, bfsExplore } from '../utils/graphUtils.js';
import { VISIBILITY } from '../constants/visibility.js';

export const getNotes = async ({ userId, page = 1, limit = 20 }) => {
  const { offset, pageSize } = paginate(page, limit);
  const rows = await noteRepository.getNotesWithFilters({
    userId,
    offset,
    limit: pageSize
  });
  return { items: rows, page: Number(page), limit: pageSize };
};

export const createNote = async ({ title, content, tags = [], visibility, authorId }) => {
  const note = await noteRepository.createNote({
    title,
    content,
    visibility: visibility || VISIBILITY.PRIVATE,
    authorId
  });
  if (tags.length) {
    await noteRepository.setTagsForNote(note.id, tags);
  }
  const withTags = await noteRepository.getNoteByIdWithTags(note.id, authorId);
  return withTags;
};

export const getNoteById = async (id, userId) => {
  const note = await noteRepository.getNoteByIdWithTags(id, userId);
  if (!note) {
    const err = new Error('Note not found');
    err.status = 404;
    throw err;
  }
  if (note.visibility === VISIBILITY.PRIVATE && note.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  return note;
};

export const updateNote = async (id, userId, data) => {
  const existing = await noteRepository.getNoteById(id);
  if (!existing) {
    const err = new Error('Note not found');
    err.status = 404;
    throw err;
  }
  if (existing.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  const { title, content, visibility, tags } = data;
  await noteRepository.updateNote(id, {
    title,
    content,
    visibility
  });
  if (tags) {
    await noteRepository.setTagsForNote(id, tags);
  }
  const withTags = await noteRepository.getNoteByIdWithTags(id, userId);
  return withTags;
};

export const deleteNote = async (id, userId) => {
  const existing = await noteRepository.getNoteById(id);
  if (!existing) {
    const err = new Error('Note not found');
    err.status = 404;
    throw err;
  }
  if (existing.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  await edgeRepository.deleteEdgesForNote(id);
  await noteRepository.deleteNote(id);
};

export const forkNote = async (id, userId) => {
  const note = await noteRepository.getNoteById(id);
  if (!note) {
    const err = new Error('Note not found');
    err.status = 404;
    throw err;
  }
  if (note.visibility === VISIBILITY.PRIVATE && note.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  const forked = await noteRepository.createNote({
    title: note.title,
    content: note.content,
    visibility: VISIBILITY.PRIVATE,
    authorId: userId,
    forkedFrom: note.id
  });
  const tags = await noteRepository.getTagsForNote(id);
  if (tags.length) {
    await noteRepository.setTagsForNote(
      forked.id,
      tags.map((t) => t.name)
    );
  }
  const withTags = await noteRepository.getNoteByIdWithTags(forked.id, userId);
  return withTags;
};

export const getNeighbors = async (noteId, userId) => {
  const graph = await edgeRepository.getGraphForUser(userId);
  return bfsNeighbors(graph, noteId);
};

export const exploreGraph = async (noteId, depth, userId) => {
  const graph = await edgeRepository.getGraphForUser(userId);
  return bfsExplore(graph, noteId, depth);
};

