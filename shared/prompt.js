// shared/prompt.js
function generatePrompt(code, language) {
    return `
  Analyze the time complexity of the following ${language} code:
  \`\`\`${language}
  ${code}
  \`\`\`
  Only give:
  1. The Big-O time complexity
  2. A short explanation (6-8 lines)
    `;
}

module.exports = { generatePrompt };
  