import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

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
      const res =await axios.post("https://gameappbackend-i8zv.onrender.com/api/feedback", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:json.stringify(formData),
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
  const cardVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }, hover: { scale: 1.05, y: -5, transition: { duration: 0.3 } } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10 max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-14">
          <motion.h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Get In Touch
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's connect and build something amazing together. I'm always open to new opportunities and exciting collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Connect With Me</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a key={index} href={info.link} target="_blank" rel="noopener noreferrer" variants={cardVariants} whileHover="hover" className={`bg-gradient-to-br ${info.color} p-1 rounded-2xl shadow-2xl`}>
                  <div className="bg-slate-800 rounded-xl p-6 h-full text-center hover:bg-slate-700/60 transition-all duration-300">
                    <div className="text-white mb-3 flex justify-center">{info.icon}</div>
                    <h3 className="text-white font-semibold mb-2">{info.label}</h3>
                    <p className="text-gray-300 text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            <motion.div variants={cardVariants} whileHover="hover" className="bg-gradient-to-br from-purple-500 to-pink-500 p-1 rounded-2xl shadow-2xl">
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <FaMapMarkerAlt className="text-2xl text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Location</h3>
                <p className="text-gray-300 text-sm">Tamil Nadu, India</p>
                <p className="text-gray-400 text-xs mt-2">Available for remote work worldwide</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Send Message</h2>
            <p className="text-gray-400 text-center mb-8">I'll get back to you within 24 hours</p>

            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
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
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition"
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
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
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
                  className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-3"
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
                  className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3"
                >
                  <FaExclamationTriangle className="text-red-400 text-xl" />
                  <div>
                    <p className="text-red-400 font-semibold">Error Sending Message</p>
                    <p className="text-red-300 text-sm">Please check your details and try again.</p>
                  </div>
                </motion.div>
              )}
              {status === "sending" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-blue-500/20 border border-blue-500 rounded-xl flex items-center gap-3"
                >
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <p className="text-blue-400 font-semibold">Sending Message</p>
                    <p className="text-blue-300 text-sm">Please wait...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
