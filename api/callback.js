// GitHub OAuth dönüş adresi: kodu token'a çevirir ve Decap CMS penceresine iletir.
function page(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  return `<!doctype html><html lang="tr"><meta charset="utf-8"><title>Giriş</title>
<body style="font-family:system-ui;padding:2rem;color:#16202e">
<p>${status === 'success' ? 'Giriş başarılı, pencere kapanıyor…' : 'Giriş başarısız oldu.'}</p>
<script>
(function () {
  var msg = ${JSON.stringify(message)};
  function receive(e) {
    window.opener.postMessage(msg, e.origin);
    window.removeEventListener('message', receive, false);
    setTimeout(function () { window.close(); }, 300);
  }
  window.addEventListener('message', receive, false);
  window.opener && window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
}

export default async function handler(req, res) {
  const { code, state } = req.query;
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').map((c) => c.trim().split('=')).filter((p) => p.length === 2),
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Set-Cookie', 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0');

  if (!code || !state || state !== cookies.oauth_state) {
    res.status(400).send(page('error', { message: 'Geçersiz oturum durumu. Lütfen tekrar deneyin.' }));
    return;
  }

  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });
    const data = await r.json();
    if (data.error || !data.access_token) {
      res.status(401).send(page('error', { message: data.error_description || data.error || 'Token alınamadı' }));
      return;
    }
    res.status(200).send(page('success', { token: data.access_token, provider: 'github' }));
  } catch (e) {
    res.status(500).send(page('error', { message: 'Sunucu hatası' }));
  }
}
