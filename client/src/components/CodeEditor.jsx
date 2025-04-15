import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const CodeEditor = ({ onAnalyze }) => {
  const [code, setCode] = useState("// Type your code here...");
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (code.trim()) onAnalyze(code, language);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl shadow-2xl overflow-hidden border border-neutral-700 bg-neutral-900 flex flex-col h-[500px] max-w-4xl mx-auto">
    
      <div className="flex items-center px-4 py-2 bg-neutral-800 border-b border-neutral-700">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <span className="ml-4 text-white text-sm font-medium flex-grow text-center">
          VS Code – index.{language.toLowerCase()}
        </span>

        <button
          onClick={handleCopy}
          className="text-xs text-gray-300 hover:text-white flex items-center gap-1"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-neutral-700 text-white text-sm px-3 py-1 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded shadow"
        >
          Analyze Code
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            autoClosingBrackets: "always",
            fixedOverflowWidgets: true,
            fontFamily: "Menlo, Monaco, 'Courier New', monospace",
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-neutral-800 text-gray-400 text-xs border-t border-neutral-700 flex justify-between">
        <span>UTF-8</span>
        <span>Spaces: 2</span>
        <span>{language.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default CodeEditor;
