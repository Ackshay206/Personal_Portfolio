import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import './Publications.css';

const Publications = () => {
  const handleViewPublications = () => {
    // Add your publications link here

    window.open('https://scholar.google.com/citations?user=vsfuS4oAAAAJ&hl=en&oi=ao', '_blank');
  };

  return (
    <section id="publications" className="publications">
      <div className="container">
        <div className="publications-content">
          <div className="publications-icon">
            <FileText size={64} />
          </div>
          <h2 className="section-title">Publications</h2>
          <p className="section-description">
            Research contributions in AI/ML and computer vision. 
            Publications available on Springer and presented at leading conferences.
          </p>
          <button className="btn-primary" onClick={handleViewPublications}>
            <ExternalLink size={16} />
            <span>View Publications</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Publications;