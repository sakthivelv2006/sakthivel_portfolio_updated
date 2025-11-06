import React, { useState, useEffect } from "react";
import axios from "axios";
import profileImage from "../assets/profile.jpg";

const Home = () => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [isTypingTitle, setIsTypingTitle] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fullTitle = "Hi, I'm Sakthivel V";
  const fullSubtitle = "Full Stack Developer";

  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;
    let titleTimeout, subtitleTimeout, resetTimeout;

    const typeTitle = () => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
        titleTimeout = setTimeout(typeTitle, 100);
      } else {
        setIsTypingTitle(false);
        setTimeout(typeSubtitle, 400);
      }
    };

    const typeSubtitle = () => {
      if (subtitleIndex < fullSubtitle.length) {
        setDisplayedSubtitle(fullSubtitle.slice(0, subtitleIndex + 1));
        subtitleIndex++;
        subtitleTimeout = setTimeout(typeSubtitle, 80);
      } else {
        resetTimeout = setTimeout(resetAnimation, 5000);
      }
    };

    const resetAnimation = () => {
      setDisplayedTitle("");
      setDisplayedSubtitle("");
      setIsTypingTitle(true);
      titleIndex = 0;
      subtitleIndex = 0;
      setTimeout(typeTitle, 300);
    };

    typeTitle();

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(subtitleTimeout);
      clearTimeout(resetTimeout);
    };
  }, []);

  const handleAskGemini = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse("");
    try {
      const res = await axios.post("http://localhost:5000/gemini/ask", { prompt });
      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
      setResponse("⚠️ Error connecting to Gemini API. Please ensure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen text-white bg-slate-900">
      {/* LEFT SIDE - TEXT (60%) */}
      <div className="w-full md:w-3/5 flex flex-col justify-center items-start p-6 md:p-10 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
          {displayedTitle}
          {isTypingTitle && <span className="animate-pulse ml-1">|</span>}
        </h1>

        <h2 className="text-2xl md:text-3xl text-yellow-400">
          {displayedSubtitle}
          {!isTypingTitle && displayedSubtitle && <span className="animate-pulse ml-1">|</span>}
        </h2>

        <div className="w-full md:w-4/5">
          <textarea
            className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            rows="3"
            placeholder="Ask something about me..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleAskGemini}
            disabled={isLoading || !prompt.trim()}
            className={`mt-3 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
              isLoading || !prompt.trim()
                ? "bg-cyan-800 text-gray-300 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg"
            }`}
          >
            {isLoading ? "Thinking..." : "Ask Gemini"}
          </button>
        </div>

        {response && (
          <div className="mt-4 bg-slate-800 p-4 rounded-lg border border-slate-600 shadow-inner w-full md:w-4/5">
            <p className="text-gray-200 whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - IMAGE (40%) */}
      <div className="w-full md:w-2/5 flex justify-center items-center p-6">
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-4 border-cyan-400 shadow-[0_0_25px_#22d3ee] overflow-hidden">
          <img
            src={profileImage}
            alt="Sakthivel V"
            className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
