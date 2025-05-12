export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://script.google.com/macros/library/d/1U4mWx1eyqEUDm1dOPzOxw5iDM-eUWca78-u-Z_5vUVQYNga3Fwo1nIwF/2", {
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
