import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  FaLinkedin, FaGithub, FaCode, FaPaperPlane, FaStar, FaRobot, FaTimes, 
  FaCreditCard, FaQrcode, FaServer, FaShieldAlt, FaRocket, FaCloud
} from "react-icons/fa";
import profile from "../assets/profile.png";

const TYPING_TEXT = "I am Sakthivel V — Full Stack Developer";
const TYPING_SPEED = 80;
const TYPING_INTERVAL_MS = 5000;

// --- REUSABLE 3D TILT CARD COMPONENT ---
const TiltCard = ({ title, icon, description, tags }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Added onTouchMove for basic mobile interaction support if desired
      onTouchMove={(e) => {
         const touch = e.touches[0];
         const rect = e.currentTarget.getBoundingClientRect();
         const width = rect.width;
         const height = rect.height;
         const mouseXFromCenter = touch.clientX - rect.left - width / 2;
         const mouseYFromCenter = touch.clientY - rect.top - height / 2;
         x.set(mouseXFromCenter / width);
         y.set(mouseYFromCenter / height);
      }}
      className="relative w-full h-full min-h-[300px] rounded-2xl bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 flex flex-col items-start gap-4 shadow-xl group perspective-card"
    >
      {/* Glossy Reflection Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ transform: "translateZ(20px)" }}
      />

      <div 
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 text-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        style={{ transform: "translateZ(30px)" }}
      >
        {icon}
      </div>

      <h3 
        className="text-xl font-bold text-white tracking-wide"
        style={{ transform: "translateZ(25px)" }}
      >
        {title}
      </h3>

      <p 
        className="text-slate-400 text-sm leading-relaxed"
        style={{ transform: "translateZ(20px)" }}
      >
        {description}
      </p>

      <div 
        className="mt-auto flex flex-wrap gap-2"
        style={{ transform: "translateZ(15px)" }}
      >
        {tags.map((tag, i) => (
          <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-slate-700/50 text-cyan-300 border border-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [typed, setTyped] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  
  // Canvas Refs
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

  // Starry Background
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
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        speed: 0.5 + Math.random() * 1,
      });
    }
    starsRef.current = stars;

    const draw = () => {
      ctx.fillStyle = "#000000"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      for (let s of starsRef.current) {
        s.z -= s.speed;
        if (s.z <= 0) s.z = canvas.width;
        const k = 400 / s.z;
        const x = s.x * k;
        const y = s.y * k;
        const size = (1 - s.z / canvas.width) * 3;
        
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
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
      if (!apiResponse.ok) throw new Error('Failed to get response');
      const data = await apiResponse.json();
      setResponse(data.reply || "No response from Gemini");
    } catch (error) {
      console.error(error);
      setResponse("Sorry, I couldn't connect to Gemini API.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-900 text-white flex flex-col items-center overflow-x-hidden perspective-1000">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-20 pt-28 md:pt-36 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <FaStar className="text-yellow-400 animate-spin-slow" />
            <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">Portfolio </span>
          </motion.div>

          <div className="h-32 perspective-text">
           <motion.h1
  className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
>

              {typed}
              <span className="inline-block w-1 h-10 bg-cyan-400 animate-pulse ml-1 align-middle" />
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 w-full max-w-md relative group"
          >
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition duration-500 rounded-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-2xl">
              <div className="flex items-center">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskGemini()}
                  placeholder="Ask Gemini AI about me..."
                  className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 px-4 py-2"
                />
                <button
                  onClick={handleAskGemini}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-6 text-2xl">
            {[FaLinkedin, FaGithub, FaCode].map((Icon, i) => (
               <motion.a 
                 key={i}
                 href="#" 
                 whileHover={{ y: -5, scale: 1.2, color: "#22d3ee" }}
                 className="text-slate-400 transition-colors"
               >
                 <Icon />
               </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: STATIC 3D Profile (Stopped Moving) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="relative w-72 h-72 md:w-96 md:h-96 perspective-card"
        >
          <div
            className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 to-black border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex items-center justify-center overflow-hidden"
            // Removed x, y, rotateX, rotateY bindings to stop the "curve moving"
            style={{ 
              transform: "rotateY(-5deg) rotateX(5deg)", // Static subtle 3D angle
              transformStyle: "preserve-3d" 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-20 pointer-events-none" />
            <motion.div 
              className="absolute inset-4 rounded-full border-2 border-cyan-500/30 border-dashed animate-[spin_20s_linear_infinite]"
              style={{ transform: "translateZ(20px)" }}
            />
            <img
              src={profile}
              alt="Sakthivel"
              className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border-4 border-slate-900/50 relative z-10"
              style={{ transform: "translateZ(50px)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* --- INTRODUCE MYSELF SECTION --- */}
      <div className="relative z-10 w-full max-w-7xl px-6 mt-32 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-white">
             Introduce Myself
           </h2>
           <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-light">
             I am <span className="text-white font-bold">Sakthivel V</span>, a passionate Full Stack Developer interested in developing <span className="text-purple-400 font-semibold">advanced integrations</span>, advanced security systems like <span className="text-pink-400 font-semibold">Multi-Factor Authentication</span>, and scalable multi-OS applications.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
           {/* Card 1: Advanced Payments */}
           <TiltCard 
              title="Advanced Payments"
              icon={<FaCreditCard />}
              description="Expertise in integrating Razorpay payment gateways with complete verification flows. secure handling of transactions, webhooks, and failure management."
              tags={["Razorpay", "Payment Gateways", "Secure Transactions"]}
           />

           {/* Card 2: Security & Authentication */}
           <TiltCard 
              title="Advanced Security"
              icon={<FaShieldAlt />}
              description="Specializing in high-security login systems using QR Code verification and SMTP-based OTPs. Focused on MFA and advanced data protection protocols."
              tags={["QR Code Login", "SMTP Verification", "MFA", "Security"]}
           />

           {/* Card 3: Deployments (UPDATED) */}
           <TiltCard 
              title="Deployments"
              icon={<FaRocket />}
              description="Mastery in Continuous Integration and Deployment (CI/CD). Deploying scalable applications to modern cloud platforms like Netlify, Vercel, and Render."
              tags={["CI/CD", "Netlify", "Vercel", "Render"]}
           />
        </div>
      </div>

      {/* --- GITHUB SECTION (White) --- */}
      <div className="relative z-10 w-full mt-10">
         <GithubContributions />
      </div>

      {/* --- GEMINI MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm perspective-modal">
            <motion.div
              initial={{ opacity: 0, rotateX: -30, scale: 0.8 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: 30, scale: 0.8 }}
              className="bg-slate-900/90 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <FaRobot /> <span>Gemini AI Response</span>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><FaTimes /></button>
              </div>
              <div className="p-6 text-slate-300 min-h-[150px] max-h-[60vh] overflow-y-auto">
                {isThinking ? (
                    <div className="flex justify-center items-center h-full gap-3">
                        <div className="w-5 h-5 bg-cyan-500 rounded-full animate-bounce"></div>
                        <div className="w-5 h-5 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{response}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// User's Original GitHub Style (White Background)
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

  if (loading) return <p className="text-center text-white mt-8">Loading contributions...</p>;
  if (!calendar) return <p className="text-center text-red-400 mt-8">Failed to load contributions</p>;

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
    <div className="p-10 bg-white w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">My GitHub Contributions</h2>

      <div className="w-full overflow-x-auto flex justify-center">
        <div className="min-w-[800px]">
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

                <div className="flex gap-1">
                {calendar.weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1">
                    {week.contributionDays.map((day, dIndex) => (
                        <div
                        key={dIndex}
                        className="w-3 h-3 rounded-sm transition-transform hover:scale-125 hover:z-10"
                        style={{ backgroundColor: day.color }}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                        />
                    ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>

      <p className="mt-4 text-green-600 text-lg">
        Total Contributions: {calendar.totalContributions}
      </p>
    </div>
  );
};