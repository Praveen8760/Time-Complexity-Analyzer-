// shared/prompt.js
function generatePrompt(code, language) {
    return `
Analyze the time complexity of the following ${language} code:
\`\`\`${language}
${code}
\`\`\`

Provide the Big-O time complexity (e.g., O(1), O(N), O(N log N)) and a concise 6-8 line explanation of why this complexity is correct.
`;
}

module.exports = { generatePrompt };
  