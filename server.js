/* ============================================================
   Gizli Madde — Sunucu
   Kullanıcı asla API anahtar girmez. Anahtar SUNUCUDA kalır.
   Sağlayıcılar sırayla denenir: Gemini → OpenRouter → OpenAI
   Kullanım:  GOOGLE_API_KEY=... node server.js
   Tarayıcı:  http://localhost:3000
   ============================================================ */

const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

/* ---------- Sağlayıcı listesi (sırayla denenir) ---------- */
function buildProviders() {
  const list = [];

  const GEM = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "";
  if (GEM) list.push({
    name: "gemini",
    url: `https://generativelanguage.googleapis.com/v1beta/models/${process.env.MODEL || "gemini-3.8-flash"}:generateContent?key=${GEM}`,
    build: (p) => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: p }] }],
        generationConfig: { response_mime_type: "application/json", temperature: 0.3 }
      })
    }),
    read: (j) => j.candidates?.[0]?.content?.parts?.[0]?.text || "",
    err:  (j) => j.error?.message || ""
  });

  const OR = process.env.OPENROUTER_API_KEY || "";
  if (OR) {
    // 1) Hızlı model (reasoning yok, düşük gecikme) — önce o denenir
    list.push({
      name: "openrouter-hizli",
      url: "https://openrouter.ai/api/v1/chat/completions",
      build: (p) => ({
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OR}` },
        body: JSON.stringify({
          model: process.env.FAST_MODEL || "poolside/laguna-s-2.1:free",
          temperature: 0.3,
          messages: [{ role: "user", content: p }],
          response_format: { type: "json_object" }
        })
      }),
      read: (j) => j.choices?.[0]?.message?.content || "",
      err:  (j) => j.error?.message || ""
    });
    // 2) Yedek: ücretsiz otomatik router (hızlı model çekilirse devreye girer)
    list.push({
      name: "openrouter",
      url: "https://openrouter.ai/api/v1/chat/completions",
      build: (p) => ({
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OR}` },
        body: JSON.stringify({
          model: "openrouter/free",
          temperature: 0.3,
          messages: [{ role: "user", content: p }],
          response_format: { type: "json_object" }
        })
      }),
      read: (j) => j.choices?.[0]?.message?.content || "",
      err:  (j) => j.error?.message || ""
    });
  }

  const OA = process.env.OPENAI_API_KEY || "";
  if (OA) list.push({
    name: "openai",
    url: "https://api.openai.com/v1/chat/completions",
    build: (p) => ({
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OA}` },
      body: JSON.stringify({
        model: process.env.MODEL || "gpt-4o-mini",
        temperature: 0.3,
        messages: [{ role: "user", content: p }],
        response_format: { type: "json_object" }
      })
    }),
    read: (j) => j.choices?.[0]?.message?.content || "",
    err:  (j) => j.error?.message || ""
  });

  return list;
}
const PROVIDERS = buildProviders();

/* Basit hız sınırıcı: IP başına saatte 20 analiz */
const hits = new Map();
function limited(ip) {
  const now = Date.now(), h = hits.get(ip) || [];
  const fresh = h.filter(t => now - t < 3600e3);
  if (fresh.length >= 20) return true;
  fresh.push(now); hits.set(ip, fresh);
  return false;
}

const PROMPT = (text) => `Sen Türkiye'de 20 yıllık deneyimli bir tüketici ve kira hukuku uzmanısın. Aşağıdaki sözleşmeyi analiz et.

Amaç: Sıradan bir vatandaşın bu sözleşmeyi imzalayacağı zaman cüzdanından para kaybedeceği, hak kaybı yaşayacağı maddeleri BUL ve açıkla.

ÇIKTI KURALLARI (kesin):
- SADECE geçerli JSON döndür. Kod bloğu, yorum, açıklama ekleme.
- HER ŞEY TAMAMEN TÜRKÇE olacak: madde adları, açıklamalar, öneriler, özet. Tek bir İngilizce kelime bile yazma (örn. "landlord", "clause", "referral" YASAK). Kavramları Türkçe karşılığıyla yaz (landlord → ev sahibi, clause → madde).
- "explain" alanını sıradan bir vatandaşın anlayacağı dille, argo kullanmadan yaz.

Şema:
{
  "riskScore": 0-100 arası integer (düşük risk = yüksek puan),
  "headline": "tek cümlelik genel değerlendirme (Türkçe)",
  "totalLoss": "tahmini parasal risk (örn: 'Aylık 2.400 ₺ zam riski')",
  "clauses": [
    {
      "name": "madde başlığı/kısa adı (Türkçe)",
      "severity": "high" | "mid" | "low",
      "quote": "sözleşmeden birebir alıntılanan madde (metindeki haliyle)",
      "explain": "bu madde neden tehlikeli, sıradan dille 2-3 cümle, TAMAMEN TÜRKÇE",
      "fix": "müzakere ederken ne diyeceksin / ne isteyeceksin, TAMAMEN TÜRKÇE"
    }
  ],
  "summary": "genel görüş ve ne yapmalı, 3-4 cümle, TAMAMEN TÜRKÇE"
}

En az 3, en fazla 8 madde bul. Yüksek öncelik: gizli zam, otomatik yenileme, fesih/ceza, depozito/kesinti, tek taraflı hak, garanti dışı tutma, gizli komisyon.

SÖZLEŞME:
"""${text}"""`;

/* ---------- Analiz: sağlayıcıları sırayla dene ---------- */
function fetchTimeout(url, opts, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(t));
}

async function runAnalysis(text) {
  if (!PROVIDERS.length) throw Object.assign(new Error("Sunucuda AI anahtarı tanımlı değil."), { code: "NOKEY" });
  const errors = [];

  for (const p of PROVIDERS) {
    try {
      const r = await fetchTimeout(p.url, p.build(PROMPT(text)), 45000); // sağlayıcı başına 45 sn
      const j = await r.json();

      if (!r.ok) {
        const msg = p.err(j) || `AI hatası (${r.status})`;
        errors.push(`${p.name}: ${msg}`);
        continue; // bakiye/hata → sıradaki sağlayıcı
      }

      const raw = p.read(j).replace(/```json|```/g, "").trim();
      if (!raw) { errors.push(`${p.name}: boş yanıt`); continue; }
      return JSON.parse(raw);
    } catch (e) {
      errors.push(`${p.name}: ${e.name === "AbortError" ? "zaman aşımı (45 sn)" : e.message}`);
    }
  }
  throw Object.assign(new Error("Tüm AI servisleri başarısız: " + errors.join(" | ")), { code: "AIFAIL" });
}

http.createServer(async (req, res) => {
  /* --- Analiz ucu --- */
  if (req.method === "POST" && req.url === "/api/analyze") {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "?";

    if (!PROVIDERS.length) return json(res, 500, { error: "Sunucuda AI anahtarı tanımlı değil." });
    if (limited(ip)) return json(res, 429, { error: "Saatte en fazla 20 analiz. Lütfen biraz bekleyin." });

    let body = "";
    req.on("data", c => body += c);
    req.on("end", async () => {
      try {
        const { text } = JSON.parse(body || "{}");
        if (!text || text.trim().length < 20)
          return json(res, 400, { error: "Sözleşme metni çok kısa." });
        if (text.length > 60000)
          return json(res, 400, { error: "Metin çok uzun (maks 60.000 karakter)." });

        const out = await runAnalysis(text);
        json(res, 200, out);
      } catch (e) {
        json(res, e.code === "NOKEY" ? 500 : 502, { error: e.message });
      }
    });
    return;
  }

  /* --- Sağlayıcı durumu (UI için) --- */
  if (req.method === "GET" && req.url === "/api/status") {
    return json(res, 200, {
      key: PROVIDERS.length > 0,
      providers: PROVIDERS.map(p => p.name),
      provider: PROVIDERS[0]?.name || "none"
    });
  }

  /* --- Statik dosya --- */
  const file = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const fp = path.join(__dirname, path.normalize(file).replace(/^(\.\.[\/\\])+/, ""));
  const MIME = {
    ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8",
    ".css":"text/css; charset=utf-8", ".json":"application/json; charset=utf-8",
    ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".gif":"image/gif",
    ".svg":"image/svg+xml", ".ico":"image/x-icon", ".webp":"image/webp",
    ".txt":"text/plain; charset=utf-8", ".xml":"application/xml; charset=utf-8",
    ".webmanifest":"application/manifest+json", ".pdf":"application/pdf"
  };
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type":"text/plain; charset=utf-8" }); return res.end("Bulunamadı"); }
    const ext = path.extname(fp).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    // index.html her zaman taze; statik varlıklar uzun süre cache'lenir
    const cache = (ext === ".html" || ext === ".json")
      ? "no-cache, no-store, must-revalidate"
      : "public, max-age=604800";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": cache });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`🔍  Gizli Madde çalışıyor → http://localhost:${PORT}`);
  console.log(`🤖  Sağlayıcılar: ${PROVIDERS.length ? PROVIDERS.map(p => p.name).join(" → ") : "YOK"}`);
  if (!PROVIDERS.length)
    console.log("⚠️  ANAHTAR YOK!  Örnek:  OPENROUTER_API_KEY=sk-or-... node server.js");
});

function json(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
}
