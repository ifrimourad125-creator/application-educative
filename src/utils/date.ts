/**
 * Date helpers used by progression rules.
 *
 * We deliberately use the user's local calendar date rather than UTC so that
 * daily streaks change at local midnight, not at midnight UTC.
 */
export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPreviousLocalDateKey(date: Date = new Date()): string {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);
  return getLocalDateKey(previous);
}
