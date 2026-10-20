# Ne Dedi Ne Dedi? (NDD)

Yabancı basında Türkiye: siyaset, jeopolitik, ekonomi ve teknoloji analizleri.

- Site: Astro (Vercel'de otomatik derlenir)
- Yönetim paneli: `siteadresi/admin` (Decap CMS) — makale yazıp **Yayınla**'ya basmak yeterli
- Makaleler `src/content/makaleler/` altında Markdown olarak saklanır; panel bunları GitHub'a kaydeder, Vercel otomatik yayınlar

## Panel girişi için tek seferlik kurulum

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://SITE-ADRESINIZ`
   - Authorization callback URL: `https://SITE-ADRESINIZ/api/callback`
2. Oluşan **Client ID** ve **Client Secret** değerlerini Vercel → Project → Settings → Environment Variables bölümüne ekleyin:
   `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`
3. Vercel'de Redeploy yapın.
4. İsteğe bağlı: kendi alan adınız için `SITE_URL` değişkenini ekleyin.
