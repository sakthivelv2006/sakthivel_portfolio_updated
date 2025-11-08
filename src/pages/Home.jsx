import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaCode, FaPaperPlane, FaStar } from "react-icons/fa";
import profile from "../assets/profile.png";

const TYPING_TEXT = "I am Sakthivel V — Full Stack Developer";
const TYPING_SPEED = 80;
const TYPING_INTERVAL_MS = 10000;

export default function Home() {
  const [typed, setTyped] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);

  // Typing Effect
  useEffect(() => {
    let i = 0;
    const type = () => {
      setTyped("");
      const interval = setInterval(() => {
        setTyped((prev) => TYPING_TEXT.slice(0, i + 1));
        i++;
        if (i === TYPING_TEXT.length) {
          clearInterval(interval);
          setTimeout(() => {
            i = 0;
            type();
          }, TYPING_INTERVAL_MS);
        }
      }, TYPING_SPEED);
    };
    type();
  }, []);

  // Starfield Background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        speed: 0.3 + Math.random() * 0.4,
      });
    }
    starsRef.current = stars;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      for (let s of starsRef.current) {
        s.z -= s.speed;
        if (s.z <= 0) s.z = canvas.width;
        const k = 600 / s.z;
        const x = s.x * k;
        const y = s.y * k;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, k * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Real Gemini API Call
  const handleAskGemini = async () => {
  if (!prompt.trim()) return;

  setIsModalOpen(true);
  setIsThinking(true);
  setResponse("");

  try {
    const apiResponse = await fetch('http://localhost:5000/gemini/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to get response from Gemini API');
    }

    const data = await apiResponse.json();
    // ✅ Use the correct property 'reply'
    setResponse(data.reply || "No response from Gemini");
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    setResponse("Sorry, I couldn't connect to Gemini API. Please try again later.");
  } finally {
    setIsThinking(false);
  }
};

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAskGemini();
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      {/* Main Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 pt-28 md:pt-36 text-center md:text-left">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-yellow-400" />
            <span className="text-cyan-300 font-medium">Welcome to My Portfolio</span>
          </div>

          <motion.h1
            key={typed}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-cyan-300 leading-tight"
          >
            {typed}
            <span className="inline-block w-1 h-6 bg-cyan-300 animate-pulse ml-1" />
          </motion.h1>

          <p className="mt-3 max-w-md text-slate-300 text-sm md:text-base">
            Passionate about building scalable full-stack web apps using React, Node.js, and
            Tailwind CSS. Focused on delivering modern UI and seamless performance.
          </p>

          {/* Gemini Input */}
          <div className="mt-6 w-full max-w-md flex items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about my skills, projects, or experience..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2 text-sm"
            />
            <button
              onClick={handleAskGemini}
              disabled={isThinking}
              className="px-4 py-2 bg-cyan-400 text-slate-900 rounded-lg font-semibold hover:bg-cyan-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isThinking ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Asking...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Ask</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-6 text-lg">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              <FaGithub />
            </a>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              <FaCode />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center items-center"
        >
          <div className="rounded-full p-2 bg-gradient-to-br from-cyan-400/40 to-yellow-400/30 shadow-2xl">
            <img
              src={profile}
              alt="Sakthivel V"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white/10 shadow-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Gemini Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl max-h-[80vh] overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-600 hover:text-red-600 text-xl transition-colors z-10"
              >
                ✖
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <FaStar className="text-white text-sm" />
                </div>
                <h3 className="text-lg font-semibold text-cyan-600">Gemini AI Assistant</h3>
              </div>

              {/* Question Display */}
              {prompt && (
                <div className="mb-4 p-4 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600 font-medium">Your question:</p>
                  <p className="text-slate-800 mt-1">{prompt}</p>
                </div>
              )}

              {/* Response Area */}
              <div className="bg-slate-50 rounded-lg p-4 min-h-[120px] max-h-[300px] overflow-y-auto">
                {isThinking ? (
                  <div className="flex items-center justify-center gap-3 h-full">
                    <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-600">Gemini is thinking...</p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-slate-800 whitespace-pre-wrap">{response}</p>
                  </div>
                )}
              </div>

              {/* Ask Another Question Button */}
              {!isThinking && response && (
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => {
                      setPrompt("");
                      setResponse("");
                    }}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors text-sm"
                  >
                    Ask another question
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}