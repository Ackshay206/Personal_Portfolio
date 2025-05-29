import React, { useState } from 'react';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { projectsData } from '../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'AI/ML', 'Web Dev', 'Full Stack'];

  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <div className="project-image">
        <div className="project-placeholder">
          <FileText size={32} />
        </div>
      </div>
      <div className="project-content">
        <div className="project-category">
          {project.category}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a href="#" className="project-link">
            <Github size={16} />
            <span>Code</span>
          </a>
          <a href="#" className="project-link">
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A showcase of my work in AI/ML, web development, and full-stack applications
          </p>
        </div>

        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;