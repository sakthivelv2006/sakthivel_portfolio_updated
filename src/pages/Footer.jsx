import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaGithub, FaCode } from "react-icons/fa";

const Footer = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/project", label: "Projects" },
    { path: "/skills", label: "Skills" },
    { path: "/contact", label: "Contact" },
  ];

  const socials = [
    { label: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/sakthivel2006"},
    { label: "GitHub", icon: <FaGithub />, url: "https://github.com/sakthivel182006" },
    { label: "LeetCode", icon: <FaCode />, url: "https://leetcode.com/u/sakthivelv202222/" },
  ];

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919361586944", "_blank");
  };

  return (
    <footer className="relative w-full bg-black text-white border-t border-gray-900">
      {/* Subtle gradient overlay at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
        
        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Quick Links
          </h2>
          <div className="flex flex-col gap-3">
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium text-base group relative w-fit"
              >
                <span className="relative">
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Me */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="flex flex-col gap-4">
            <a 
              href="mailto:sakthivelv202222@gmail.com"
              className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
            >
              <FaEnvelope className="text-lg group-hover:scale-110 transition-transform" /> 
              <span className="text-sm">sakthivelv202222@gmail.com</span>
            </a>
            
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors duration-300 group w-fit"
            >
              <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform" /> 
              <span className="text-sm">+91 9361586944</span>
            </button>
            
            <a 
              href="tel:+919361586944"
              className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
            >
              <FaPhone className="text-lg group-hover:scale-110 transition-transform" /> 
              <span className="text-sm">+91 9361586944</span>
            </a>
            
            <p className="flex items-center gap-3 text-gray-400">
              <FaMapMarkerAlt className="text-lg" /> 
              <span className="text-sm">Coimbatore, Tamil Nadu, India</span>
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Social Media
          </h2>
          <div className="flex flex-col gap-4">
            {socials.map(({ label, icon, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-base">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Newsletter
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Subscribe to get the latest updates about my projects and blogs. Never spam, promise!
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 border border-gray-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
            />
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-900"></div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 py-8">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sakthivel V. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          Developed By <span className="text-cyan-400">Sakthivel V</span>  <span className="text-cyan-400"></span>
        </p>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;