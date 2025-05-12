export default async function handler(req, res) {
  // Allow CORS from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwRcNLkpYsV1bNK7IGFneEP_H5avjvtRVFnQwaR5wu2PCDqNVBpq2PbAgkQBfR7LEsH/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });

      const data = await response.text(); // or .json() if you return JSON
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ error: "Proxy failed", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

