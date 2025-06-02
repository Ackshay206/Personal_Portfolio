import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sending functionality would be implemented here!');
    console.log('Form data:', formData);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">
            Let's collaborate on your next project or discuss opportunities
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>
            
            <div className="contact-item">
              <Mail className="contact-icon" />
              <div className="contact-details">
                <p className="contact-label">Email</p>
                <p className="contact-value">ackshaynr485@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone className="contact-icon" />
              <div className="contact-details">
                <p className="contact-label">Phone</p>
                <p className="contact-value">+1 (617) 602-0781</p>
              </div>
            </div>
            
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <div className="contact-details">
                <p className="contact-label">Location</p>
                <p className="contact-value">Boston, MA</p>
              </div>
            </div>

            <div className="social-section">
              <h4 className="social-title">Follow Me</h4>
              <div className="social-links">
                <a href="https://github.com/Ackshay206" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/ackshay-n-r/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Project collaboration, job opportunity, etc."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="submit-btn"
              >
                <Mail size={16} />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;