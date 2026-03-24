import * as searchRepository from '../repositories/searchRepository.js';

export const searchNotes = async (query, userId) => {
  if (!query || !query.trim()) {
    return [];
  }
  return searchRepository.searchNotes(query, userId);
};

