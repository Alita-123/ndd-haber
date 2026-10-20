import { getCollection, type CollectionEntry } from 'astro:content';

export const formatDate = (d: Date) =>
  d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul' });

export const slugify = (k: string) =>
  k
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g');

/** Yayındaki (taslak olmayan) makaleler, en yeni en üstte. */
export async function yayindakiMakaleler(): Promise<CollectionEntry<'makaleler'>[]> {
  const all = await getCollection('makaleler', ({ data }) => !data.taslak);
  return all.sort((a, b) => b.data.tarih.valueOf() - a.data.tarih.valueOf());
}
