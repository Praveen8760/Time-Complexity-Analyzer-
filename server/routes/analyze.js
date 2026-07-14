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
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              complexity: {
                type: "STRING",
                description: "The Big-O complexity notation, e.g. O(1), O(N), O(N log N)"
              },
              explanation: {
                type: "STRING",
                description: "A concise 6-8 line explanation describing the loops, recursion, or operational breakdown"
              }
            },
            required: ["complexity", "explanation"]
          }
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const textResult = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    let parsedResult;
    try {
      parsedResult = JSON.parse(textResult);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON output:", textResult);
      parsedResult = {
        complexity: "Unknown",
        explanation: "Failed to parse the structured time complexity response from the AI model."
      };
    }

    res.json(parsedResult);
  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

module.exports = router;
