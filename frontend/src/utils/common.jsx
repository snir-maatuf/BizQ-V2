export function isHebrew(string) {
  if (!string) return;
  // Regular expression to match Hebrew characters
  const hebrewPattern = /[\u0590-\u05FF]/;
  return hebrewPattern.test(string);
}
