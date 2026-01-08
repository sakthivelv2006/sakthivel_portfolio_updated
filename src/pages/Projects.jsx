import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  FaGlobe, 
  FaDownload, 
  FaWindows, 
  FaAndroid, 
  FaArrowRight, 
  FaArrowLeft,
  FaPlay,
  FaUsers,
  FaGraduationCap,
  FaCreditCard,
  FaRocket,
  FaStar,
  FaUserGraduate,
  FaCode
} from "react-icons/fa";

// Import your images (Keep exactly as provided)
import project11firstimage from "../assets/projects/project1/projectimage1image.png";
import project12firstimage from "../assets/projects/project1/projectimage2image.png";
import project13firstimage from "../assets/projects/project1/projectimage3image.png";
import project14firstimage from "../assets/projects/project1/projectimage4image.png";
import project15firstimage from "../assets/projects/project1/projectimage5image.png";

import project21firstimage from "../assets/projects/project2/project21firstimage.png";
import project22firstimage from "../assets/projects/project2/project22firstimage.png";
import project23firstimage from "../assets/projects/project2/project23firstimage.png";
import project24firstimage from "../assets/projects/project2/project24firstimage.png";
import project25firstimage from "../assets/projects/project2/project25firstimage.png";

import project31firstimage from "../assets/projects/project3/project31firstimage.png";
import project32firstimage from "../assets/projects/project3/project32firstimage.png";
import project33firstimage from "../assets/projects/project3/project33firstimage.png";
import project34firstimage from "../assets/projects/project3/project34firstimage.png";
import project35firstimage from "../assets/projects/project3/project35firstimage.png";

import project41firstimage from "../assets/projects/project4/project41firstimage.png";
import project42firstimage from "../assets/projects/project4/project42firstimage.png";
import project43firstimage from "../assets/projects/project4/project43firstimage.png";
import project44firstimage from "../assets/projects/project4/project44firstimage.png";
import project45firstimage from "../assets/projects/project4/project45firstimage.png";

import project51firstimage from "../assets/projects/project5/project51firstimage.png";
import project52firstimage from "../assets/projects/project5/project52firstimage.png";
import project53firstimage from "../assets/projects/project5/project53firstimage.png";
import project54firstimage from "../assets/projects/project5/project54firstimage.png";
import project55firstimage from "../assets/projects/project5/project55firstimage.png";

// --- REUSABLE 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className, onClick }) => {
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
      onClick={onClick}
      className={`relative h-full transition-all duration-200 ease-linear perspective-1000 ${className}`}
    >
      <div className="relative h-full w-full rounded-[24px] shadow-2xl transition-all duration-300 group" style={{ transformStyle: "preserve-3d" }}>
        {/* Glare Effect */}
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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Canvas Refs for Starry Background
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

  const projectData = [
    {
      title: "Learn From Sakthi & Gaming Platform",
      domain: "https://learnfromsakthi.vercel.app/",
      description: "Advanced E-Learning Platform with Payment Integration",
      features: ["Payment Gateway", "Live Classes", "Course Management", "Progress Tracking", "Certification", "Multi-tier Access"],
      roles: [
        { name: "Admin", icon: FaUsers, color: "from-red-500 to-pink-500" },
        { name: "College", icon: FaUsers, color: "from-blue-500 to-cyan-500" },
        { name: "Teacher", icon: FaGraduationCap, color: "from-green-500 to-emerald-500" },
        { name: "Student", icon: FaUserGraduate, color: "from-purple-500 to-indigo-500" }
      ],
      images: [
        project11firstimage,
        project12firstimage,
        project13firstimage,
        project14firstimage,
        project15firstimage,
      ],
      gradient: "from-purple-500 via-blue-500 to-cyan-500",
      accent: "purple",
      tech: ["Node.js","Express.js","MongoDB","html","Razorpay","Smtp Mail Verification"]
    },
    {
      title: "Sakthivel Online Code Editor",
      domain: "https://sakthijavacompiler.vercel.app/",
      description: "Online Code Editor for Java, C++, Python with Real-time Compilation",
      features: ["Multi-language Support", "Real-time Compilation", "Code Sharing", "Syntax Highlighting", "User-friendly Interface", "Project Management"],
      roles: [
        { name: "Admin", icon: FaUsers, color: "from-red-500 to-pink-500" },
        { name: "Developer", icon: FaCode, color: "from-yellow-500 to-orange-500" }
      ],
      images: [
        project51firstimage,
        project52firstimage,
        project53firstimage,
        project54firstimage,
        project55firstimage,
      ],
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      accent: "orange",
      tech: ["React", "Node.js", "Express", "WebAssembly", "Monaco Editor"]
    },
    {
      title: "Social Platform Pro",
      domain: "https://sakthisoftwaresolutions.vercel.app",
      description: "Next-Gen Social Media with Reels & Integration",
      features: ["Reels Sharing", "Video Upload", "Comments System", "Admin Dashboard", "Real-time Chat", "Content Moderation"],
      roles: [
        { name: "Admin", icon: FaUsers, color: "from-red-500 to-pink-500" },
        { name: "User", icon: FaUsers, color: "from-green-500 to-teal-500" }
      ],
      images: [
        project31firstimage,
        project32firstimage,
        project33firstimage,
        project34firstimage,
        project35firstimage,
      ],
      gradient: "from-green-500 via-teal-500 to-cyan-500",
      accent: "green",
      tech: ["Flutter", "Node.js", "Cloud Storage", "Real-time DB", "Cloudinary Cloud"],
      androidDownload: "https://drive.google.com/file/d/1j0OfTh2CNiTD-_HpijvaOAxi7CvRnKoG/view",
      windowsDownload: "https://drive.usercontent.google.com/u/0/uc?id=1QatWdWfGsB3hAj5fg-hy60N-1gOBeuA1&export=download"
    },
    {
      title: "Sakthivel E-Learning",
      domain: "https://sakthivelvlearningapp.vercel.app/",
      description: "Free E-Learning Application with Advanced Features",
      features: ["Free Courses", "Progress Tracking", "Admin Dashboard", "Learner Portal", "Community Support"],
      roles: [
        { name: "Admin", icon: FaUsers, color: "from-red-500 to-pink-500" },
        { name: "Learners", icon: FaUserGraduate, color: "from-indigo-500 to-purple-500" }
      ],
      images: [
        project41firstimage,
        project42firstimage,
        project43firstimage,
        project44firstimage,
        project45firstimage,
      ],
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      accent: "indigo",
      tech: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary"]
    },
    {
      title: "Sakthi Insurance",
      domain: "https://sakthiinsurance.vercel.app/",
      description: "Comprehensive Insurance Management System",
      features: ["Policy Management", "Claims Processing", "Agent Portal", "Customer Dashboard", "Payment Integration", "Document Verification"],
      roles: [
        { name: "Admin", icon: FaUsers, color: "from-red-500 to-pink-500" },
        { name: "Agent", icon: FaUsers, color: "from-orange-500 to-yellow-500" },
        { name: "Customer", icon: FaCreditCard, color: "from-green-500 to-emerald-500" }
      ],
      images: [
        project21firstimage,
        project22firstimage,
        project23firstimage,
        project24firstimage,
        project25firstimage,
      ],
      gradient: "from-orange-500 via-red-500 to-pink-500",
      accent: "red",
      tech: ["React", "Springboot", "Tailwind", "Payment APIs", "Smtp"]
    }
  ];

  const openProjectModal = (project, index) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 drop-shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            My Projects
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Discover my portfolio of cutting-edge web applications built with modern technologies, 
            featuring stunning user experiences and innovative solutions.
          </motion.p>
        </motion.div>

        {/* 3D PROJECT GRID */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {projectData.map((project, index) => (
            <TiltCard key={index} className="group cursor-pointer">
              <div className={`relative h-full bg-gradient-to-br ${project.gradient} p-[2px] rounded-[30px] shadow-2xl overflow-hidden`}>
                <div className="relative bg-slate-900 rounded-[28px] p-8 h-full overflow-hidden">
                  
                  {/* Gloss Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{transform: "translateZ(10px)"}} />

                  <div className="text-center mb-6" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div 
                    className="relative rounded-2xl overflow-hidden mb-6 shadow-2xl group/image border border-white/10"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 md:h-64 object-cover transform group-hover/image:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white/20 rounded-full p-4 backdrop-blur-md border border-white/30 hover:scale-110 transition-transform">
                        <FaPlay className="text-white text-xl md:text-2xl" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-4" style={{ transform: "translateZ(25px)" }}>
                    {project.roles.map((role, i) => (
                      <span
                        key={i}
                        className={`bg-gradient-to-r ${role.color} text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
                      >
                        <role.icon className="text-xs" />
                        <span>{role.name}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-8" style={{ transform: "translateZ(20px)" }}>
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4" style={{ transform: "translateZ(35px)" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); openProjectModal(project, 0); }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <FaPlay /> Demo
                    </button>
                    <a
                      href={project.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 bg-slate-800 text-white border border-white/20 rounded-xl hover:bg-slate-700 transition-all duration-300 flex items-center justify-center hover:scale-105"
                    >
                      <FaGlobe className="text-xl" />
                    </a>
                  </div>

                  {project.androidDownload && project.windowsDownload && (
                    <div 
                      className="mt-4 overflow-hidden" 
                      style={{ 
                        opacity: hoveredProject === index ? 1 : 0,
                        height: hoveredProject === index ? "auto" : 0,
                        transition: "all 0.3s ease",
                        transform: "translateZ(20px)"
                      }}
                    >
                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <a
                          href={project.androidDownload}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-500 transition-colors"
                        >
                          <FaAndroid /> APK
                        </a>
                        <a
                          href={project.windowsDownload}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
                        >
                          <FaWindows /> EXE
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="text-center pb-20">
          <TiltCard className="inline-block w-full max-w-5xl">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] rounded-[32px] shadow-2xl">
              <div className="bg-slate-900 rounded-[30px] p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-wide" style={{ transform: "translateZ(30px)" }}>
                  🚀 Advanced Capabilities
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
                  {[
                    { icon: FaCreditCard, title: "Payments", desc: "Secure Processing", color: "from-purple-500 to-pink-500" },
                    { icon: FaUsers, title: "Access Control", desc: "RBAC Systems", color: "from-blue-500 to-cyan-500" },
                    { icon: FaRocket, title: "Modern Stack", desc: "Latest Frameworks", color: "from-green-500 to-teal-500" },
                    { icon: FaCode, title: "Compilers", desc: "Real-time Exec", color: "from-orange-500 to-yellow-500" }
                  ].map((feat, i) => (
                    <div key={i} className="text-center group/feature" style={{ transform: "translateZ(20px)" }}>
                      <div className={`bg-gradient-to-r ${feat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/feature:scale-110 transition-transform duration-300`}>
                        <feat.icon className="text-2xl text-white" />
                      </div>
                      <h3 className="font-bold mb-1 text-lg">{feat.title}</h3>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 overflow-y-auto custom-scrollbar">
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-500 text-white rounded-full p-2 transition-colors"
                >
                  <FaTimes />
                </button>

                {/* Image Slider */}
                <div className="relative h-64 sm:h-80 md:h-[500px] bg-black">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.images[currentImageIndex]}
                    alt="Project Preview"
                    className="w-full h-full object-contain"
                  />
                  
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-white/20 transition">
                    <FaArrowLeft />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-white/20 transition">
                    <FaArrowRight />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-xs text-white">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      <p className="text-slate-400 mb-6 text-lg">{selectedProject.description}</p>

                      <div className="mb-6">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2"><FaStar className="text-yellow-400"/> Key Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProject.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-300 bg-slate-800 p-3 rounded-lg border border-slate-700">
                              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                              <span className="text-sm">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                        <div>
                            <h4 className="text-white font-bold mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tech.map((t, i) => (
                                    <span key={i} className="bg-slate-800 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/30">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <a href={selectedProject.domain} target="_blank" rel="noreferrer" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
                                <FaGlobe /> Visit Site
                            </a>
                            {selectedProject.androidDownload && (
                                <a href={selectedProject.androidDownload} target="_blank" rel="noreferrer" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
                                    <FaAndroid /> Android App
                                </a>
                            )}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;