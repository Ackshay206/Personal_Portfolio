import React, { useEffect, useRef, useState } from 'react';
import { Brain, Code } from 'lucide-react';
import { skillsData, additionalTechs } from '../data/skills';
import './Skills.css';

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
      { threshold: 0.3 }
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

  const SkillBar = ({ skill }) => (
    <div className="skill-item">
      <div className="skill-header">
        <div className="skill-name">
          <span className="skill-icon">{skill.icon}</span>
          <span>{skill.name}</span>
        </div>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: '0.2s'
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-description">
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
              <SkillBar key={index} skill={skill} />
            ))}
          </div>

          <div className={`skill-category slide-in-right ${isVisible ? 'animate' : ''}`}>
            <h3 className="category-title">
              <Code size={24} />
              Software Development Skills
            </h3>
            {skillsData['Software Development'].map((skill, index) => (
              <SkillBar key={index} skill={skill} />
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