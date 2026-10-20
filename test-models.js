/* Ücretsiz modelleri GERÇEK analiz prompt'u ile test eder: hız + JSON + Türkçe
   Anahtarı ortam değişkeninden al:  $env:OPENROUTER_API_KEY="sk-or-v1-..."  */
const KEY = process.env.OPENROUTER_API_KEY || "";
if (!KEY) { console.error("OPENROUTER_API_KEY tanımlı değil."); process.exit(1); }

const CONTRACT = `KIRA SOZLESMESI
Madde 3: Kira bedeli aylik 15.000 TLdir. Her yil TUEFE artisinin 3 kati oraninda artirilir.
Madde 4: Kiraci 6 ay once bildirimde bulunmazsa sozlesme otomatik olarak bir yil yenilenmis sayilir.
Madde 6: Depozito olarak 2 aylik kira bedeli pesin alinir.
Madde 7: Kiraci erken fesih ederse kalan tum aylarin kirasini tazminat olarak odeyecektir.
Madde 10: Butun uyusmazliklar Istanbul mahkemelerinde gorulur.`;

const PROMPT = `Sen Türkiye'de 20 yıllık deneyimli bir tüketici ve kira hukuku uzmanısın. Aşağıdaki sözleşmeyi analiz et.

ÇIKTI KURALLARI (kesin):
- SADECE geçerli JSON döndür. Kod bloğu, yorum ekleme.
- HER ŞEY TAMAMEN TÜRKÇE olacak: madde adları, açıklamalar, öneriler, özet. Tek bir İngilizce kelime bile yazma.
- "explain" alanını sıradan bir vatandaşın anlayacağı dille yaz.

Şema:
{
  "riskScore": 0-100 arası INTEGER (düşük risk = yüksek puan),
  "headline": "tek cümlelik genel değerlendirme (Türkçe)",
  "totalLoss": "tahmini parasal risk (örn: 'Aylık 2.400 ₺ zam riski')",
  "clauses": [
    {
      "name": "madde başlığı/kısa adı (Türkçe)",
      "severity": "high" | "mid" | "low",
      "quote": "sözleşmeden birebir alıntılanan madde",
      "explain": "bu madde neden tehlikeli, 2-3 cümle, TAMAMEN TÜRKÇE",
      "fix": "müzakere ederken ne diyeceksin, TAMAMEN TÜRKÇE"
    }
  ],
  "summary": "genel görüş ve ne yapmalı, 3-4 cümle, TAMAMEN TÜRKÇE"
}

En az 3, en fazla 8 madde bul.

SÖZLEŞME:
"""${CONTRACT}"""`;

const MODELS = [
  "minimax/minimax-m3.1-flash:free",
  "nvidia/nemotron-3.5-super-vl:free",
  "poolside/laguna-s-2.1:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-31b-it:free", // response_format OLMADAN dene
];

async function testOne(model) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 40000);
  const t0 = Date.now();
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [{ role: "user", content: PROMPT }],
      }),
      signal: ctrl.signal,
    });
    const j = await r.json();
    const sec = ((Date.now() - t0) / 1000).toFixed(1);

    if (!r.ok) return { model, sec, ok: false, why: j.error?.message || r.status };

    const raw = j.choices[0].message.content;
    let d;
    try { d = JSON.parse(raw.replace(/```json|```/g, "").trim()); }
    catch (e) { return { model, sec, ok: false, why: "JSON PARSE: " + e.message }; }

    const s = d.riskScore;
    const cl = (d.clauses || []).length;
    const trkish = !/\b(landlord|clause|referral|agreement|tenant)\b/i.test(raw);
    return { model, sec, ok: true, score: s, clauses: cl, turkish: trkish, head: (d.headline||"").slice(0,50) };
  } catch (e) {
    return { model, sec: ((Date.now() - t0) / 1000).toFixed(1), ok: false, why: e.name === "AbortError" ? "40 sn ZAMAN ASIMI" : e.message };
  } finally { clearTimeout(t); }
}

(async () => {
  for (const m of MODELS) {
    const res = await testOne(m);
    console.log(JSON.stringify(res));
  }
})();
