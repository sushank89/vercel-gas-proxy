export default async function handler(req, res) {
  // ✅ Always send CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Respond to preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Handle POST request
  if (req.method === "POST") {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbym57J96D-Yhjt3bEyOoDrrojPedIqqFxG7H62NlaezJLy7dGFXMLAC7VqYlpNtEJW9/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Proxy failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
