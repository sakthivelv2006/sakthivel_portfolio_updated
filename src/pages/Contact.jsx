import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaWhatsapp, FaGithub, FaLinkedin,
  FaPaperPlane, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!validatePhone(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!validateEmail(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateForm()) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
      setIsSubmitting(false);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://gameappbackend-i8zv.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus(""), 3000);
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: "Email",
      value: "sakthivelv202222@gmail.com",
      link: "mailto:sakthivelv202222@gmail.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: "Phone",
      value: "+91 9361586944",
      link: "tel:9361586944",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      label: "WhatsApp",
      value: "+91 9361586944",
      link: "https://wa.me/9361586944",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <FaGithub className="text-2xl" />,
      label: "GitHub",
      value: "sakthivel182006",
      link: "https://github.com/sakthivel182006",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: <SiLeetcode className="text-2xl" />,
      label: "LeetCode",
      value: "sakthivelv202222",
      link: "https://leetcode.com/u/sakthivelv202222/",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      label: "LinkedIn",
      value: "sakthivel2006",
      link: "https://www.linkedin.com/in/sakthivel2006",
      color: "from-blue-600 to-blue-800",
    },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden perspective-2000">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-14" style={{ transformStyle: "preserve-3d" }}>
          <motion.h1 
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 drop-shadow-lg"
            style={{ transform: "translateZ(50px)" }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ transform: "translateZ(30px)" }}
          >
            Let's connect and build something amazing together. I'm always open to new opportunities and exciting collaborations.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 perspective-container">
          
          {/* Left Column: Contact Info Cards */}
          <motion.div variants={itemVariants} className="space-y-6" style={{ transformStyle: "preserve-3d" }}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center lg:text-left" style={{ transform: "translateZ(20px)" }}>Connect With Me</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <TiltCard key={index}>
                  <motion.a 
                    href={info.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block h-full"
                  >
                    <div className={`relative h-full bg-gradient-to-br ${info.color} p-[2px] rounded-[24px] shadow-lg hover:shadow-2xl transition-shadow`}>
                      <div className="bg-slate-900 rounded-[22px] p-6 h-full text-center relative overflow-hidden">
                         {/* Gloss Effect */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{transform: "translateZ(10px)"}} />
                         
                         <div className="text-white mb-3 flex justify-center" style={{ transform: "translateZ(30px)" }}>
                            {info.icon}
                         </div>
                         <h3 className="text-white font-semibold mb-2" style={{ transform: "translateZ(20px)" }}>{info.label}</h3>
                         <p className="text-gray-400 text-sm" style={{ transform: "translateZ(15px)" }}>{info.value}</p>
                      </div>
                    </div>
                  </motion.a>
                </TiltCard>
              ))}
            </div>

            {/* Location Card */}
            <TiltCard>
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] rounded-[24px] shadow-2xl">
                <div className="bg-slate-900 rounded-[22px] p-6 text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                   
                   <div style={{ transform: "translateZ(30px)" }}>
                      <FaMapMarkerAlt className="text-3xl text-pink-400 mb-3 mx-auto drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                   </div>
                   <h3 className="text-white font-bold text-lg mb-2" style={{ transform: "translateZ(20px)" }}>Location</h3>
                   <p className="text-gray-300 text-sm" style={{ transform: "translateZ(15px)" }}>Tamil Nadu, India</p>
                   <p className="text-green-400 text-xs mt-2 font-semibold" style={{ transform: "translateZ(15px)" }}>Available for remote work worldwide</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: 3D Contact Form */}
          <motion.div variants={itemVariants} style={{ transformStyle: "preserve-3d" }}>
            <TiltCard>
              <div className="relative h-full bg-gradient-to-br from-slate-700 to-slate-800 p-[2px] rounded-[30px] shadow-2xl">
                <form 
                  onSubmit={handleSubmit} 
                  className="bg-slate-900/90 backdrop-blur-xl rounded-[28px] p-8 h-full border border-white/5 relative overflow-hidden"
                >
                  {/* Background Icon Decoration */}
                  <FaPaperPlane className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12" style={{ transform: "translateZ(10px)" }} />

                  <h2 className="text-3xl font-bold text-white mb-2 text-center" style={{ transform: "translateZ(30px)" }}>Send Message</h2>
                  <p className="text-gray-400 text-center mb-8" style={{ transform: "translateZ(20px)" }}>I'll get back to you within 24 hours</p>

                  <div className="space-y-6 relative z-10" style={{ transform: "translateZ(25px)" }}>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition shadow-inner"
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition shadow-inner"
                          placeholder="+91 9361586944"
                          required
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition shadow-inner"
                          placeholder="sakthivelv202222@gmail.com"
                          required
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition shadow-inner"
                        placeholder="Tell me about your project or just say hello..."
                        required
                      ></textarea>
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Send Message
                        </>
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 backdrop-blur-md"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <FaCheckCircle className="text-green-400 text-xl" />
                        <div>
                          <p className="text-green-400 font-semibold">Message Sent!</p>
                          <p className="text-green-300 text-sm">I'll get back to you soon.</p>
                        </div>
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 backdrop-blur-md"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <FaExclamationTriangle className="text-red-400 text-xl" />
                        <div>
                          <p className="text-red-400 font-semibold">Error Sending Message</p>
                          <p className="text-red-300 text-sm">Please check your details and try again.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Contact;