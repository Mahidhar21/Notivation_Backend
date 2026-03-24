import { mockFormatMarkdown } from '../utils/markdownUtils.js';

export const formatTextToMarkdown = async (text) => {
  return mockFormatMarkdown(text || '');
};

