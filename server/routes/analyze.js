// server/routes/analyze.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { generatePrompt } = require("../utils/prompt");

router.post("/", async (req, res) => {
  const { code, language } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: "Missing code or language" });
  }

  const prompt = generatePrompt(code, language);
  const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent";
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
    res.json({ result });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

module.exports = router;
