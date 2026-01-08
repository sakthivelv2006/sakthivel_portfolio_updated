import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  FaCode, FaLaptopCode, FaChartLine, FaGraduationCap, FaBriefcase, FaRocket,
  FaUniversity, FaAward, FaCalendarAlt, FaHeart, FaLightbulb, FaCloud,
  FaCreditCard, FaShieldAlt
} from "react-icons/fa";

// --- ADVANCED 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"]);
  
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full transition-all duration-200 ease-linear perspective-1000 ${className}`}
    >
      <div className="relative h-full w-full rounded-[24px] shadow-2xl transition-all duration-300" style={{ transformStyle: "preserve-3d" }}>
        <motion.div 
            style={{ 
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3), transparent 50%)`,
                transform: "translateZ(1px)"
            }}
            className="absolute inset-0 rounded-[24px] z-50 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        {children}
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  // Canvas Refs
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);

  // Starry Background Logic
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
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
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

  return (
    <div className="relative w-full min-h-screen bg-slate-900 text-white flex flex-col items-center overflow-x-hidden perspective-2000">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="relative z-10 w-full max-w-7xl px-6 mt-24 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-lg">
             About Me
           </h2>
           <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-light">
             Hi, I'm <span className="font-bold text-white">Sakthivel V</span>. A passionate <span className="text-cyan-400 font-bold">Full Stack Developer</span> dedicated to crafting exceptional digital experiences.
           </p>
        </motion.div>

        {/* TOP ROW: QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 perspective-container">
           {/* College */}
           <TiltCard>
              <div className="group h-full bg-slate-800/60 backdrop-blur-md rounded-[24px] border border-white/10 p-6 shadow-2xl relative">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(-10px)" }} />
                  <div className="flex items-center gap-6 h-full" style={{ transform: "translateZ(30px)" }}>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                          <FaUniversity className="text-3xl text-purple-400" />
                      </div>
                      <div>
                          <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">College</span>
                          <h3 className="text-white text-lg font-bold">Sri Krishna College of Tech</h3>
                      </div>
                  </div>
              </div>
           </TiltCard>

           {/* Degree */}
           <TiltCard>
              <div className="group h-full bg-slate-800/60 backdrop-blur-md rounded-[24px] border border-white/10 p-6 shadow-2xl relative">
                  <div className="absolute inset-0 bg-cyan-500/10 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(-10px)" }} />
                  <div className="flex items-center gap-6 h-full" style={{ transform: "translateZ(30px)" }}>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/30">
                          <FaGraduationCap className="text-3xl text-cyan-400" />
                      </div>
                      <div>
                          <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider">Degree</span>
                          <h3 className="text-white text-lg font-bold">B.E. Computer Science</h3>
                      </div>
                  </div>
              </div>
           </TiltCard>

           {/* CGPA */}
           <TiltCard>
              <div className="group h-full bg-slate-800/60 backdrop-blur-md rounded-[24px] border border-white/10 p-6 shadow-2xl relative">
                  <div className="absolute inset-0 bg-green-500/10 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(-10px)" }} />
                  <div className="flex items-center gap-6 h-full" style={{ transform: "translateZ(30px)" }}>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center border border-green-500/30">
                          <FaAward className="text-3xl text-green-400" />
                      </div>
                      <div>
                          <span className="text-green-300 text-xs font-bold uppercase tracking-wider">Performance</span>
                          <h3 className="text-white text-lg font-bold">CGPA: 8.0 <span className="text-xs font-normal opacity-70">(Current)</span></h3>
                      </div>
                  </div>
              </div>
           </TiltCard>
        </div>

        {/* MAIN GRID: DETAILED SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-container">
           
           {/* EDUCATION CARD */}
           <TiltCard>
             <div className="group relative h-full bg-slate-900 rounded-[30px] p-1 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-[30px] opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative h-full bg-slate-900 rounded-[28px] p-8 overflow-hidden">
                 <FaGraduationCap className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12" style={{ transform: "translateZ(10px)" }} />
                 <div className="flex flex-col items-center mb-8" style={{ transform: "translateZ(40px)" }}>
                   <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                         <FaGraduationCap className="text-3xl text-cyan-400" />
                      </div>
                   </div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Education</h2>
                 </div>
                 <div className="bg-slate-800/80 rounded-2xl p-6 border border-white/10 relative" style={{ transform: "translateZ(30px)" }}>
                    <div className="absolute -left-1 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-r-full" />
                    <h3 className="text-lg font-bold text-white mb-1">Sri Krishna College</h3>
                    <p className="text-cyan-200 text-sm mb-4">B.E. Computer Science</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                       <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">2023 - 2027</span>
                    </div>
                    <div className="text-sm text-gray-400 border-t border-white/10 pt-4 mt-2">
                       <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300">
                          <li>Software Engineering</li>
                          <li>Web Technologies</li>
                          <li>Data Structures</li>
                       </ul>
                    </div>
                 </div>
               </div>
             </div>
           </TiltCard>

           {/* CAREER GOALS CARD */}
           <TiltCard>
             <div className="group relative h-full bg-slate-900 rounded-[30px] p-1 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-[30px] opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative h-full bg-slate-900 rounded-[28px] p-8 overflow-hidden">
                 <FaRocket className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12" style={{ transform: "translateZ(10px)" }} />
                 <div className="flex flex-col items-center mb-8" style={{ transform: "translateZ(40px)" }}>
                   <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-0.5 mb-4 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                         <FaRocket className="text-3xl text-orange-400" />
                      </div>
                   </div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Career Goals</h2>
                 </div>
                 <div className="grid gap-4" style={{ transform: "translateZ(30px)" }}>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-3">
                       <FaLightbulb className="text-yellow-400 text-xl" />
                       <div><h4 className="text-white font-bold text-xs">Full Stack Expert</h4></div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-3">
                       <FaHeart className="text-pink-400 text-xl" />
                       <div><h4 className="text-white font-bold text-xs">Impactful Tech</h4></div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-3">
                       <FaCode className="text-cyan-400 text-xl" />
                       <div><h4 className="text-white font-bold text-xs">Open Source</h4></div>
                    </div>
                 </div>
               </div>
             </div>
           </TiltCard>

           {/* PROJECTS & EXPERIENCE */}
           <TiltCard>
             <div className="group relative h-full bg-slate-900 rounded-[30px] p-1 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-[30px] opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative h-full bg-slate-900 rounded-[28px] p-8 overflow-hidden">
                 <FaBriefcase className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12" style={{ transform: "translateZ(10px)" }} />
                 <div className="flex flex-col items-center mb-8" style={{ transform: "translateZ(40px)" }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-0.5 mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                         <FaBriefcase className="text-3xl text-green-400" />
                      </div>
                   </div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Experience</h2>
                 </div>
                 <div className="space-y-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
                     <div className="relative pl-4 border-l-2 border-green-500/30">
                        <h4 className="text-green-400 font-bold mb-1 flex items-center gap-2"><FaCreditCard/> Payment Integration</h4>
                        <p className="text-gray-300 text-xs">Integrated <strong>Razorpay</strong> with verification, webhooks, and secure transaction handling.</p>
                     </div>
                     <div className="relative pl-4 border-l-2 border-green-500/30">
                        <h4 className="text-green-400 font-bold mb-1 flex items-center gap-2"><FaCloud/> CI/CD Deployments</h4>
                        <p className="text-gray-300 text-xs">Expertise in <strong>Netlify, Vercel, Render</strong> deployments and MongoDB Atlas management.</p>
                     </div>
                     <div className="relative pl-4 border-l-2 border-green-500/30">
                        <h4 className="text-green-400 font-bold mb-1 flex items-center gap-2"><FaShieldAlt/> Security</h4>
                        <p className="text-gray-300 text-xs">Implemented <strong>QR Code Login</strong>, SMTP OTPs, and Multi-Factor Authentication.</p>
                     </div>
                 </div>
               </div>
             </div>
           </TiltCard>

           {/* INTERESTS */}
           <TiltCard>
             <div className="group relative h-full bg-slate-900 rounded-[30px] p-1 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-[30px] opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative h-full bg-slate-900 rounded-[28px] p-8 overflow-hidden">
                 <FaLightbulb className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12" style={{ transform: "translateZ(10px)" }} />
                 <div className="flex flex-col items-center mb-8" style={{ transform: "translateZ(40px)" }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-0.5 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                         <FaLaptopCode className="text-3xl text-yellow-400" />
                      </div>
                   </div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Passions</h2>
                 </div>
                 <div className="grid grid-cols-2 gap-3" style={{ transform: "translateZ(30px)" }}>
                    {["Full Stack", "DSA", "AI / ML", "Mobile Apps", "UI/UX", "Cloud"].map((tag, i) => (
                       <div key={i} className="bg-white/5 rounded-lg p-3 text-center border border-white/5 hover:bg-yellow-500/20 transition-all cursor-default">
                          <span className="text-gray-300 text-xs font-semibold">{tag}</span>
                       </div>
                    ))}
                 </div>
               </div>
             </div>
           </TiltCard>

           {/* CONNECT */}
           <TiltCard>
              <div className="group relative h-full bg-slate-900 rounded-[30px] p-1 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-[30px] opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative h-full bg-slate-900 rounded-[28px] p-8 overflow-hidden">
                 <FaChartLine className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12" style={{ transform: "translateZ(10px)" }} />
                 <div className="flex flex-col items-center mb-8" style={{ transform: "translateZ(40px)" }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 p-0.5 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                         <FaChartLine className="text-3xl text-pink-400" />
                      </div>
                   </div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Let's Connect</h2>
                 </div>
                 <div className="space-y-6 text-center relative z-10" style={{ transform: "translateZ(30px)" }}>
                    <p className="text-gray-300 text-sm">
                       Looking for <span className="text-pink-400 font-bold">Internships</span> & <span className="text-pink-400 font-bold">Collaborations</span>.
                    </p>
                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-pink-500/20">
                       <p className="text-white text-[10px] font-bold uppercase mb-2 tracking-widest">Ready to deploy:</p>
                       <div className="flex flex-wrap justify-center gap-2">
                          <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-[10px] font-semibold">Web Apps</span>
                          <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-[10px] font-semibold">Full Stack</span>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
           </TiltCard>
        </div>
      </div>

      
    </div>
  );
}

// User's Original GitHub Style
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
                <span key={idx} className="text-sm font-semibold text-slate-700" style={{ marginLeft: idx === 0 ? 0 : "auto" }}>
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
                        <div key={dIndex} className="w-3 h-3 rounded-sm transition-transform hover:scale-125 hover:z-10" style={{ backgroundColor: day.color }} title={`${day.date}: ${day.contributionCount} contributions`} />
                    ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
      <p className="mt-4 text-green-600 text-lg">Total Contributions: {calendar.totalContributions}</p>
    </div>
  );
};