import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const handleViewWork = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Add your resume download logic here
    alert('Resume download would be implemented here!');
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hello, I'm
          </h1>
          <h1 className="hero-subtitle">
            <span className="developer-text">&lt;Developer/&gt;</span>
          </h1>
          <p className="hero-description">
            AI/ML Engineer & Full-Stack Developer crafting intelligent solutions with code, data, and innovation.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleViewWork}>
              <span>View My Work</span>
              <ChevronDown size={16} />
            </button>
            <button className="btn-secondary" onClick={handleDownloadResume}>
              Download Resume
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown size={24} className="bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;