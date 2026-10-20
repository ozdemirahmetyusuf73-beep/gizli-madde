export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();

  const GEM = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "";
  const OR  = process.env.OPENROUTER_API_KEY || "";
  const OA  = process.env.OPENAI_API_KEY || "";

  let provider = "none";
  if (GEM) provider = "gemini";
  else if (OR && !OA) provider = "openrouter";
  else if (OA) provider = "openai";

  const MODEL =
    process.env.MODEL ||
    (provider === "gemini" ? "gemini-3.8-flash" : "gpt-4o-mini");

  res.status(200).json({ key: provider !== "none", model: MODEL, provider });
}
