import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import your images
import logo from "./assets/logo.png";
import userLogo from "./assets/user-logo.jpg";
import profileImage from "./assets/profile.jpg"; // Add your profile image

// Pages
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

const AppContent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleAskGemini = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    try {
      const res = await axios.post("http://gameappbackend-i8zv.onrender.com/gemini/ask", { prompt });
      setResponse(res.data.reply);
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error connecting to Gemini API. Please make sure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAskGemini();
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const showHome = location.pathname === "/";

  return (
    <div className="portfolio-app">
      {/* Sidebar for Mobile */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="sidebar-close" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" onClick={closeSidebar}>
              <i className="fas fa-home"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeSidebar}>
              <i className="fas fa-user"></i>
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={closeSidebar}>
              <i className="fas fa-briefcase"></i>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/skills" onClick={closeSidebar}>
              <i className="fas fa-code"></i>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeSidebar}>
              <i className="fas fa-envelope"></i>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Modern Navbar */}
      <nav className="modern-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            <Link to="/" className="logo-brand">
              <span className="logo-text">Sakthivel.</span>
            </Link>
          </div>

          <div className="nav-menu">
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
              About
            </Link>
            <Link to="/projects" className={`nav-link ${location.pathname === "/projects" ? "active" : ""}`}>
              Portfolio
            </Link>
            <Link to="/skills" className={`nav-link ${location.pathname === "/skills" ? "active" : ""}`}>
              Blog
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
              Contact
            </Link>
          </div>

          <button className="cta-button">Let's Talk</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {showHome ? (
          <div className="hero-section">
            <div className="hero-container">
              {/* Left Content */}
              <div className="hero-left">
                <div className="hero-text">
                  <h1 className="hero-title">
                    Hi, I'm <span className="name-highlight">Sakthivel V</span>
                  </h1>
                  <h2 className="hero-subtitle">Full Stack Developer</h2>
                  <p className="hero-description">
                    Passionate about creating innovative web solutions with modern technologies. 
                    Specializing in React, Node.js, and cloud-based applications. 
                    Let's build something amazing together.
                  </p>

                  {/* Gemini AI Integration */}
                  <div className="action-section">
                    <div className="gemini-input-wrapper">
                      <textarea
                        className="gemini-textarea"
                        rows="3"
                        placeholder="Ask me anything about my work, skills, or projects... (Ctrl + Enter)"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                      />
                      <button 
                        onClick={handleAskGemini}
                        className="send-button"
                        disabled={isLoading || !prompt.trim()}
                      >
                        {isLoading ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-paper-plane"></i>
                        )}
                      </button>
                    </div>

                    {response && (
                      <div className="ai-response">
                        <div className="response-header">
                          <i className="fas fa-robot"></i>
                          <span>AI Response</span>
                        </div>
                        <p className="response-text">{response}</p>
                      </div>
                    )}

                    <div className="action-buttons">
                      <Link to="/projects" className="btn-primary">
                        See Projects
                      </Link>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="social-links">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon github">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Content - Profile Image */}
              <div className="hero-right">
                <div className="profile-image-container">
                  <div className="profile-background"></div>
                  <img 
                    src={profileImage} 
                    alt="Sakthivel V" 
                    className="profile-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="profile-fallback">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="profile-decoration decoration-1"></div>
                  <div className="profile-decoration decoration-2"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="page-content">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;