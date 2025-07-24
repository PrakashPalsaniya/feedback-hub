const Feedback = require("../../models/feedback.js");


const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = `AIzaSyCopSZ-lFsW92tCDlJId8tVgLE5pD2eXGA`;


handleSubmitFeedback = async (req, res) => {
  const { pageId, content, category } = req.body;
  if (!pageId || !content) {
    return res.status(400).json({ message: "Missing feedback data" });
  }
  try {
    const feedback = new Feedback({ pageId, content, category });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};


 handleAnalyzeSentiment = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "No text provided" });

  try {
    const prompt = `
Analyze the following user feedback:

"${text}"

Give structured output:
- tone: (positive, neutral, negative)
- behavior: (emotion or attitude expressed)
- insights: (3 bullet points)
- suggestions: (for improvement)
- summary: (1-2 line summary)

Respond in JSON format only.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    // Attempt to extract and parse JSON (handles markdown cases too)
    let parsed;
    try {
      const jsonText = rawText.match(/```json([\s\S]*?)```/)?.[1] || rawText;
      parsed = JSON.parse(jsonText.trim());
    } catch (e) {
      return res.status(500).json({ message: "Parsing failed", raw: rawText });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Gemini Flash Error:", err?.response?.data || err.message);
    res.status(500).json({ message: "Gemini Flash API failed", error: err.message });
  }
};

module.exports = {
  handleSubmitFeedback,
  handleAnalyzeSentiment
  };
