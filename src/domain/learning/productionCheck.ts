/** Normalize free-text answers for offline production checks. */
export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Loose match: exact normalized equality, or expected contained in answer
 * (or vice-versa) when both sides have enough substance.
 */
export function answersMatch(expected: string, actual: string): boolean {
  const left = normalizeAnswer(expected);
  const right = normalizeAnswer(actual);
  if (!left || !right) return false;
  if (left === right) return true;
  if (left.length >= 4 && right.includes(left)) return true;
  if (right.length >= 4 && left.includes(right)) return true;

  const leftTokens = new Set(left.split(" ").filter((token) => token.length > 2));
  const rightTokens = right.split(" ").filter((token) => token.length > 2);
  if (!leftTokens.size || !rightTokens.length) return false;
  const overlap = rightTokens.filter((token) => leftTokens.has(token)).length;
  return overlap / leftTokens.size >= 0.6;
}
