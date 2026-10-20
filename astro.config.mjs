import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Yayın adresiniz belli olunca SITE_URL ortam değişkenini Vercel'de tanımlayın
// (ör. https://nededinededi.com). Tanımlı değilse Vercel adresi kullanılır.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://ndd-haber.vercel.app');

export default defineConfig({
  site,
  integrations: [sitemap()],
  markdown: { smartypants: true },
});
