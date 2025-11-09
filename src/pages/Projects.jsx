import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FaUserGraduate
} from "react-icons/fa";

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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-20 right-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-bounce animation-delay-3000"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Welcome to My Projects
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Discover my portfolio of cutting-edge web applications built with modern technologies, 
            featuring stunning user experiences and innovative solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group cursor-pointer"
            >
              <div className={`relative h-full bg-gradient-to-br ${project.gradient} p-1 rounded-3xl shadow-2xl transform-style-3d perspective-1000 hover:shadow-3xl transition-all duration-500`}>
                <div className="relative bg-slate-800 rounded-2xl p-6 h-full transform transition-all duration-500 group-hover:rotate-x-2 group-hover:translate-z-10 backface-hidden overflow-hidden">
                  
                  <div className="text-center mb-6">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-white mb-3"
                      whileHover={{ scale: 1.03 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <motion.div 
                    className="relative rounded-2xl overflow-hidden mb-6 shadow-2xl group/image"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 md:h-56 object-cover transform group-hover/image:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm border border-white border-opacity-30"
                      >
                        <FaPlay className="text-white text-xl md:text-2xl" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  </motion.div>

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {project.roles.map((role, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`bg-gradient-to-r ${role.color} text-white text-xs px-3 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white border-opacity-20`}
                      >
                        <role.icon className="text-xs" />
                        <span className="font-medium">{role.name}</span>
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {project.tech.map((tech, i) => (
                      <motion.span 
                        key={i}
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="bg-slate-700 text-gray-300 text-xs px-3 py-1 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openProjectModal(project, 0)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    >
                      <FaPlay className="group-hover/btn:scale-110 transition-transform" />
                      <span>View Demo</span>
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 text-white p-3 rounded-xl hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      <FaGlobe className="text-lg" />
                    </motion.a>
                  </div>

                  {project.androidDownload && project.windowsDownload && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredProject === index ? 1 : 0,
                        height: hoveredProject === index ? "auto" : 0
                      }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="flex gap-2">
                        <motion.a
                          href={project.androidDownload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.02, y: -1 }}
                        >
                          <FaAndroid />
                          Android APK
                        </motion.a>
                        <motion.a
                          href={project.windowsDownload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.02, y: -1 }}
                        >
                          <FaWindows />
                          Windows App
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}></div>
                
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-5`}>
                  <div className="absolute inset-0 rounded-3xl bg-slate-900 m-1"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 p-1 rounded-3xl shadow-2xl"
          >
            <div className="bg-slate-800 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                🚀 Advanced Features Included
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
                <motion.div 
                  className="text-center group/feature"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/feature:shadow-2xl transition-all duration-300">
                    <FaCreditCard className="text-2xl" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Payment Integration</h3>
                  <p className="text-gray-300 text-sm">Secure payment processing systems</p>
                </motion.div>
                <motion.div 
                  className="text-center group/feature"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/feature:shadow-2xl transition-all duration-300">
                    <FaUsers className="text-2xl" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Multi-role Access</h3>
                  <p className="text-gray-300 text-sm">Advanced role-based permissions</p>
                </motion.div>
                <motion.div 
                  className="text-center group/feature"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/feature:shadow-2xl transition-all duration-300">
                    <FaRocket className="text-2xl" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Modern Tech Stack</h3>
                  <p className="text-gray-300 text-sm">Latest technologies & frameworks</p>
                </motion.div>
                <motion.div 
                  className="text-center group/feature"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/feature:shadow-2xl transition-all duration-300">
                    <FaGraduationCap className="text-2xl" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">E-Learning Systems</h3>
                  <p className="text-gray-300 text-sm">Advanced educational platforms</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-slate-800 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform-style-3d perspective-1000 shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeProjectModal}
                  className="absolute top-6 right-6 z-10 bg-slate-700 rounded-full p-3 shadow-2xl hover:bg-slate-600 transition-all duration-300 border border-slate-600"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                <div className="relative">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-700 rounded-full p-4 shadow-2xl hover:bg-slate-600 transition-all duration-300 border border-slate-600"
                  >
                    <FaArrowLeft className="text-white text-xl" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-700 rounded-full p-4 shadow-2xl hover:bg-slate-600 transition-all duration-300 border border-slate-600"
                  >
                    <FaArrowRight className="text-white text-xl" />
                  </motion.button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <motion.h3 
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedProject.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-300 mb-6 text-lg leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedProject.description}
                      </motion.p>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                      >
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <FaStar className="text-yellow-400" />
                          Key Features:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProject.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className="flex items-center gap-3 text-gray-300 bg-slate-700 p-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-200"
                            >
                              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                              <span className="text-sm md:text-base">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="lg:w-2/5">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-6"
                      >
                        <h4 className="text-lg font-semibold text-white mb-3">Project Screenshots:</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedProject.images.map((img, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ${
                                i === currentImageIndex 
                                  ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-800 transform scale-105' 
                                  : 'opacity-70 hover:opacity-100'
                              }`}
                              onClick={() => setCurrentImageIndex(i)}
                            >
                              <img
                                src={img}
                                alt={`${selectedProject.title} ${i + 1}`}
                                className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-3"
                      >
                        <motion.a
                          href={selectedProject.domain}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                        >
                          <FaGlobe />
                          Visit Live Website
                        </motion.a>
                        
                        {selectedProject.androidDownload && selectedProject.windowsDownload && (
                          <>
                            <motion.a
                              href={selectedProject.androidDownload}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <FaAndroid />
                              Download Android APK
                            </motion.a>
                            <motion.a
                              href={selectedProject.windowsDownload}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <FaWindows />
                              Download Windows App
                            </motion.a>
                          </>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;