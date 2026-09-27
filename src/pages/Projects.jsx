import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

import {
  FaGlobe,
  FaDownload,
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
  FaCode,
  FaTimes,
  FaExternalLinkAlt,
  FaBriefcase,
  FaMobileAlt,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaVideo,
  FaComment,
  FaCloud,
  FaDatabase,
  FaThLarge,
  FaDesktop,
  FaEnvelope,
} from "react-icons/fa";

import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiMongodb,
  SiFlutter,
  SiAndroidstudio,
  SiCloudinary,
  SiRazorpay,
} from "react-icons/si";

/* =========================================================
   EXISTING WEB PROJECT IMAGES
   ========================================================= */

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

/* =========================================================
   PROJECT 6 + ANDROID IMAGES
   Automatically loads every image from these folders.
   ========================================================= */

const project6ImagesMap = import.meta.glob(
  "../assets/projects/project6/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const androidImagesMap = import.meta.glob(
  "../assets/androidprojectimages/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

/* =========================================================
   HELPERS
   ========================================================= */

const sortImages = (entries) => {
  return entries
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    )
    .map(([, src]) => src);
};

const project6Images = sortImages(Object.entries(project6ImagesMap));

const getAndroidImages = (folderName) => {
  const folder = `/androidprojectimages/${folderName.toLowerCase()}/`;

  return sortImages(
    Object.entries(androidImagesMap).filter(([path]) =>
      path.toLowerCase().includes(folder)
    )
  );
};

/* =========================================================
   3D TILT CARD
   ========================================================= */

const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, {
    stiffness: 300,
    damping: 30,
  });

  const mouseY = useSpring(y, {
    stiffness: 300,
    damping: 30,
  });

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["7deg", "-7deg"]
  );

  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["-7deg", "7deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseXFromCenter =
      e.clientX - rect.left - rect.width / 2;

    const mouseYFromCenter =
      e.clientY - rect.top - rect.height / 2;

    x.set(mouseXFromCenter / rect.width);
    y.set(mouseYFromCenter / rect.height);
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
      className={`h-full perspective-[1200px] ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* =========================================================
   PROJECT DATA
   ========================================================= */

const webProjects = [
  {
    title: "Sakthi Insurance",
    domain: "https://sakthiinsurance.vercel.app/",
    description:
      "Comprehensive insurance management system with role-based access, policy management, claims processing and secure payment integration.",
    category: "Web Application",
    gradient: "from-orange-500 via-red-500 to-pink-500",

    roles: [
      {
        name: "Admin",
        icon: FaUsers,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "Agent",
        icon: FaUsers,
        color: "from-orange-500 to-yellow-500",
      },
      {
        name: "Customer",
        icon: FaCreditCard,
        color: "from-green-500 to-emerald-500",
      },
    ],

    tech: [
      "React.js",
      "Spring Boot",
      "MySQL",
      "Tailwind CSS",
      "Razorpay",
      "SMTP",
    ],

    features: [
      "Policy Management",
      "Claims Processing",
      "Agent Portal",
      "Customer Dashboard",
      "Payment Integration",
      "Document Verification",
    ],

    images: [
      project21firstimage,
      project22firstimage,
      project23firstimage,
      project24firstimage,
      project25firstimage,
    ],
  },

  {
    title: "Learn From Sakthi & Gaming Platform",
    domain: "https://learnfromsakthi.vercel.app/",
    description:
      "Advanced e-learning platform with payment integration, course management, live classes, progress tracking and multi-level access.",
    category: "Web Application",
    gradient: "from-purple-500 via-blue-500 to-cyan-500",

    roles: [
      {
        name: "Admin",
        icon: FaUsers,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "College",
        icon: FaUsers,
        color: "from-blue-500 to-cyan-500",
      },
      {
        name: "Teacher",
        icon: FaGraduationCap,
        color: "from-green-500 to-emerald-500",
      },
      {
        name: "Student",
        icon: FaUserGraduate,
        color: "from-purple-500 to-indigo-500",
      },
    ],

    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "HTML",
      "Razorpay",
      "SMTP",
    ],

    features: [
      "Payment Gateway",
      "Live Classes",
      "Course Management",
      "Progress Tracking",
      "Certification",
      "Multi-tier Access",
    ],

    images: [
      project11firstimage,
      project12firstimage,
      project13firstimage,
      project14firstimage,
      project15firstimage,
    ],
  },

  {
    title: "Social Platform Pro",
    domain: "https://sakthisoftwaresolutions.vercel.app",
    description:
      "Next-generation social platform supporting reels, image posts, video uploads, comments, real-time interactions and cloud media storage.",
    category: "Web Application",
    gradient: "from-green-500 via-teal-500 to-cyan-500",

    roles: [
      {
        name: "Admin",
        icon: FaUsers,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "User",
        icon: FaUsers,
        color: "from-green-500 to-teal-500",
      },
    ],

    tech: [
      "Flutter",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "WebSocket",
    ],

    features: [
      "Reels Sharing",
      "Video Upload",
      "Image Posts",
      "Comments & Likes",
      "Real-time Chat",
      "Cloud Media Storage",
    ],

    images: [
      project31firstimage,
      project32firstimage,
      project33firstimage,
      project34firstimage,
      project35firstimage,
    ],
  },

  {
    title: "Sakthivel E-Learning",
    domain: "https://sakthivelvlearningapp.vercel.app/",
    description:
      "Free e-learning application with learner portal, course progress, admin dashboard, community support and cloud media management.",
    category: "Web Application",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",

    roles: [
      {
        name: "Admin",
        icon: FaUsers,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "Learners",
        icon: FaUserGraduate,
        color: "from-indigo-500 to-purple-500",
      },
    ],

    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
    ],

    features: [
      "Free Courses",
      "Progress Tracking",
      "Admin Dashboard",
      "Learner Portal",
      "Community Support",
      "Cloud Media",
    ],

    images: [
      project41firstimage,
      project42firstimage,
      project43firstimage,
      project44firstimage,
      project45firstimage,
    ],
  },

  {
    title: "Sakthivel Online Code Editor",
    domain: "https://sakthijavacompiler.vercel.app/",
    description:
      "Online code editor supporting Java, C++ and Python with real-time compilation, Monaco Editor and WebAssembly-based execution.",
    category: "Web Application",
    gradient: "from-yellow-500 via-orange-500 to-red-500",

    roles: [
      {
        name: "Admin",
        icon: FaUsers,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "Developer",
        icon: FaCode,
        color: "from-yellow-500 to-orange-500",
      },
    ],

    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "WebAssembly",
      "Monaco Editor",
    ],

    features: [
      "Multi-language Support",
      "Real-time Compilation",
      "Code Sharing",
      "Syntax Highlighting",
      "Project Management",
      "Developer Tools",
    ],

    images: [
      project51firstimage,
      project52firstimage,
      project53firstimage,
      project54firstimage,
      project55firstimage,
    ],
  },

  {
    title: "Sri Amman Hydraulics & Welding",
    domain: "https://sriammanjobportal.vercel.app/",
    description:
      "Job and earth-mover service platform connecting customers with earth-moving and construction-related services across Erode, Sathyamangalam, Tamil Nadu, Kerala and Karnataka. Customers can explore services, contact providers and apply for available jobs while administrators verify applications and manage access.",
    category: "Web Application",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",

    roles: [
      {
        name: "Admin",
        icon: FaUsers,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "Customer",
        icon: FaBriefcase,
        color: "from-green-500 to-emerald-500",
      },
    ],

    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "SEO",
    ],

    features: [
      "Admin & Customer Access",
      "Earth-Mover Services",
      "Job Applications",
      "Customer Enquiries",
      "Application Verification",
      "Regional Service Management",
    ],

    images: project6Images,
  },
];

/* =========================================================
   ANDROID PROJECTS
   ========================================================= */

const androidProjects = [
  {
    title: "Sri Amman Hydraulics & Welding",
    description:
      "Mobile application for customers to explore earth-moving and construction services, contact service providers and apply for available jobs. Admin users can verify applications and manage the platform.",

    gradient: "from-orange-500 via-red-500 to-pink-500",

    tech: [
      "Flutter",
      "Spring Boot",
      "Firebase",
      "Cloudinary",
      "REST API",
    ],

    features: [
      "Admin & Customer Roles",
      "Earth-Mover Services",
      "Job Applications",
      "Customer Enquiries",
      "Application Verification",
    ],

    images: getAndroidImages(
      "sriammanhydraulicsandwelding"
    ),

    apkLink:
      "https://drive.google.com/file/d/1IY6D-dnbtap663_LkVewbDlz2oa2aoPf/view?usp=drive_link",
  },

  {
    title: "Sakthivel Software Solutions",
    description:
      "Social media and developer-focused application where users can upload short videos, publish image posts, like and comment on content, while also accessing important DSA source code and programming problems.",

    gradient: "from-green-500 via-teal-500 to-cyan-500",

    tech: [
      "Flutter",
      "Spring Boot",
      "Cloudinary",
      "Firebase",
      "REST API",
    ],

    features: [
      "Short Video Upload",
      "Image Posts",
      "Likes & Comments",
      "DSA Source Code",
      "Important Coding Problems",
      "Cloud Media Storage",
    ],

    images: getAndroidImages(
      "sakthivelsoftwaresolutions"
    ),

    apkLink:
      "https://drive.google.com/file/d/1M97mrhZdiRwhIxE6ABxKPzNKi1sqC7Ql/view?usp=drive_link",
  },

  {
    title: "LifeLink",
    description:
      "Final-year safety wearable application designed for trekking and travel scenarios where internet connectivity may not be available. The application communicates with wearable devices through Bluetooth and supports SOS communication using LoRa technology between trekkers and rescue management.",

    gradient: "from-blue-500 via-cyan-500 to-emerald-500",

    tech: [
      "Flutter",
      "LoRa",
      "Bluetooth",
      "GPS"
    ],

    features: [
      "Offline Emergency Communication",
      "LoRa Message Transfer",
      "Bluetooth Wearable Connection",
      "Manual SOS",
      "SOS Forwarding",
      "Rescue Communication",
    ],

    images: getAndroidImages("lifelink"),

    apkLink:
      "https://drive.google.com/file/d/1obK1QduliwvDRLxdRsv82wsN55lUo5tE/view?usp=drive_link",
  },

  {
    title: "Cricket Tournament App",
    description:
      "Tournament management application where cricket teams can register, add players and participate in tournaments. Cricket managers can review and verify teams before allowing them to participate.",

    gradient: "from-yellow-500 via-orange-500 to-red-500",

    tech: [
      "Flutter",
      "Firebase",
      "Cloud Storage",
      "REST API",
    ],

    features: [
      "Team Registration",
      "Player Management",
      "Tournament Management",
      "Team Verification",
      "Cricket Manager Access",
    ],

    images: getAndroidImages("crickettournamentapp"),

    apkLink: null,
  },
];

/* =========================================================
   IMAGE CAROUSEL
   ========================================================= */

const ProjectImage = ({
  project,
  onOpen,
  large = false,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = project.images || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setImageIndex((previous) =>
        previous === images.length - 1
          ? 0
          : previous + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
        No preview image available
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black cursor-pointer group/image ${
        large ? "h-[420px]" : "h-[245px]"
      }`}
      onClick={() => onOpen(project, imageIndex)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[imageIndex]}
          src={images[imageIndex]}
          alt={`${project.title} preview`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/45 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover/image:opacity-100 transition-all duration-300 bg-white/15 backdrop-blur-md border border-white/30 rounded-full p-5">
          <FaPlay className="text-white text-xl" />
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === imageIndex
                  ? "w-5 bg-cyan-400"
                  : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white">
        {imageIndex + 1}/{images.length}
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState(null);

  const [selectedProjectType, setSelectedProjectType] =
    useState("web");

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  /* =======================================================
     STAR BACKGROUND
     ======================================================= */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const stars = [];

    for (let i = 0; i < 260; i++) {
      stars.push({
        x:
          Math.random() * canvas.width -
          canvas.width / 2,

        y:
          Math.random() * canvas.height -
          canvas.height / 2,

        z: Math.random() * canvas.width,

        speed: 0.35 + Math.random() * 0.9,
      });
    }

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.save();

      ctx.translate(
        canvas.width / 2,
        canvas.height / 2
      );

      stars.forEach((star) => {
        star.z -= star.speed;

        if (star.z <= 0) {
          star.z = canvas.width;
        }

        const k = 400 / star.z;

        const x = star.x * k;
        const y = star.y * k;

        const size =
          (1 - star.z / canvas.width) * 2.8;

        ctx.fillStyle = "rgba(255,255,255,0.85)";

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          Math.max(size, 0.3),
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      ctx.restore();

      rafRef.current =
        requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  /* =======================================================
     MODAL
     ======================================================= */

  const openProjectModal = (
    project,
    index = 0,
    type = "web"
  ) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
    setSelectedProjectType(type);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject?.images?.length) return;

    setCurrentImageIndex((previous) =>
      previous ===
      selectedProject.images.length - 1
        ? 0
        : previous + 1
    );
  };

  const previousImage = () => {
    if (!selectedProject?.images?.length) return;

    setCurrentImageIndex((previous) =>
      previous === 0
        ? selectedProject.images.length - 1
        : previous - 1
    );
  };

  /* =======================================================
     FILTERS
     ======================================================= */

  const displayedWebProjects = useMemo(() => {
    if (activeFilter === "all") {
      return webProjects;
    }

    if (activeFilter === "springboot") {
      return webProjects.filter((project) =>
        project.tech.some((tech) =>
          tech
            .toLowerCase()
            .includes("spring")
        )
      );
    }

    if (activeFilter === "react") {
      return webProjects.filter((project) =>
        project.tech.some((tech) =>
          tech
            .toLowerCase()
            .includes("react")
        )
      );
    }

    if (activeFilter === "node") {
      return webProjects.filter((project) =>
        project.tech.some((tech) =>
          tech
            .toLowerCase()
            .includes("node")
        )
      );
    }

    return webProjects;
  }, [activeFilter]);

  /* =======================================================
     ANIMATIONS
     ======================================================= */

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  /* =======================================================
     PROJECT CARD
     ======================================================= */

  const renderProjectCard = (
    project,
    index,
    type = "web"
  ) => {
    const isAndroid = type === "android";

    return (
      <motion.div
        key={`${type}-${project.title}-${index}`}
        variants={itemVariants}
      >
        <TiltCard className="h-full">
          <div
            className={`relative h-full p-[1.5px] rounded-[28px] bg-gradient-to-br ${project.gradient}`}
          >
            <div className="relative h-full bg-slate-950/95 rounded-[27px] overflow-hidden p-5 sm:p-6">

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">

                {/* IMAGE */}
                <ProjectImage
                  project={project}
                  onOpen={(item, imageIndex) =>
                    openProjectModal(
                      item,
                      imageIndex,
                      type
                    )
                  }
                />

                {/* TITLE */}
                <div className="mt-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {isAndroid && (
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-green-500/10 border border-green-400/20 flex items-center justify-center">
                        <FaAndroid className="text-green-400 text-xl" />
                      </div>
                    )}
                  </div>

                  {/* ROLES */}
                  {project.roles && (
                    <div className="flex flex-wrap gap-2 mt-4">

                      {project.roles.map(
                        (role, roleIndex) => {
                          const RoleIcon =
                            role.icon;

                          return (
                            <span
                              key={roleIndex}
                              className={`bg-gradient-to-r ${role.color} text-white text-[10px] sm:text-xs font-bold uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
                            >
                              <RoleIcon />

                              {role.name}
                            </span>
                          );
                        }
                      )}

                    </div>
                  )}

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2 mt-4">

                    {project.tech.map(
                      (tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors"
                        >
                          {tech}
                        </span>
                      )
                    )}

                  </div>

                  {/* ACTION */}
                  <div className="mt-5">

                    {!isAndroid ? (
                      <a
                        href={project.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                      >
                        <FaExternalLinkAlt className="text-sm" />

                        Click Here to View
                        Application
                      </a>
                    ) : (
                      <>
                        {project.apkLink ? (
                          <a
                            href={project.apkLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300"
                          >
                            <FaDownload />

                            Download APK
                          </a>
                        ) : (
                          <button
                            disabled
                            className="w-full py-3.5 rounded-xl bg-slate-800 text-slate-500 border border-slate-700 font-bold flex items-center justify-center gap-2 cursor-not-allowed"
                          >
                            <FaDownload />

                            APK Coming Soon
                          </button>
                        )}
                      </>
                    )}

                  </div>

                </div>
              </div>

            </div>
          </div>
        </TiltCard>
      </motion.div>
    );
  };

  /* =======================================================
     RETURN
     ======================================================= */

  return (
    <div className="min-h-screen bg-[#07101f] text-white relative overflow-hidden">

      {/* ===================================================
          BACKGROUND
          =================================================== */}

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]"
        />

      </div>

      {/* ===================================================
          CONTENT
          =================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-center mb-12"
        >

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            My Projects
          </h1>

          <p className="max-w-3xl mx-auto mt-5 text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore my web applications and Android
            applications built with modern technologies,
            real-world features and scalable architectures.
          </p>

        </motion.div>

        {/* =================================================
            FILTERS
            ================================================= */}

       {/* =================================================
    PROJECT FILTER / TECHNOLOGY STACK
    ================================================= */}

<motion.div
  initial={{
    opacity: 0,
    scale: 0.95,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 0.6,
    delay: 0.2,
  }}
  className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 max-w-7xl mx-auto"
>

  {/* ALL PROJECTS */}

  <button
    onClick={() => {
      setActiveFilter("all");

      document
        .getElementById("web-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className={`group flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 font-semibold text-sm sm:text-base ${
      activeFilter === "all"
        ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-lg shadow-purple-500/30 scale-105"
        : "bg-white/[0.03] border-white/15 text-slate-300 hover:border-cyan-400/50 hover:text-white hover:bg-white/[0.06]"
    }`}
  >
    <FaThLarge className="text-sm" />

    <span>All Projects</span>
  </button>


  {/* WEB APPLICATIONS */}

  <button
    onClick={() => {
      setActiveFilter("all");

      document
        .getElementById("web-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <FaDesktop className="text-cyan-400" />

    <span>Web Applications</span>
  </button>


  {/* ANDROID APPLICATIONS */}

  <button
    onClick={() => {
      document
        .getElementById("android-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-green-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <FaAndroid className="text-green-400" />

    <span>Android Applications</span>
  </button>


  {/* REACT.JS */}

  <button
    onClick={() => {
      setActiveFilter("react");

      document
        .getElementById("web-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiReact className="text-cyan-400" />

    <span>React.js</span>
  </button>


  {/* NODE.JS */}

  <button
    onClick={() => {
      setActiveFilter("node");

      document
        .getElementById("web-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-green-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiNodedotjs className="text-green-400" />

    <span>Node.js</span>
  </button>


  {/* EXPRESS.JS */}

  <button
    onClick={() => {
      setActiveFilter("all");
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-gray-300/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiExpress className="text-gray-300" />

    <span>Express.js</span>
  </button>


  {/* SPRING BOOT */}

  <button
    onClick={() => {
      setActiveFilter("springboot");

      document
        .getElementById("web-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-green-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiSpringboot className="text-green-400" />

    <span>Spring Boot</span>
  </button>


  {/* MONGODB */}

  <button
    onClick={() => {
      setActiveFilter("all");
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-green-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiMongodb className="text-green-500" />

    <span>MongoDB</span>
  </button>


  {/* MERN STACK */}

  <button
    onClick={() => {
      setActiveFilter("all");
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-purple-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <FaDatabase className="text-purple-400" />

    <span>MERN Stack</span>
  </button>


  {/* FLUTTER */}

  <button
    onClick={() => {
      document
        .getElementById("android-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiFlutter className="text-cyan-400" />

    <span>Flutter</span>
  </button>


  {/* ANDROID STUDIO */}

  <button
    onClick={() => {
      document
        .getElementById("android-projects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-green-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiAndroidstudio className="text-green-400" />

    <span>Android Studio</span>
  </button>


  {/* CLOUDINARY */}

  <button
    onClick={() => {
      setActiveFilter("all");
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiCloudinary className="text-blue-400" />

    <span>Cloudinary</span>
  </button>


  {/* RAZORPAY */}

  <button
    onClick={() => {
      setActiveFilter("all");
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <SiRazorpay className="text-blue-400" />

    <span>Razorpay</span>
  </button>


  {/* SMTP */}

  <button
    onClick={() => {
      setActiveFilter("all");
    }}
    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-red-400/50 hover:bg-white/[0.06] transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    <FaEnvelope className="text-red-400" />

    <span>SMTP</span>
  </button>

</motion.div>


        {/* =================================================
            WEB APPLICATIONS
            ================================================= */}

        <motion.section
          id="web-projects"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >

          <div className="rounded-[30px] p-[1.5px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">

            <div className="bg-[#091326]/95 rounded-[29px] p-5 sm:p-7 lg:p-9">

              {/* SECTION HEADER */}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                      <FaGlobe className="text-cyan-400 text-xl" />
                    </div>

                    <div>

                      <h2 className="text-2xl sm:text-3xl font-black text-white">
                        Web Applications
                      </h2>

                      <p className="text-slate-400 text-sm mt-1">
                        Full-stack web applications
                        built with modern technologies
                      </p>

                    </div>

                  </div>

                </div>

                <span className="self-start sm:self-auto px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-sm font-bold">
                  {displayedWebProjects.length} Projects
                </span>

              </div>

              {/* EXACTLY 2 PER ROW */}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

                {displayedWebProjects.map(
                  (project, index) =>
                    renderProjectCard(
                      project,
                      index,
                      "web"
                    )
                )}

              </div>

            </div>

          </div>

        </motion.section>

        {/* =================================================
            ANDROID APPLICATIONS
            ================================================= */}

        <motion.section
          id="android-projects"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >

          <div className="rounded-[30px] p-[1.5px] bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500">

            <div className="bg-[#061b1c]/95 rounded-[29px] p-5 sm:p-7 lg:p-9">

              {/* SECTION HEADER */}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center">
                      <FaAndroid className="text-green-400 text-2xl" />
                    </div>

                    <div>

                      <h2 className="text-2xl sm:text-3xl font-black text-white">
                        Android Applications
                      </h2>

                      <p className="text-slate-400 text-sm mt-1">
                        Flutter mobile applications
                        built for Android
                      </p>

                    </div>

                  </div>

                </div>

                <span className="self-start sm:self-auto px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-sm font-bold">
                  {androidProjects.length} Android Apps
                </span>

              </div>

              {/* EXACTLY 2 PER ROW */}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

                {androidProjects.map(
                  (project, index) =>
                    renderProjectCard(
                      project,
                      index,
                      "android"
                    )
                )}

              </div>

            </div>

          </div>

        </motion.section>

        {/* =================================================
            TECHNOLOGY SUMMARY
            ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-10"
        >

          <div className="rounded-[30px] p-[1.5px] bg-gradient-to-r from-purple-500 to-cyan-500">

            <div className="bg-[#091326]/95 rounded-[29px] p-8 sm:p-10">

              <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
                🚀 Technologies & Capabilities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                {[
                  {
                    icon: FaCreditCard,
                    title: "Payments",
                    desc: "Razorpay & APIs",
                    gradient:
                      "from-purple-500 to-pink-500",
                  },

                  {
                    icon: FaUsers,
                    title: "Access Control",
                    desc: "Role-Based Systems",
                    gradient:
                      "from-blue-500 to-cyan-500",
                  },

                  {
                    icon: FaDatabase,
                    title: "Databases",
                    desc: "MySQL & MongoDB",
                    gradient:
                      "from-green-500 to-emerald-500",
                  },

                  {
                    icon: FaCloud,
                    title: "Cloud",
                    desc: "Cloudinary & Firebase",
                    gradient:
                      "from-orange-500 to-yellow-500",
                  },
                ].map((item, index) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="text-center"
                    >

                      <div
                        className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg mb-3`}
                      >
                        <Icon className="text-xl text-white" />
                      </div>

                      <h3 className="font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.desc}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </motion.section>

      </div>

      {/* ===================================================
          FULL SCREEN IMAGE MODAL
          =================================================== */}

      <AnimatePresence>

        {selectedProject && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={closeProjectModal}
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative w-full max-w-6xl max-h-[94vh] overflow-hidden rounded-[28px] border border-white/10 bg-[#07101f] shadow-2xl"
            >

              {/* CLOSE */}

              <button
                onClick={closeProjectModal}
                className="absolute z-30 top-4 right-4 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <FaTimes />
              </button>

              {/* IMAGE */}

              <div className="relative h-[45vh] sm:h-[55vh] bg-black flex items-center justify-center">

                <AnimatePresence mode="wait">

                  <motion.img
                    key={currentImageIndex}
                    src={
                      selectedProject.images[
                        currentImageIndex
                      ]
                    }
                    alt={
                      selectedProject.title
                    }
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="w-full h-full object-contain"
                  />

                </AnimatePresence>

                {/* PREVIOUS */}

                <button
                  onClick={previousImage}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition"
                >
                  <FaArrowLeft />
                </button>

                {/* NEXT */}

                <button
                  onClick={nextImage}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition"
                >
                  <FaArrowRight />
                </button>

                {/* COUNTER */}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white border border-white/10">
                  {currentImageIndex + 1} /{" "}
                  {selectedProject.images.length}
                </div>

              </div>

              {/* MODAL CONTENT */}

              <div className="max-h-[38vh] overflow-y-auto p-6 sm:p-8">

                <div className="flex flex-col lg:flex-row gap-8">

                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-3">

                      {selectedProjectType ===
                        "android" ? (
                        <FaAndroid className="text-green-400 text-2xl" />
                      ) : (
                        <FaGlobe className="text-cyan-400 text-2xl" />
                      )}

                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {selectedProject.title}
                      </h3>

                    </div>

                    <p className="text-slate-400 leading-relaxed mb-6">
                      {
                        selectedProject.description
                      }
                    </p>

                    {/* FEATURES */}

                    <div>

                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        Key Features
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        {selectedProject.features?.map(
                          (feature, index) => (
                            <div
                              key={index}
                              className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300"
                            >
                              <span className="text-cyan-400 mr-2">
                                •
                              </span>

                              {feature}
                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="lg:w-[300px]">

                    <h4 className="text-white font-bold mb-3">
                      Technologies
                    </h4>

                    <div className="flex flex-wrap gap-2 mb-6">

                      {selectedProject.tech?.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs"
                          >
                            {tech}
                          </span>
                        )
                      )}

                    </div>

                    {selectedProjectType ===
                    "web" ? (
                      <a
                        href={
                          selectedProject.domain
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
                      >
                        <FaGlobe />

                        Click Here to View
                        Application
                      </a>
                    ) : selectedProject.apkLink ? (
                      <a
                        href={
                          selectedProject.apkLink
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
                      >
                        <FaDownload />

                        Download APK
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-500 font-bold cursor-not-allowed"
                      >
                        APK Coming Soon
                      </button>
                    )}

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