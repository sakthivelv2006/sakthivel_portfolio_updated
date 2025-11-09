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

  const handleAskGemini = async () => {
    if (!prompt.trim()) return;
    setIsModalOpen(true);
    setIsThinking(true);
    setResponse("");
    try {
      const apiResponse = await fetch('https://gameappbackend-i8zv.onrender.com/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!apiResponse.ok) throw new Error('Failed to get response from Gemini API');
      const data = await apiResponse.json();
      setResponse(data.reply || "No response from Gemini");
    } catch (error) {
      console.error(error);
      setResponse("Sorry, I couldn't connect to Gemini API. Please try again later.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAskGemini();
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 pt-28 md:pt-36 text-center md:text-left">
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-yellow-400" />
            <span className="text-cyan-700 font-medium">Welcome to My Portfolio</span>
          </div>

          <motion.h1
            key={typed}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-cyan-700 leading-tight"
          >
            {typed}
            <span className="inline-block w-1 h-6 bg-cyan-700 animate-pulse ml-1" />
          </motion.h1>

          <p className="mt-3 max-w-md text-slate-600 text-sm md:text-base">
            Passionate about building scalable full-stack web apps using React, Node.js, and Tailwind CSS. Focused on delivering modern UI and seamless performance.
          </p>

          <div className="mt-6 w-full max-w-md flex items-center bg-slate-100 p-3 rounded-xl border border-slate-300">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about my skills, projects, or experience..."
              className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400 px-2 text-sm"
            />
            <button
              onClick={handleAskGemini}
              disabled={isThinking}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isThinking ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

          <div className="mt-6 flex gap-6 text-lg">
            <a href="https://linkedin.com/in/sakthivel2006" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://github.com/sakthivel182006" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors">
              <FaGithub />
            </a>
            <a href="https://leetcode.com/u/sakthivelv202222/" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors">
              <FaCode />
            </a>
          </div>
        </div>

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

              {prompt && (
                <div className="mb-4 p-4 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600 font-medium">Your question:</p>
                  <p className="text-slate-800 mt-1">{prompt}</p>
                </div>
              )}

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

      <GithubContributions />
    </div>
  );
}

const GithubContributions = () => {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "sakthivel182006";

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await fetch(`https://gameappbackend-i8zv.onrender.com/api/github/contributions/${username}`);
        const data = await res.json();
        setCalendar(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  if (loading) return <p className="text-slate-900 mt-8">Loading contributions...</p>;
  if (!calendar) return <p className="text-red-400 mt-8">Failed to load contributions</p>;

  const getMonthLabels = () => {
    const labels = [];
    let lastMonth = -1;
    calendar.weeks.forEach((week, index) => {
      if (week.contributionDays.length > 0) {
        const month = new Date(week.contributionDays[0].date).getMonth();
        if (month !== lastMonth) {
          labels.push({ name: new Date(week.contributionDays[0].date).toLocaleString("default", { month: "short" }), weekIndex: index });
          lastMonth = month;
        }
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-10 bg-white w-full flex flex-col items-center mt-12">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">My GitHub Contributions</h2>

      <div className="flex justify-start w-full max-w-[920px] mb-2 pl-8">
        {monthLabels.map((month, idx) => (
          <span
            key={idx}
            className="text-sm font-semibold text-slate-700"
            style={{ marginLeft: idx === 0 ? 0 : "auto" }}
          >
            {month.name}
          </span>
        ))}
      </div>

      <div className="flex w-full max-w-[920px] bg-slate-100 p-4 rounded-xl shadow-lg">
        <div className="flex flex-col gap-1 pt-1 pr-2">
          {daysOfWeek.map((day, idx) => (
            <span key={idx} className="text-xs text-slate-700 h-3">{day}</span>
          ))}
        </div>

        <div className="flex gap-1 overflow-x-auto">
          {calendar.weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dIndex) => (
                <div
                  key={dIndex}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: day.color }}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-green-600 text-lg">
        Total Contributions: {calendar.totalContributions}
      </p>
    </div>
  );
};
