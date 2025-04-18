import React, { useState } from "react";
import { FileUploadDemo } from "../components/dropFile";
import CodeEditor from "../components/CodeEditor";
import ResultModal from "../components/ResultModal";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Analyzer = () => {
  const [result, setResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("editor");

  const handleAnalyze = async (code, language = "javascript") => {
    setModalOpen(true);
    setLoading(true);
    try {
      const res = await axios.post("https://time-complexity-analyzer-production.up.railway.app/api/analyze", {
        code,
        language,
      });
      setResult(res.data.result);
    } catch (err) {
      setResult("Error analyzing: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white px-4 py-6">
      {/* Tabs */}
      <div className="flex justify-center mb-6 relative">
        <div className="bg-neutral-800 border border-neutral-700 rounded-full p-1 flex gap-1">
          <button
            onClick={() => setTab("editor")}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              tab === "editor" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab === "editor" && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute inset-0 bg-blue-600 rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            Code Editor
          </button>
          <button
            onClick={() => setTab("upload")}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              tab === "upload" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab === "upload" && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute inset-0 bg-blue-600 rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            Upload File
          </button>
        </div>
      </div>

      {/* Animated Content */}
      <div className="max-w-5xl mx-auto mb-6 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {tab === "editor" ? (
            <motion.div
              key="editor"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              <CodeEditor onAnalyze={handleAnalyze} />
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              <FileUploadDemo onAnalyze={handleAnalyze} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="max-w-5xl mx-auto text-gray-300 text-sm bg-neutral-800 p-6 rounded-lg border border-neutral-700 shadow">
        <h3 className="text-white font-semibold mb-2">How it works:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Type or paste code in the editor or upload a file.</li>
          <li>Languages supported: JavaScript, Python, Java, C, C++.</li>
          <li>Click "Analyze" to get estimated time complexity.</li>
        </ul>
      </div>

      {/* Modal */}
      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={result}
        loading={loading}
      />
    </div>
  );
};

export default Analyzer;
