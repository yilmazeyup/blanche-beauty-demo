import type { BlanchePhoto } from '@blanche/shared';

// The member app's photos, bundled once more for the panel (client cards, the social grid).
const FILES = import.meta.glob('../../app/assets/photos/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

export function photoUrl(key: BlanchePhoto): string {
  return FILES[`../../app/assets/photos/${key}.jpg`] ?? '';
}
