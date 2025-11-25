import React from "react";
import { motion } from "framer-motion";
import { 
  FaCode, 
  FaLaptopCode, 
  FaChartLine, 
  FaGraduationCap, 
  FaBriefcase, 
  FaRocket,
  FaUser,
  FaMapMarkerAlt,
  FaUniversity,
  FaAward,
  FaCalendarAlt,
  FaHeart,
  FaLightbulb
} from "react-icons/fa";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
         
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            About Me
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Hi, I'm <span className="font-bold text-white">Sakthivel V</span> — a passionate{" "}
            <span className="text-cyan-400 font-semibold">Full Stack Developer</span> and technology enthusiast 
            dedicated to crafting exceptional digital experiences and solving real-world problems through code.
          </motion.p>

          {/* Personal Info Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <FaUniversity className="text-2xl text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold">College</h3>
                  <p className="text-gray-300 text-sm">Sri Krishna College of Technology</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500/20 p-3 rounded-xl">
                  <FaGraduationCap className="text-2xl text-cyan-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold">Degree</h3>
                  <p className="text-gray-300 text-sm">B.E. Computer Science</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <FaAward className="text-2xl text-green-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold">CGPA</h3>
                  <p className="text-gray-300 text-sm">8.0 Current</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Technical Skills */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 rounded-3xl shadow-2xl">
              <div className="relative bg-slate-800 rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.1 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
                    <FaCode className="text-2xl text-purple-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Technical Skills</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    <span><strong className="text-cyan-400">Frontend:</strong> React, HTML5, JavaScript</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span><strong className="text-green-400">Backend:</strong> Node.js, Express, Spring Boot</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span><strong className="text-blue-400">Database:</strong> MongoDB, MySQL</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span><strong className="text-yellow-400">Mobile:</strong> Android, Flutter(Using AI)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span><strong className="text-pink-400">Tools:</strong> Git, VS Code, Postman</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Details */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-gradient-to-br from-cyan-500 to-blue-500 p-1 rounded-3xl shadow-2xl">
              <div className="relative bg-slate-800 rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.1 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 mb-4">
                    <FaGraduationCap className="text-2xl text-cyan-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Education</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div className="bg-slate-700/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">Sri Krishna College of Technology</h4>
                    <p className="text-sm mb-1">Bachelor of Engineering - Computer Science</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        2023 - 2027
                      </span>
                      <span className="flex items-center gap-1">
                        <FaAward />
                        CGPA: 8.0
                      </span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Currently pursuing my degree with focus on{" "}
                    <span className="text-cyan-400">Software Engineering</span>,{" "}
                    <span className="text-cyan-400">Web Technologies</span>, and{" "}
                    <span className="text-cyan-400">Data Structures</span>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Professional Goals */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-gradient-to-br from-orange-500 to-red-500 p-1 rounded-3xl shadow-2xl">
              <div className="relative bg-slate-800 rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.1 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 mb-4">
                    <FaRocket className="text-2xl text-orange-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Career Goals</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center gap-2">
                    <FaLightbulb className="text-yellow-400" />
                    Become a Full Stack Developer
                  </p>
                  <p className="flex items-center gap-2">
                    <FaHeart className="text-pink-400" />
                    Build impactful products
                  </p>
                  <p className="flex items-center gap-2">
                    <FaChartLine className="text-green-400" />
                    Master modern technologies
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCode className="text-cyan-400" />
                    Contribute to open source
                  </p>
                  <p className="text-sm mt-4 bg-slate-700/30 p-3 rounded-lg">
                    "Striving to create technology that makes a difference in people's lives."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects & Experience */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-gradient-to-br from-green-500 to-emerald-500 p-1 rounded-3xl shadow-2xl">
              <div className="relative bg-slate-800 rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.1 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                    <FaBriefcase className="text-2xl text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Projects & Experience</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p className="text-sm">
                    <strong className="text-green-400">Full Stack Applications:</strong> Built multiple web apps with modern technologies
                  </p>
                  <p className="text-sm">
                    <strong className="text-green-400">Real Integrations:</strong> Payment gateways, email services, cloud storage
                  </p>
                  <p className="text-sm">
                    <strong className="text-green-400">Deployment:</strong> Vercel, Render, Netlify, MongoDB Atlas
                  </p>
                  <p className="text-sm">
                    <strong className="text-green-400">Mobile Development:</strong> Android apps with Java & Flutter
                  </p>
                  <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                    <p className="text-xs text-gray-400">
                      "From concept to deployment, I handle the complete development lifecycle."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests & Passion */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-gradient-to-br from-yellow-500 to-amber-500 p-1 rounded-3xl shadow-2xl">
              <div className="relative bg-slate-800 rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.1 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
                    <FaLaptopCode className="text-2xl text-yellow-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Interests & Passion</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Full Stack Development
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Data Structures & Algorithms
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Machine Learning Basics
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Mobile App Development
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    UI/UX Design Principles
                  </p>
                  <p className="text-sm mt-3">
                    Always exploring new technologies and frameworks to stay updated with industry trends.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
          >
            <div className="relative h-full bg-gradient-to-br from-pink-500 to-rose-500 p-1 rounded-3xl shadow-2xl">
              <div className="relative bg-slate-800 rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.1 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 mb-4">
                    <FaChartLine className="text-2xl text-pink-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Let's Connect!</h3>
                </div>
                <div className="space-y-4 text-gray-300 text-center">
                  <p className="text-sm">
                    I'm actively looking for <strong className="text-pink-400">internship opportunities</strong>,{" "}
                    <strong className="text-pink-400">freelance projects</strong>, and{" "}
                    <strong className="text-pink-400">collaborations</strong>.
                  </p>
                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <p className="text-white font-semibold mb-2">Ready to work on:</p>
                    <ul className="text-xs space-y-1 text-gray-400">
                      <li>• Web Application Development</li>
                      <li>• Mobile App Projects</li>
                      <li>• API Development</li>
                      <li>• Full Stack Solutions</li>
                    </ul>
                  </div>
                  <p className="text-sm text-pink-400 font-semibold">
                    Open to discussions and new opportunities!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 p-1 rounded-2xl"
          >
            <div className="bg-slate-800 rounded-xl px-8 py-4">
              <p className="text-white text-lg">
                Interested in working together?{" "}
                <span className="text-cyan-400 font-semibold">Let's build something amazing!</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;