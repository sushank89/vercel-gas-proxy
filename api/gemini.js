export default async function handler(req, res) {
  const { message } = req.body;

  const geminiKey = process.env.GEMINI_API_KEY; // secure key from environment

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AIzaSyDqd0iJI6UpkS-fnGkB3lZIdyHlYx9ZYsk}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are Jonaki, an Assamese cultural guide. Prefer to respond in Assamese politely, but understand English if needed. Focus only on Assamese culture, heritage, or history.\n\nUser: ${message}`
        }]
      }]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
