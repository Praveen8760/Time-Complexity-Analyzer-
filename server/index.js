// server/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const analyzeRoute = require("./routes/analyze");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Apply rate limiter to all API routes to protect LLM resources
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many analysis requests from this IP, please try again after 15 minutes."
  }
});

app.use(cors());
app.use(express.json());

// Apply rate limiting specifically to api endpoints
app.use("/api", limiter);
app.use("/api/analyze", analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
