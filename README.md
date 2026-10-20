# 🔍 Gizli Madde

Sözleşmeyi yükle → 30 saniyede hangi maddede para kaybedeceğini gösterir.
İmzalamadan önce gizli maddeleri gör.

**Anahtar kullanıcıda değil, SUNUCUDA.** Kullanıcı hiçbir API anahtarı girmiyor; yapay zeka otomatik çalışıyor.

## Özellikler

- **📎 PDF / Word / TXT yükleme** — dosya seç ya da sürükle-bırak; PDF ve .docx istemcide ayrıştırılır (sunucuya gönderilmez)
- **📷 Fotoğraf / Görsel → metin (OCR)** — telefonla çek, yapay zeka Türkçe metne çevirir; **görsel asla sunucuya gönderilmez** (yaşlı ve bilmeyenler için)
- **🗺️ Sözleşme Haritası** — orijinal metnin içinde tehlikeli maddeler kırmızı/amber/yeşil işaretli; işarete tıklayınca ilgili açıklamaya atlar
- **✅ Alıntı doğrulama** — her maddenin alıntısının sözleşmenin kendi metninde birebir bulunup bulunmadığını gösterir (güven)
- **📊 İstatistik şeridi** — risk puanı, yüksek/orta riskli madde sayısı
- **🎟️ Kullandıkça öde** — 1 kredi = 1 analiz + 1 PDF rapor. 3 kredi 39₺, 10 kredi 99₺, 15 kredi 129₺ (taahhüt yok, 6 ay geçerli)
- **🔒 PDF İndir / Yazdır** — Pro'ya ait (99₺/ay) ya da krediyle
- **📚 Sözleşme geçmişi** — daha önce taranan sözleşmeler, tek tıkla geri yükle (Pro)
- **✍️ İmza öncesi kontrol listesi** — 7 soruluk interaktif liste (tarayıcıda saklanır)
- **🛡️ Güven bölümü** — "sözleşmen saklanmaz", KVKK, açık metodoloji, dürüst sınırlar
- **📤 Viral paylaşım** — WhatsApp / X / Telegram / Instagram / 1080×1080 sonuç kartı / davet linki (`?ref=`)
- **🎴 Örnek kira sözleşmesi** — tek tıkla test

## Fiyatlandırma

| Plan | Fiyat | Ne verir |
|---|---|---|
| **Ücretsiz** | 0₺ | Ayda 3 analiz, tüm raporlar, PDF/fotoğraf yükleme, paylaşım |
| **Kullandıkça Öde** | 19₺/kredi | 1 kredi = 1 analiz + 1 PDF. 3/10/15 kredi paketleri. Taahhüt yok |
| **Pro** | 99₺/ay | Sınırsız analiz + sınırsız PDF + geçmiş |
| **Ofis** | 399₺/ay | Pro + beyaz etiket, 5 kullanıcı, API |

## Teknik notlar
- PDF ayrıştırma: [pdf.js](https://github.com/mozilla/pdf.js) · DOCX: [mammoth.js](https://github.com/mwilliamson/mammoth.js) · OCR: [tesseract.js](https://github.com/naptha/tesseract.js) (Türkçe, `tur`)
- Üçü de **istemci tarafında** çalışır ve CDN'den geç yüklenir → sayfa hızlı açılır, veri dışarı çıkmaz.
- `server.js` **hiç npm bağımlılığı yok** → deploy için build adımı gerekmez.
- Sağlayıcı zinciri: **OpenRouter (hızlı) → OpenRouter (ücretsiz router) → OpenAI**
- Ödeme henüz bağlı değil: Pro/kredi `localStorage` ile demo olarak çalışır (`soz_pro`, `soz_credits_v1`).

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

Sunucu olmadan da çalışır — kullanıcı kendi anahtarını girer (yedek mod).

## Render'a Yayınlama (5 adım)

Render'ın ücretsiz planı **ticari kullanıma açıktır** (Vercel Hobby'nin "kişisel kullanım" kısıtı yok) ve gerçek bir sunucu çalıştırdığı için 30sn'lik analizde timeout olmaz.

1. **GitHub deposu:** `gizli-madde` (bu klasör `git init` ile hazırlandı, ilk commit atıldı)
2. **Render hesabı:** https://render.com → **GitHub ile giriş**
3. **Yeni servis:**
   - Dashboard → **New +** → **Blueprint** → repo'yu seç → `render.yaml` otomatik okunur
   - Veya **Web Service** → repo → Build Command: *(boş)* · Start Command: `npm start` · Instance: **Free**
4. **Ortam değişkeni:**
   - Environment Variables → `OPENROUTER_API_KEY` = `sk-or-v1-...`
   - (isteğe bağlı) `FAST_MODEL` = `poolside/laguna-s-2.1:free`
5. **Deploy** → birkaç dakika → `https://gizli-madde.onrender.com`

> ⚠️ **Ücretsiz plan uykuya girer** (15 dk hareketsizlik sonrası). İlk istek ~30-60 sn sürebilir — "Servis uyanıyor" mesajı gösterilebilir.
> 🔁 Her `git push` otomatik deploy tetikler (`autoDeploy: true`).

## Faydalı Bağlantılar

- OpenRouter anahtarı: https://openrouter.ai/keys
- OpenAI anahtarı (yedek): https://platform.openai.com/api-keys
- Render env ayarı: https://render.com → servisin → Environment
- Model karşılaştırma: `node test-models.js`

## Dosyalar

```
index.html      → Arayüz + harita + OCR + kredi/Pro + viral paylaşım
server.js       → Render'de çalışan sunucu (bağımlılıksız, anahtar burada kalır)
render.yaml     → Render Blueprint (env değişkenleri dahil)
api/analyze.js  → Vercel alternatifi (serverless analiz)
api/status.js   → Vercel alternatifi (sunucu durumu)
vercel.json     → Vercel ayarları (opsiyonel)
test-models.js  → ücretsiz model karşılaştırma (modeller dönerse çalıştır)
```
