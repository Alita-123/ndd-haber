import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const KATEGORILER = ['Siyaset', 'Jeopolitik', 'Ekonomi', 'Teknoloji'] as const;

const makaleler = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/makaleler' }),
  schema: z.object({
    baslik: z.string(),
    ozet: z.string(),
    tarih: z.coerce.date(),
    kategori: z.enum(KATEGORILER),
    yazar: z.string().default('NDD Editör'),
    gorsel: z.string().optional(),
    gorsel_alt: z.string().optional(),
    one_cikan: z.boolean().default(false),
    taslak: z.boolean().default(false),
    kaynaklar: z
      .array(z.object({ yayin: z.string(), baslik: z.string().optional(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { makaleler };
