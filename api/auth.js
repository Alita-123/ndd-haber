// Decap CMS için GitHub OAuth başlatıcı (Vercel serverless fonksiyonu).
// Gerekli ortam değişkenleri: OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET
import { randomBytes } from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('OAUTH_CLIENT_ID tanımlı değil. Vercel > Settings > Environment Variables bölümünden ekleyin.');
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirectUri = `https://${host}/api/callback`;
  const state = randomBytes(16).toString('hex');

  res.setHeader('Set-Cookie', `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state,
  });
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
