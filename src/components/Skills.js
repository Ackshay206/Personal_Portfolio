import React, { useEffect, useRef, useState } from 'react';
import { 
  Brain, 
  Code, 
  Database, 
  Cpu, 
  Network, 
  Zap, 
  GitBranch, 
  Terminal,
  Bot,
  LineChart,
  Layers,
  Settings
} from 'lucide-react';
import { skillsData, additionalTechs } from '../data/skills';
import './Skills.css';

const FloatingIconsBackground = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Available icons for floating animation
  const iconTypes = [
    Brain, Code, Database, Cpu, Network, Zap, 
    GitBranch, Terminal, Bot, LineChart, Layers, Settings
  ];

  // Generate random floating icons
  const generateIcon = (id) => {
    const IconComponent = iconTypes[Math.floor(Math.random() * iconTypes.length)];
    
    return {
      id,
      Icon: IconComponent,
      x: -100, // Start off-screen left
      y: Math.random() * (dimensions.height || 600),
      z: Math.random() * 100 + 20, // Depth from 20 to 120
      speed: Math.random() * 2 + 0.5, // Speed from 0.5 to 2.5
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2, // -1 to 1
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 (increased from 0.1-0.4)
      scale: Math.random() * 1.0 + 0.5, // 0.5 to 1.5 (increased from 0.3-1.1)
    };
  };

  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    // Initialize icons
    const initialIcons = Array.from({ length: 18 }, (_, i) => generateIcon(i)); // Increased from 12 to 18
    setIcons(initialIcons);

    const animate = () => {
      setIcons(prevIcons => {
        return prevIcons.map(icon => {
          // Move icon from left to right
          let newX = icon.x + icon.speed;
          
          // If icon goes off-screen right, reset to left with new properties
          if (newX > dimensions.width + 100) {
            return generateIcon(icon.id);
          }

          return {
            ...icon,
            x: newX,
            rotation: icon.rotation + icon.rotationSpeed,
          };
        });
      });
    };

    const intervalId = setInterval(animate, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [dimensions]);

  // Add new icons periodically
  useEffect(() => {
    if (dimensions.width === 0) return;

    const addIcon = () => {
      setIcons(prevIcons => {
        if (prevIcons.length < 25) { // Increased maximum from 15 to 25
          return [...prevIcons, generateIcon(Date.now())];
        }
        return prevIcons;
      });
    };

    const addIconInterval = setInterval(addIcon, 2000); // Reduced from 3000ms to 2000ms for faster spawning

    return () => clearInterval(addIconInterval);
  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      className="floating-icons-background"
    >
      {icons.map(icon => {
        const Icon = icon.Icon;
        
        // Calculate perspective-based size and blur
        const perspective = icon.z / 120; // 0 to 1
        const size = 24 + (48 * perspective) * icon.scale; // 24px to 72px base (increased from 16-48px)
        const blur = (1 - perspective) * 2; // Further = more blur
        
        return (
          <div
            key={icon.id}
            className="floating-icon"
            style={{
              left: `${icon.x}px`,
              top: `${icon.y}px`,
              transform: `rotate(${icon.rotation}deg) scale(${0.5 + perspective * 0.5})`,
              opacity: icon.opacity * (0.3 + perspective * 0.7),
              filter: `blur(${blur}px)`,
            }}
          >
            <Icon size={size} />
          </div>
        );
      })}
    </div>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const AnimatedSkillBar = ({ skill, isVisible, delay = 0 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const [currentWidth, setCurrentWidth] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const startTime = Date.now();
      const duration = 1400;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          const easedProgress = 1 - Math.pow(1 - progress, 2.5);
          
          const value = Math.floor(easedProgress * skill.level);
          const width = easedProgress * skill.level;
          
          setCurrentValue(value);
          setCurrentWidth(width);
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(skill.level);
          setCurrentWidth(skill.level);
        }
      };

      requestAnimationFrame(animate);
    }, [skill.level, isVisible, delay]);

    return {
      counter: <span>{currentValue}%</span>,
      progressBar: (
        <div 
          className="skill-progress"
          style={{ 
            width: `${currentWidth}%`,
          }}
        />
      )
    };
  };

  const SkillBar = ({ skill, index }) => {
    const animatedSkill = AnimatedSkillBar({ 
      skill, 
      isVisible, 
      delay: 0
    });

    return (
      <div className="skill-item">
        <div className="skill-header">
          <div className="skill-name">
            <span className="skill-icon">{skill.icon}</span>
            <span>{skill.name}</span>
          </div>
          <span className="skill-percentage">
            {animatedSkill.counter}
          </span>
        </div>
        <div className="skill-bar">
          {animatedSkill.progressBar}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      {/* 3D Floating Background */}
      <FloatingIconsBackground />
      
      <div className="container">
        <div className="section-header">
          <h2 className="skill-section-title">Technical Skills</h2>
          <p className="skill-section-description">
            Expertise across AI/ML technologies and modern software development
          </p>
        </div>

        <div className="skills-grid">
          <div className={`skill-category slide-in-left ${isVisible ? 'animate' : ''}`}>
            <h3 className="category-title">
              <Brain size={24} />
              AI/ML Skills
            </h3>
            {skillsData['AI/ML'].map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index} />
            ))}
          </div>

          <div className={`skill-category slide-in-right ${isVisible ? 'animate' : ''}`}>
            <h3 className="category-title">
              <Code size={24} />
              Software Development Skills
            </h3>
            {skillsData['Software Development'].map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>

        <div className="additional-techs">
          <h3 className="additional-title">Additional Technologies</h3>
          <div className="tech-tags">
            {additionalTechs.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;