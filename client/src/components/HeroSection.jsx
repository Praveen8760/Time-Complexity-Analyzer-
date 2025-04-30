import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { LampContainer } from "./ui/lamp";
import { motion } from "framer-motion";



export function HeroSection() {
  return (
    <section className="min-h-screen w-full bg-[#020618] relative flex flex-col items-center justify-center antialiased pb-0 mb-0">
      <div className="max-w-3xl mx-auto px-4">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Crack the complexity <br /> Behind Every line
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {/* Explore Now button */}
            <button
              type="button"
              className="relative inline-flex items-center px-7 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/50"
            >
              <span className="relative z-10">✨ Explore Now</span>
              <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-md animate-pulse"></div>
            </button>

            {/* VS Code Extension button with hover effect */}
            <button
              type="button"
              className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gray-900 border border-gray-700 text-white font-semibold transition-all duration-300 hover:border-blue-500 hover:text-blue-400 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              {/* Corrected image path */}
              <img 
                src="/vscode.png"  
                alt="vscode"
                className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />

              <span className="z-10">
                <a href="https://marketplace.visualstudio.com/items?itemName=PraveenT.time-complexity-analyzer" target="_blank" rel="noopener noreferrer">
                  VS Code Extension
                </a>
              </span>

              {/* Glowing background */}
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </button>
          </motion.div>
        </LampContainer>
      </div>

      <BackgroundBeams />
    </section>
  );
}

