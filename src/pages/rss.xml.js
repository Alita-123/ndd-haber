import rss from '@astrojs/rss';
import { yayindakiMakaleler } from '../lib/util';

export async function GET(context) {
  const makaleler = await yayindakiMakaleler();
  return rss({
    title: 'Ne Dedi Ne Dedi?',
    description: 'Yabancı basında Türkiye: siyaset, jeopolitik, ekonomi ve teknoloji analizleri.',
    site: context.site,
    items: makaleler.map((m) => ({
      title: m.data.baslik,
      description: m.data.ozet,
      pubDate: m.data.tarih,
      link: `/makale/${m.id}/`,
      categories: [m.data.kategori],
    })),
    customData: '<language>tr-tr</language>',
  });
}
