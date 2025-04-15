import React, { useState } from "react";
import { FileUpload } from "../components/ui/file-upload";

export function FileUploadDemo({ onAnalyze }) {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (newFiles) => {
    setFiles(newFiles);
  };

  const analyzeFile = async () => {
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      onAnalyze(content); // send to parent
    };

    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-96 border border-dashed border-blue-900 rounded-lg p-4">
      <FileUpload onChange={handleFileUpload} />
      {files.length > 0 && (
        <button
          onClick={analyzeFile}
          className="mt-4 px-4 py-2 mx-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Analyze File
        </button>
      )}
    </div>
  );
}
