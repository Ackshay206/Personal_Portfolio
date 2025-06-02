
import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const form = useRef();

  const RATE_LIMIT_MS = 60000; // 1 minute between submissions

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || 
        !formData.subject.trim() || !formData.message.trim()) {
      setStatus('validation');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('invalid-email');
      return false;
    }

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setStatus('rate-limit');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setStatus('');

    try {
      // Your EmailJS configuration
      const result = await emailjs.sendForm(
        'service_s2iyjfp',        // Your Service ID
        'template_z4egs1k',        // Replace with your actual Template ID
        form.current,
        'N96AQ6ccWoppkzgVF'    // Replace with your actual Public Key
      );

      console.log('SUCCESS!', result.status, result.text);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLastSubmitTime(Date.now());
      
    } catch (error) {
      console.log('FAILED...', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return { type: 'success', message: '✅ Message sent successfully! I\'ll get back to you soon.' };
      case 'error':
        return { type: 'error', message: '❌ Failed to send message. Please try again or email me directly.' };
      case 'validation':
        return { type: 'error', message: '⚠️ Please fill in all fields.' };
      case 'invalid-email':
        return { type: 'error', message: '⚠️ Please enter a valid email address.' };
      case 'rate-limit':
        return { type: 'error', message: '⏱️ Please wait a moment before sending another message.' };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

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
              <form ref={form} onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input 
                      type="text"
                      name="from_name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      className="form-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email"
                      name="from_email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                    className="form-input"
                    placeholder="Project collaboration, job opportunity, etc."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                    rows="6"
                    className="form-textarea"
                    placeholder="Tell me about your project or opportunity..."
                    required
                  />
                </div>
                
                {/* Status Messages */}
                {statusMessage && (
                  <div className={`status-message ${statusMessage.type}`}>
                    {statusMessage.message}
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  <Mail size={16} />
                  <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;