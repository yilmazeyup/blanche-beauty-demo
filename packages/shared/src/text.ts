import type { Locale } from './locales';

export type Segment = { text: string; accent: boolean };

/** Splits "Tijd voor je *wimperlift*." into plain and accented parts. */
export function splitAccents(text: string): Segment[] {
  return text
    .split('*')
    .map((part, index) => ({ text: part, accent: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

/** Lower-cases the first letter so a name can sit mid-sentence; German nouns and Arabic stay as they are. */
export function inSentence(name: string, locale: Locale): string {
  if (locale === 'de' || locale === 'ar' || name.length === 0) return name;
  return name.charAt(0).toLocaleLowerCase(locale) + name.slice(1);
}
