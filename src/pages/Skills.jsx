import React from 'react';
import { motion } from 'framer-motion';
import {
  FaJava, FaPython, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaAndroid,
  FaHtml5, FaCss3Alt, FaJs, FaCloud, FaRocket, FaCode, FaServer,
  FaMobile, FaTools, FaChartLine, FaDeploydog, FaLanguage, FaChess, FaFutbol, FaRunning
} from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiMysql, SiVercel, SiNetlify, SiJupyter } from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';

const Skills = () => {
  const skillsData = [
    {
      category: "Programming Languages",
      icon: <FaCode className="text-4xl" />,
      gradient: "from-purple-500 to-pink-500",
      items: [
        { name: "Java", icon: <FaJava />, color: "text-red-500" },
        { name: "C++", icon: <TbBrandCpp />, color: "text-blue-500" },
      ]
    },
    {
      category: "Frontend Development",
      icon: <FaReact className="text-4xl" />,
      gradient: "from-blue-500 to-cyan-500",
      items: [
        { name: "HTML & CSS", icon: <><FaHtml5 /><FaCss3Alt /></>, color: "text-orange-500" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6"
          >
            My Skills & Technologies
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of my technical expertise across various domains,
            from programming to sports and communication skills.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((skillCategory, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.05,
                transition: { type: "spring", stiffness: 150 }
              }}
              className="group cursor-pointer transform-gpu"
            >
              <div
                className={`relative h-full bg-gradient-to-br ${skillCategory.gradient} p-1 rounded-3xl shadow-2xl`}
              >
                <div className="relative bg-slate-800 rounded-2xl p-6 h-full overflow-hidden">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700 mb-4">
                      <div className="text-white">{skillCategory.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{skillCategory.category}</h3>
                  </div>

                  <div className="space-y-3">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-start gap-3 p-3 bg-slate-700 rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-300"
                      >
                        <div className={`text-lg ${skill.color}`}>{skill.icon}</div>
                        <h4 className="text-white font-semibold text-sm">{skill.name}</h4>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
