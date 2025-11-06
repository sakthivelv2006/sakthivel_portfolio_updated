import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white px-6 md:px-12 py-4 flex justify-between items-center shadow-lg z-50">
      {/* Left: Hamburger for Mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-cyan-400 text-3xl focus:outline-none"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Center: Brand */}
      <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">
        Sakthivel<span className="text-yellow-400">.V</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg">
        {["/", "/about", "/project", "/skills", "/contact"].map((path, i) => {
          const labels = ["Home", "About", "Project", "Skills", "Contact"];
          return (
            <Link
              key={path}
              to={path}
              className={`hover:text-cyan-400 transition ${
                location.pathname === path ? "text-cyan-400 font-semibold" : ""
              }`}
            >
              {labels[i]}
            </Link>
          );
        })}
      </div>

      {/* Mobile Side Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-3/4 h-screen bg-slate-800 flex flex-col items-center justify-center space-y-8 text-2xl transition-all duration-500 shadow-2xl">
          {["/", "/about", "/project", "/skills", "/contact"].map((path, i) => {
            const labels = ["Home", "About", "Project", "Skills", "Contact"];
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`hover:text-cyan-400 ${
                  location.pathname === path ? "text-cyan-400 font-bold" : ""
                }`}
              >
                {labels[i]}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
