import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Projects";
import Skills from "./pages/Skills";
import Footer from "./pages/Footer";
import Resume from "./pages/Resume";
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50); // Slightly faster loading for better UX

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // Adjusted total time to match loading speed

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (showSplash) {
    return (
      <div className="relative w-full h-screen bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-black opacity-80" />

        {/* Floating Particles/Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[128px] opacity-20"
        />

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
          {/* Main Title: DEVSAKTHI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                DEV
              </span>
              <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                SAKTHI
              </span>
            </h1>
          </motion.div>

          {/* Attractive Loading Bar */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Percentage Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between text-xs md:text-sm text-cyan-300 font-mono mb-2 tracking-widest uppercase"
            >
              <span>Loading</span>
              <span>{loadingProgress}%</span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="h-2 md:h-3 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative"
              >
                {/* Shining Effect on Bar */}
                <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]" />
                
                {/* Glow at the tip of the bar */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[4px] shadow-[0_0_10px_#fff]" />
              </motion.div>
            </div>

            {/* Status Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-slate-500 text-xs tracking-wider"
            >
              {loadingProgress < 30 && "Loading assets..."}
              {loadingProgress >= 30 && loadingProgress < 70 && "Connecting to server..."}
              {loadingProgress >= 70 && "Starting application..."}
            </motion.p>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="absolute bottom-6 text-slate-600 text-[10px] md:text-xs tracking-widest uppercase">
         
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500/30">
        <AnimatePresence mode="wait">
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/project" element={<Project />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;