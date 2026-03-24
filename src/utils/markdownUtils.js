export const mockFormatMarkdown = (text) => {
  if (!text.trim()) {
    return '## Note\n\n_No content provided._';
  }
  const firstSentence = text.split(/[.!?]/)[0].trim();
  const title = firstSentence
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return `## ${title}\n\n${text}`;
};

