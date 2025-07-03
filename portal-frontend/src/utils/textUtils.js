export const truncateWords = (text, maxWords = 50) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + " ..."
    : text;
};