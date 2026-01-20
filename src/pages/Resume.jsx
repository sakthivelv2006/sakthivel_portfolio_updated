import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaDownload, FaEye, FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

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

const Resume = () => {

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);


  const fileId = "1X9LcFCQdhj-BdfzzDSvmlRBdZWr1q2Eo";
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

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

      <div className="relative z-10 w-full max-w-6xl px-6 mt-28 mb-16 flex flex-col items-center">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
           <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-lg mb-6">
             My Resume
           </h2>
           <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
             A detailed overview of my experience, skills, and qualifications. 
             Feel free to view it online or download a copy.
           </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12 w-full"
        >
            <TiltCard className="inline-block w-full md:w-auto h-auto min-h-[auto]">
               <a 
                 href={viewUrl} 
                 target="_blank" 
                 rel="noreferrer"
                 className="group relative bg-slate-900 rounded-xl p-1 block"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-slate-800 rounded-lg px-8 py-4 flex items-center justify-center gap-3 border border-white/10 hover:bg-slate-700 transition-colors">
                     <FaExternalLinkAlt className="text-cyan-400" />
                     <span className="font-bold text-white">Open in New Tab</span>
                  </div>
               </a>
            </TiltCard>

            <TiltCard className="inline-block w-full md:w-auto h-auto min-h-[auto]">
               <a 
                 href={viewUrl} // Google Drive download often works best by visiting the view URL and clicking download there, or using 'export=download' format if direct link needed.
                 className="group relative bg-slate-900 rounded-xl p-1 block"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-slate-800 rounded-lg px-8 py-4 flex items-center justify-center gap-3 border border-white/10 hover:bg-slate-700 transition-colors">
                     <FaDownload className="text-pink-400" />
                     <span className="font-bold text-white">Download PDF</span>
                  </div>
               </a>
            </TiltCard>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="w-full h-[800px]" // Fixed height container
        >
           <TiltCard>
              <div className="group relative h-full bg-slate-900 rounded-[30px] p-1 shadow-2xl">
                 {/* Neon Border */}
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-[30px] opacity-60 blur-md" />
                 
                 <div className="relative h-full bg-slate-900 rounded-[28px] overflow-hidden flex flex-col">
                    
                    {/* Fake Browser Header */}
                    <div className="h-12 bg-slate-800 border-b border-white/10 flex items-center px-6 gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       <div className="ml-4 bg-slate-900/50 px-4 py-1 rounded-md text-xs text-slate-400 font-mono border border-white/5 flex-1 text-center">
                          resume.pdf
                       </div>
                    </div>

                    {/* PDF Iframe */}
                    <div className="flex-1 bg-slate-800 relative w-full">
                       <iframe 
                          src={embedUrl}
                          className="w-full h-full border-none"
                          title="Sakthivel Resume"
                          allow="autoplay"
                       ></iframe>
                       
                       {/* Overlay to prevent stealing mouse focus during tilt interaction (Optional: remove 'pointer-events-none' below if scrolling inside tilt is needed, but usually bad UX) */}
                       {/* Note: I removed the overlay so user CAN scroll the PDF. 
                           The TiltCard component handles mouse moves on the CONTAINER, so scrolling inside iframe might be tricky.
                           Ideally for PDFs, we often disable tilt or make it very subtle. 
                           Here, I've kept it as per your request for "same 3d design". 
                       */}
                    </div>

                    {/* Gloss Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px]" style={{ transform: "translateZ(20px)" }} />
                 </div>
              </div>
           </TiltCard>
        </motion.div>

      </div>
    </div>
  );
}

export default Resume;