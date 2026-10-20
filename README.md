# 🔍 Gizli Madde

Sözleşmeyi yükle → 30 saniyede hangi maddede para kaybedeceğini gösterir.
İmzalamadan önce gizli maddeleri gör.

**Anahtar kullanıcıda değil, SUNUCUDA.** Kullanıcı hiçbir API anahtarı girmiyor; yapay zeka otomatik çalışıyor.

## Özellikler

- **📎 PDF / Word / TXT yükleme** — dosya seç ya da sürükle-bırak; PDF ve .docx istemcide ayrıştırılır (harici sunucuya gönderilmez)
- **📷 Fotoğraf / Görsel → metin (OCR)** — telefonla çek, yapay zeka Türkçe metne çevirir; **görsel asla sunucuya gönderilmez**, istemcide çalışır (yaşlı ve bilmeyenler için)
- **🗺️ Sözleşme Haritası** — orijinal metnin içinde tehlikeli maddeler kırmızı/amber/yeşil işaretli; işarete tıklayınca ilgili açıklamaya atlar
- **✅ Alıntı doğrulama** — her maddenin alıntısının sözleşmenin kendi metninde birebir bulunup bulunmadığını gösterir (güven)
- **📊 İstatistik şeridi** — risk puanı, yüksek/orta riskli madde sayısı
- **🔒 PDF İndir / Yazdır (Pro)** — analizi PDF'e çevirip indir; Pro'ya ait (99₺/ay)
- **✍️ İmza öncesi kontrol listesi** — 7 soruluk interaktif liste (tarayıcıda saklanır)
- **🛡️ Güven bölümü** — "sözleşmen saklanmaz", KVKK, açık metodoloji, dürüst sınırlar
- **📤 Viral paylaşım** — WhatsApp / X / Telegram / Instagram / 1080×1080 sonuç kartı / davet linki (`?ref=`)
- **🎴 Örnek kira sözleşmesi** — tek tıkla test

## Teknik notlar
- PDF ayrıştırma: [pdf.js](https://github.com/mozilla/pdf.js) · DOCX: [mammoth.js](https://github.com/mwilliamson/mammoth.js) · OCR: [tesseract.js](https://github.com/naptha/tesseract.js) (Türkçe, `tur`)
- Üçü de **istemci tarafında** çalışır ve CDN'den geç yüklenir → sayfa hızlı açılır, veri dışarı çıkmaz.
- PDF indirme Pro ile sınırlıdır; `localStorage` anahtarı `soz_pro` (ödeme entegrasyonu hazır olduğunda gerçek satın almaya bağlanır).

## Yerel test

```powershell
# 1. API anahtarını ver (OpenRouter — kart şartı yok, günde 50 ücretsiz istek)
$env:OPENROUTER_API_KEY = "sk-or-v1-..."
$env:PORT = "3000"

# 2. Çalıştır
node server.js

# 3. Tarayıcıda aç
# http://localhost:3000
```

Sağlayıcı zinciri: **OpenRouter (hızlı) → OpenRouter (ücretsiz router) → OpenAI**
Bunlar otomatik sırayla denenir; biri ölünce diğerine geçilir.

Sunucu olmadan da çalışır — kullanıcı kendi anahtarını girer (yedek mod).

## Vercel'e Yayına Alma (5 adım)

1. **Vercel hesabı:** https://vercel.com (Google hesabıyla giriş)
2. **CLI kur:**
   ```bash
   npm i -g vercel
   ```
3. **Proje klasöründe yayına al:**
   ```bash
   cd sozlesme-katili
   vercel
   ```
   (ilk seferinde sorular çıkar → hepsine Enter)
4. **API anahtarını ekle:**
   - https://vercel.com → projen → **Settings → Environment Variables**
   - `OPENROUTER_API_KEY` = `sk-or-v1-...`
   - **Redeploy** et
5. **Ücretsiz domain:**
   - Proje → **Settings → Domains**
   - `gizlimadde.vercel.app` zaten var
   - Özel domain için: `.com` ~10$/yıl, `.com.tr` (~300₺/yıl, belge ister)

## Faydalı Bağlantılar

- OpenRouter anahtarı: https://openrouter.ai/keys
- OpenAI anahtarı (yedek): https://platform.openai.com/api-keys
- Vercel env ayarı: https://vercel.com → projen → Settings → Environment Variables
- Domain: https://vercel.com → projen → Settings → Domains

## Dosyalar

```
index.html      → Arayüz + harita + doğrulama + viral paylaşım
server.js       → Yerel sunucu (anahtar burada kalır)
api/analyze.js  → Vercel serverless analiz
api/status.js   → Vercel sunucu durumu
vercel.json     → Vercel ayarları (maxDuration 60)
test-models.js  → ücretsiz model karşılaştırma (modeller dönerse çalıştır)
```
