

export default async function handler(req, res) {
  // ✅ Always set CORS headers first
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Handle POST request
  if (req.method === "POST") {
    try {
      const userMessage = req.body.message || "";
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Missing Gemini API Key" });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Jonaki, an Assamese cultural guide. Prefer to respond in Assamese politely, but understand English if needed. Focus only on Assamese culture, heritage, or history.\n\nUser: ${userMessage}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "মাফ কৰক, মই এতিয়া উত্তৰ দিব পৰা নাই।";

      return res.status(200).json({ reply });
    } catch (error) {
      console.error("Gemini error:", error);
      return res.status(500).json({ error: "Proxy failed", details: error.message });
    }
  }

  // ❌ Method not allowed
  res.status(405).json({ error: "Method not allowed" });
}
