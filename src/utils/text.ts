/**
 * Formats French text to adhere to French typography rules
 * and avoid isolated orphan punctuation marks on new lines (e.g. ' ?', ' !', ' :', ' ;').
 */
export function formatFrenchText(text: string): string {
  if (!text) return '';
  return text.replace(/\s+([?!:;])/g, '\u00A0$1');
}
