import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaCode, FaPaperPlane, FaStar, FaRocket } from "react-icons/fa";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageRotation, setImageRotation] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);
  const imageContainerRef = useRef(null);

  // Mouse move effect for 3D image
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 40;
      const y = (clientY / innerHeight - 0.5) * 40;
      
      setImageRotation({ x: -y, y: x });
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Enhanced Starfield with 3D Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars with depth and colors
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1500,
        speed: 0.5 + Math.random() * 1.5,
        size: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 100%, ${70 + Math.random() * 30}%)`,
        twinkle: Math.random() * Math.PI * 2
      });
    }
    starsRef.current = stars;

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Mouse parallax effect
      const parallaxX = (mousePosition.x / window.innerWidth - 0.5) * 50;
      const parallaxY = (mousePosition.y / window.innerHeight - 0.5) * 50;
      ctx.translate(parallaxX, parallaxY);

      for (let star of starsRef.current) {
        star.z -= star.speed;
        star.twinkle += 0.02;
        
        if (star.z <= 0) {
          star.z = 1500;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }
        
        const k = 1000 / star.z;
        const x = star.x * k;
        const y = star.y * k;
        
        const twinkle = Math.sin(star.twinkle) * 0.3 + 0.7;
        const alpha = Math.min(1, k * 0.5) * twinkle;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        
        // Glow effect
        const glow = ctx.createRadialGradient(x, y, 0, x, y, star.size * k * 3);
        glow.addColorStop(0, star.color);
        glow.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, star.size * k * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Star core
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(x, y, star.size * k, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mousePosition]);

  // Floating particles around image
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const particles = [];
    const colors = ['#22d3ee', '#06b6d4', '#0891b2', '#0ea5e9', '#38bdf8'];
    
    // Create floating particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full animate-float';
      particle.style.width = `${Math.random() * 20 + 10}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
      particle.style.filter = 'blur(2px)';
      particle.style.opacity = '0.7';
      
      // Random positions around the image
      const angle = (i / 8) * Math.PI * 2;
      const radius = 120;
      particle.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
      particle.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  // Gemini Prompt Simulation
  const handleAskGemini = () => {
    if (!prompt.trim()) return;
    setIsModalOpen(true);
    setIsThinking(true);
    setTimeout(() => {
      setResponse(`Gemini says: "Here's a smart answer for '${prompt}'."`);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Enhanced 3D Starfield Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full"
        style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)' }}
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)',
          }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
          animate={{
            x: [100, 0, 100],
            y: [-50, 0, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 pt-28 md:pt-36 text-center md:text-left">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <FaStar className="text-yellow-400" />
            </motion.div>
            <span className="text-cyan-300 font-medium">Welcome to My Portfolio</span>
          </motion.div>

          <motion.h1
            key={typed}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-cyan-300 leading-tight"
          >
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-1 h-6 bg-cyan-300 ml-1"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 max-w-md text-slate-300 text-sm md:text-base"
          >
            Passionate about building scalable full-stack web apps using React, Node.js, and
            Tailwind CSS. Focused on delivering modern UI and seamless performance.
          </motion.p>

          {/* Gemini Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 w-full max-w-md flex items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
          >
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Gemini AI..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAskGemini()}
            />
            <motion.button
              onClick={handleAskGemini}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <FaPaperPlane />
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex gap-6 text-lg"
          >
            {[
              { icon: FaLinkedin, href: "https://linkedin.com" },
              { icon: FaGithub, href: "https://github.com" },
              { icon: FaCode, href: "https://leetcode.com" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Side - 3D Image Showcase */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Outer Glow */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'conic-gradient(from 0deg, #06b6d4, #4f46e5, #ec4899, #06b6d4)',
              filter: 'blur(20px)'
            }}
          />
          
          {/* Main Image Container */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateX(${imageRotation.x}deg) rotateY(${imageRotation.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
            className="relative rounded-2xl"
          >
            {/* Image Frame */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl p-4 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/20 shadow-2xl"
              style={{
                boxShadow: `
                  0 0 50px rgba(6, 182, 212, 0.3),
                  0 0 100px rgba(79, 70, 229, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              {/* Image with 3D effect */}
              <motion.img
                src={profile}
                alt="Sakthivel V"
                className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover shadow-2xl"
                style={{
                  transform: `translateZ(50px)`,
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              />
              
              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -left-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <FaRocket className="text-white text-sm" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <FaStar className="text-white text-xs" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Orbiting elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96"
          >
            {[0, 90, 180, 270].map((angle, index) => (
              <motion.div
                key={index}
                className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)`
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Gemini Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 text-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
                backdropFilter: 'blur(20px)'
              }}
            >
              <motion.button
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-400 text-xl transition-colors p-1"
              >
                ✖
              </motion.button>
              
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center"
                >
                  <FaStar className="text-white text-sm" />
                </motion.div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Gemini AI Response
                </h3>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-200">
                  {isThinking ? (
                    <motion.span 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                      />
                      Thinking...
                    </motion.span>
                  ) : (
                    response
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add custom styles for fing animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}