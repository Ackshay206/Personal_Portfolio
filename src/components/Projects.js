import React, { useState } from 'react';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { projectsData } from '../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All','AI/ML', 'Full Stack', 'Research'];

  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(project => {
        // Debug logging
        console.log(`Filtering for: "${activeFilter}"`);
        console.log(`Project: ${project.title}`);
        console.log(`Categories:`, project.category);
        
        // Handle both array and string categories
        if (Array.isArray(project.category)) {
          const result = project.category.includes(activeFilter);
          console.log(`Match result: ${result}`);
          return result;
        } else {
          const result = project.category === activeFilter;
          console.log(`Match result: ${result}`);
          return result;
        }
      });

  // Debug: Log filtered results
  console.log(`Active filter: "${activeFilter}"`);
  console.log(`Filtered projects count: ${filteredProjects.length}`);
  console.log('Filtered projects:', filteredProjects.map(p => p.title));

  const ProjectCard = ({ project }) => {
    return (
      <div className="project-card">
        <div className="project-image">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="project-placeholder" style={{ display: project.image ? 'none' : 'flex' }}>
            <FileText size={32} />
          </div>
        </div>
        <div className="project-content">
          <div className="project-categories">
            {Array.isArray(project.category) ? (
              project.category.map((cat, index) => (
                <span key={index} className="project-category">
                  {cat}
                </span>
              ))
            ) : (
              <span className="project-category">{project.category}</span>
            )}
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
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <Github size={16} />
              <span>Code</span>
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

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