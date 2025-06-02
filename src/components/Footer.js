import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-bracket">&lt;/</span>
              <span className="logo-text1">dev.</span>
              <span className="logo-text2">Ackshaynr</span>
              <span className="logo-bracket">&gt;</span>
            </div>
            <p className="footer-description">
              Building the future with AI, ML, and modern web technologies.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
              <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
              <li><a href="#publications" onClick={(e) => handleNavClick(e, '#publications')}>Publications</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <div className="footer-social">
              <a href="https://github.com/Ackshay206" target="_blank" rel="noopener noreferrer">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ackshay-n-r/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
              <a href="mailto:ackshaynr485@gmail.com">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Ackshay Nagamallu Rajasekar. All rights reserved.
          </p>
          <p className="made-with">
            <span>Made with</span>
            <Heart size={16} className="heart-icon" />
            <span>using React & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;