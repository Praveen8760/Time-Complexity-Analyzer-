import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

// ResultModal component to show the analysis result with a fancy UI
const ResultModal = ({ isOpen, onClose, result, loading }) => {
  // Render modal only when it is open
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/70 via-gray-900/80 to-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-11/12 max-w-2xl rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-8 shadow-2xl dark:bg-neutral-900/70 dark:border-white/10"
          >
            {/* Modal header with dynamic text based on loading state */}
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              {loading ? (
                "Analyzing..."
              ) : (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Analysis Result
                </>
              )}
            </h2>

            {/* Show loading spinner when loading, else show result */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent shadow-lg" />
                <p className="text-gray-300 text-sm font-medium tracking-wide">
                  Analyzing your code, please wait…
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-64 overflow-y-auto bg-black/20 p-4 rounded-lg border border-white/10 text-sm font-mono text-white">
                {/* Process the result string and highlight specific sections */}
                {result.split('\n').map((line, i) => {
                  const trimmed = line.trim();

                  // Highlight Big-O notation (O(n*m))
                  if (/^1\.\s*\*?\*?O\(.+\)\*?\*?/i.test(trimmed)) {
                    return (
                      <div key={i} className="text-blue-400 font-semibold text-base bg-white/5 px-3 py-2 rounded-lg shadow-sm">
                        🧠 {trimmed.replace(/\*\*/g, '')}
                      </div>
                    );
                  }

                  // Highlight the explanation part
                  if (/^2\.\s*\*?\*?Explanation:/i.test(trimmed)) {
                    const content = trimmed.replace(/^2\.\s*\*?\*?Explanation:\*?\*?\s*/i, '');
                    return (
                      <div key={i}>
                        <span className="text-pink-400 font-bold">📘 Explanation:</span>{" "}
                        <span className="text-white">{content}</span>
                      </div>
                    );
                  }

                  // For all other lines, return normally
                  return <div key={i}>{line}</div>;
                })}
              </div>
            )}

            {/* Close button */}
            {!loading && (
              <div className="mt-6 text-right">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-xl transition duration-300"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
