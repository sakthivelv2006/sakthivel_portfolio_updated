import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  FaJava, FaPython, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaAndroid,
  FaHtml5, FaCss3Alt, FaJs, FaCloud, FaRocket, FaCode, FaServer,
  FaMobile, FaTools, FaChartLine, FaDeploydog, FaLanguage, FaChess, FaFutbol, FaRunning
} from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiMysql, SiVercel, SiNetlify, SiJupyter } from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';

// --- REUSABLE 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  
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
      <div className="relative h-full w-full rounded-[24px] shadow-2xl transition-all duration-300 group" style={{ transformStyle: "preserve-3d" }}>
        {/* Dynamic Glare Effect */}
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

const Skills = () => {
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

  const skillsData = [
    {
      category: "Programming Languages",
      icon: <FaCode className="text-4xl" />,
      gradient: "from-purple-500 to-pink-500",
      items: [
        { name: "Java", icon: <FaJava />, color: "text-red-500" }
      ]
    },
    {
      category: "Frontend Development",
      icon: <FaReact className="text-4xl" />,
      gradient: "from-blue-500 to-cyan-500",
      items: [
        { name: "HTML", icon: <><FaHtml5 /><FaCss3Alt /></>, color: "text-orange-500" },
        { name: "React", icon: <FaReact />, color: "text-cyan-400" },
        { name: "Android Studio", icon: <FaAndroid />, color: "text-green-500" },
        { name: "Flutter", icon: <FaMobile />, color: "text-blue-400" }
      ]
    },
    {
      category: "Backend Development",
      icon: <FaServer className="text-4xl" />,
      gradient: "from-green-500 to-emerald-500",
      items: [
        { name: "Spring Boot", icon: <SiSpringboot />, color: "text-green-600" },
        { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
        { name: "Express.js", icon: <FaJs />, color: "text-gray-400" }
      ]
    },
    {
      category: "Full Stack Technologies",
      icon: <FaRocket className="text-4xl" />,
      gradient: "from-orange-500 to-red-500",
      items: [
        { name: "MERN Stack", icon: <FaReact />, color: "text-cyan-400" }
      ]
    },
    {
      category: "Advanced Integrations",
      icon: <FaCloud className="text-4xl" />,
      gradient: "from-indigo-500 to-purple-500",
      items: [
        { name: "Razorpay Payment", icon: <FaServer />, color: "text-blue-600" },
        { name: "SMTP Email", icon: <FaServer />, color: "text-green-500" },
        { name: "Cloudinary", icon: <FaCloud />, color: "text-yellow-500" },
        { name: "API Integrations", icon: <FaCode />, color: "text-purple-500" }
      ]
    },
    {
      category: "Testing & Analysis",
      icon: <FaChartLine className="text-4xl" />,
      gradient: "from-pink-500 to-rose-500",
      items: [
        { name: "Software Testing (Java)", icon: <FaJava />, color: "text-red-500" },
        { name: "ML with Data Analysis", icon: <FaPython />, color: "text-yellow-500" }
      ]
    },
    {
      category: "Databases",
      icon: <FaDatabase className="text-4xl" />,
      gradient: "from-teal-500 to-green-500",
      items: [
        { name: "SQL", icon: <SiMysql />, color: "text-blue-600" },
        { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" }
      ]
    },
    {
      category: "Problem Solving",
      icon: <FaRocket className="text-4xl" />,
      gradient: "from-cyan-500 to-blue-500",
      items: [
        { name: "DSA using Java", icon: <FaJava />, color: "text-red-500" }
      ]
    },
    {
      category: "Deployment Platforms",
      icon: <FaDeploydog className="text-4xl" />,
      gradient: "from-yellow-500 to-orange-500",
      items: [
        { name: "Vercel", icon: <SiVercel />, color: "text-black" },
        { name: "Render", icon: <FaServer />, color: "text-gray-400" },
        { name: "Netlify", icon: <SiNetlify />, color: "text-teal-500" }
      ]
    },
    {
      category: "Tools & Technologies",
      icon: <FaTools className="text-4xl" />,
      gradient: "from-gray-500 to-slate-700",
      items: [
        { name: "Git & GitHub", icon: <FaGitAlt />, color: "text-orange-500" },
        { name: "Jupyter Notebook", icon: <SiJupyter />, color: "text-orange-600" },
        { name: "Android Studio", icon: <FaAndroid />, color: "text-green-500" },
        { name: "VS Code", icon: <FaCode />, color: "text-blue-500" }
      ]
    },
    {
      category: "Languages",
      icon: <FaLanguage className="text-4xl" />,
      gradient: "from-violet-500 to-purple-600",
      items: [
        { name: "English", icon: <FaLanguage />, color: "text-blue-400" },
        { name: "Tamil", icon: <FaLanguage />, color: "text-red-400" },
        { name: "Telugu", icon: <FaLanguage />, color: "text-yellow-400" }
      ]
    },
    {
      category: "Sports",
      icon: <FaRunning className="text-4xl" />,
      gradient: "from-amber-500 to-orange-600",
      items: [
        { name: "Chess", icon: <FaChess />, color: "text-gray-300" },
        { name: "Cricket", icon: <FaFutbol />, color: "text-green-400" },
        { name: "Kabaddi", icon: <FaRunning />, color: "text-orange-400" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0, opacity: 1, scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden perspective-2000">
      
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16" style={{ transformStyle: "preserve-3d" }}>
          <motion.h1
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 drop-shadow-lg"
            style={{ transform: "translateZ(50px)" }}
          >
            Skills & Arsenal
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            style={{ transform: "translateZ(30px)" }}
          >
            A comprehensive showcase of my technical expertise across various domains,
            from programming to sports and communication skills.
          </motion.p>
        </motion.div>

        {/* 3D Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-container"
        >
          {skillsData.map((skillCategory, index) => (
            <TiltCard key={index} className="group cursor-pointer">
              {/* Card Gradient Border Container */}
              <div className={`relative h-full bg-gradient-to-br ${skillCategory.gradient} p-[2px] rounded-[30px] shadow-2xl`}>
                
                {/* Inner Card Content */}
                <div className="relative bg-slate-900 rounded-[28px] p-8 h-full overflow-hidden">
                  
                  {/* Glass/Gloss Effect Layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{transform: "translateZ(10px)"}} />

                  {/* Icon & Title */}
                  <div className="text-center mb-6" style={{ transform: "translateZ(40px)" }}>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-4 shadow-lg backdrop-blur-sm border border-white/10">
                      <div className="text-white drop-shadow-md">{skillCategory.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{skillCategory.category}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3" style={{ transform: "translateZ(20px)" }}>
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center justify-start gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className={`text-xl ${skill.color} drop-shadow-sm`}>{skill.icon}</div>
                        <h4 className="text-slate-200 font-semibold text-sm">{skill.name}</h4>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;