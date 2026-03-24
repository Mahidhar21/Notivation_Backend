import * as tagRepository from '../repositories/tagRepository.js';
import * as noteRepository from '../repositories/noteRepository.js';

export const getTags = async () => {
  return tagRepository.getAllTags();
};

export const createTag = async ({ name }) => {
  const existing = await tagRepository.findByName(name);
  if (existing) {
    return existing;
  }
  return tagRepository.createTag({ name });
};

export const addTagsToNote = async (noteId, tags, userId) => {
  const note = await noteRepository.getNoteById(noteId);
  if (!note) {
    const err = new Error('Note not found');
    err.status = 404;
    throw err;
  }
  if (note.author_id !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  await noteRepository.setTagsForNote(noteId, tags);
  const noteWithTags = await noteRepository.getNoteByIdWithTags(noteId, userId);
  return { note: noteWithTags };
};

