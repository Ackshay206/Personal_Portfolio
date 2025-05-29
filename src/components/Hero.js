import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resumeType, setResumeType] = useState('AI/ML');
  const canvasRef = useRef(null);

  // The texts to cycle through
  const texts = ['AI/ML Engineer', 'Full-Stack Developer'];
  
  // Typing speeds
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  // Simple Neural Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      console.log('Canvas size set to:', canvas.width, 'x', canvas.height);
    };

    setCanvasSize();

    // Create nodes
    const createNodes = () => {
      nodes = [];
      const nodeCount = 60; // Increased from 30
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Slower movement for more stable connections
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1.5, // Slightly smaller nodes
          opacity: Math.random() * 0.4 + 0.3, // More visible nodes
          pulsePhase: Math.random() * Math.PI * 2 // For pulsing effect
        });
      }
      console.log('Created', nodes.length, 'nodes');
    };

    createNodes();

    // Animation function
    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(248, 249, 250, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const maxConnectionDistance = 250; // Increased connection distance
      const time = Date.now() * 0.001; // For time-based effects

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move node
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x <= 10 || node.x >= canvas.width - 10) node.vx *= -1;
        if (node.y <= 10 || node.y >= canvas.height - 10) node.vy *= -1;

        // Keep in bounds with padding
        node.x = Math.max(10, Math.min(canvas.width - 10, node.x));
        node.y = Math.max(10, Math.min(canvas.height - 10, node.y));

        // Update pulse phase
        node.pulsePhase += 0.02;
        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3;

        // Draw node with pulsing effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${node.opacity})`;
        ctx.fill();

        // Add node glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${node.opacity * 0.1})`;
        ctx.fill();

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxConnectionDistance) {
            // Calculate connection opacity based on distance
            const baseOpacity = (1 - distance / maxConnectionDistance) * 0.6;
            
            // Add subtle animation to connection strength
            const animatedOpacity = baseOpacity * (0.7 + 0.3 * Math.sin(time + i * 0.1));
            
            // Draw main connection line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${animatedOpacity})`;
            ctx.lineWidth = Math.max(0.5, (1 - distance / maxConnectionDistance) * 2);
            ctx.stroke();

            // Add data flow effect for closer connections
            if (distance < maxConnectionDistance * 0.6) {
              const flowProgress = (time * 2 + i) % 1;
              const flowX = node.x + (other.x - node.x) * flowProgress;
              const flowY = node.y + (other.y - node.y) * flowProgress;
              
              ctx.beginPath();
              ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(249, 115, 22, ${animatedOpacity * 0.8})`;
              ctx.fill();
            }
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      createNodes();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      console.log('Cleaning up animation');
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - run once on mount

  // Typing animation effect
  useEffect(() => {
    const currentText = texts[currentIndex];

    const handleTyping = () => {
      if (isPaused) {
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
        return;
      }

      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIndex, isPaused, texts]);

  const handleViewWork = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const resumeUrl = resumeType === 'AI/ML' 
      ? '/resumes/Your-Name-AI-ML-Resume.pdf' 
      : '/resumes/Your-Name-SWE-Resume.pdf';
    
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = `Your-Name-${resumeType.replace('/', '-')}-Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Downloading ${resumeType} Resume...`);
  };

  const toggleResumeType = () => {
    setResumeType(prev => prev === 'AI/ML' ? 'SWE' : 'AI/ML');
  };

  return (
    <section id="home" className="hero">
      <canvas 
        ref={canvasRef} 
        className="neural-network-canvas"
        aria-hidden="true"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <div className="hero-overlay" />
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hello, I'm
          </h1>
          <h1 className="hero-subtitle">
            <span className="typing-container">
              &lt;{displayedText}
              <span className="typing-cursor">|</span>
              /&gt;
            </span>
          </h1>
          <p className="hero-description">
            crafting intelligent solutions with code, data, and innovation.
          </p>
          
          {/* Resume Toggle Switch */}
          <div className="resume-toggle-container">
            <span className="toggle-label">Resume Type:</span>
            <div className="toggle-switch" onClick={toggleResumeType}>
              <div className={`toggle-slider ${resumeType === 'AI/ML' ? 'left' : 'right'}`}>
                <span className="toggle-text">{resumeType}</span>
              </div>
              <span className="toggle-option left">AI/ML</span>
              <span className="toggle-option right">SWE</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleViewWork}>
              <span>View My Work</span>
              <ChevronDown size={16} />
            </button>
            <button className="btn-secondary" onClick={handleDownloadResume}>
              <Download size={16} />
              <span>Download {resumeType} Resume</span>
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