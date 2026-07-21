import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { siteContent } from '../utils/siteContent';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Music',
    budget: 500000,
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return '₦10,000,000+ (Premium Campaign)';
    return `₦${val.toLocaleString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'budget' ? parseInt(value) : value
    });
    // Clear error
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) errors.message = 'Please provide a project description';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API Dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: 'Music',
        budget: 500000,
        message: ''
      });
    }, 1800);
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '90vh', background: '#030303' }}>
      
      {/* Cover Header */}
      <section style={styles.headerSection}>
        <div style={styles.headerOverlay} />
        <div className="container" style={styles.headerContent}>
          <span style={styles.sectionLabel} className="gradient-text">PARTNERSHIP & BOOKING</span>
          <h1 className="page-header-title">Let's Build Something Great</h1>
          <p style={styles.headerSubtext}>
            Have a project in mind? Fill out the brief below, or connect directly through our official channels.
          </p>
        </div>
      </section>

      {/* Main Form & Information Section */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-layout-grid">
            
            {/* Left Column: Direct info & social handles */}
            <div style={styles.infoColumn}>
              <h2 style={styles.infoTitle}>Connect Directly</h2>
              <p style={styles.infoDescription}>
                I operate globally with headquarters in Lagos, Nigeria. Whether booking a live music performance, planning a digital growth strategy, or setting up event coverage, let's talk.
              </p>

              <div style={styles.contactList}>
                <div style={styles.contactCard} className="glass-panel">
                  <Mail size={18} color="var(--gold)" />
                  <div style={styles.cardDetails}>
                    <span style={styles.cardLabel}>OFFICIAL EMAIL</span>
                    <a href={`mailto:${siteContent.bio.email}`} style={styles.cardVal}>{siteContent.bio.email}</a>
                  </div>
                </div>

                <div style={styles.contactCard} className="glass-panel">
                  <Phone size={18} color="var(--gold)" />
                  <div style={styles.cardDetails}>
                    <span style={styles.cardLabel}>TELEPHONE & WHATSAPP</span>
                    <a href={siteContent.bio.whatsAppDirect} target="_blank" rel="noopener noreferrer" style={styles.cardVal}>{siteContent.bio.phone}</a>
                  </div>
                </div>

                <div style={styles.contactCard} className="glass-panel">
                  <MapPin size={18} color="var(--gold)" />
                  <div style={styles.cardDetails}>
                    <span style={styles.cardLabel}>OPERATING FROM</span>
                    <span style={styles.cardVal}>Lagos, Nigeria • Worldwide travel options</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div style={styles.whatsappBox} className="glass-panel">
                <MessageSquare size={24} color="var(--gold)" />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600' }}>Instant Consultation</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0 10px' }}>
                    Want a rapid reply? Click to open a direct WhatsApp chat room with my team.
                  </p>
                  <a
                    href={siteContent.bio.whatsAppDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.waButton}
                  >
                    START CHAT ROOM
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Project Booking Form */}
            <div style={styles.formColumn}>
              {isSubmitted ? (
                <div style={styles.successPanel} className="glass-panel">
                  <CheckCircle size={56} color="var(--gold)" style={{ margin: '0 auto 20px', display: 'block' }} />
                  <h2 style={styles.successTitle}>Brief Received Successfully</h2>
                  <p style={styles.successText}>
                    Thank you for initiating the process. A receipt email has been dispatched. Danjhay or a campaign strategist from our studio team will review your project specs and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    style={styles.newFormBtn}
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form glass-panel">
                  <div style={styles.formHeader}>
                    <Sparkles size={16} color="var(--gold)" />
                    <span style={styles.formTitle}>PROJECT BRIEF FORM</span>
                  </div>
                  
                  {/* Name field */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">YOUR FULL NAME</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Femi Adebayo"
                      className="form-input"
                      style={{ borderColor: formErrors.name ? 'red' : '' }}
                    />
                    {formErrors.name && <span style={styles.errorText}>{formErrors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. femi@brandname.com"
                      className="form-input"
                      style={{ borderColor: formErrors.email ? 'red' : '' }}
                    />
                    {formErrors.email && <span style={styles.errorText}>{formErrors.email}</span>}
                  </div>

                  {/* Project Type Select */}
                  <div className="form-group">
                    <label htmlFor="projectType" className="form-label">CHOOSE PROJECT CATEGORY</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Music">Music Release & Vocals</option>
                      <option value="Digital Marketing">Social Media & Digital Growth</option>
                      <option value="Event Coverage">Event Media & Red Carpet Coverage</option>
                      <option value="Creative Branding">Artist Rebrands & Identity Strategy</option>
                    </select>
                  </div>

                  {/* Budget Slider */}
                  <div className="form-group">
                    <div style={styles.budgetHeader}>
                      <label htmlFor="budget" className="form-label">ESTIMATED BUDGET</label>
                      <span style={styles.budgetDisplay}>{formatCurrency(formData.budget)}</span>
                    </div>
                    <input
                      type="range"
                      id="budget"
                      name="budget"
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={formData.budget}
                      onChange={handleInputChange}
                      style={{ margin: '10px 0' }}
                    />
                    <div style={styles.rangeLabelRow}>
                      <span>₦100K</span>
                      <span>₦5.0M</span>
                      <span>₦10M+</span>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">TELL US ABOUT THE PROJECT</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detail your goals, deadlines, and key requirements..."
                      className="form-textarea"
                      style={{ borderColor: formErrors.message ? 'red' : '' }}
                    />
                    {formErrors.message && <span style={styles.errorText}>{formErrors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '16px' }}
                  >
                    {isSubmitting ? (
                      <span>SENDING BRIEF ...</span>
                    ) : (
                      <>
                        <span>SUBMIT BRIEF BRIEF</span>
                        <Send size={14} style={{ marginLeft: '8px' }} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  headerSection: {
    position: 'relative',
    background: 'url("https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80") no-repeat center center',
    backgroundSize: 'cover',
    padding: '80px 0',
    borderBottom: '1px solid #111'
  },
  headerOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), rgba(3,3,3,0.95))',
    zIndex: 1
  },
  headerContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '750px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  sectionLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    textTransform: 'uppercase'
  },
  headerSubtext: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)'
  },
  infoColumn: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  infoTitle: {
    fontSize: '2rem',
    color: '#fff',
    fontWeight: '600'
  },
  infoDescription: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7'
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    borderRadius: 'var(--radius-md)'
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  cardLabel: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em'
  },
  cardVal: {
    fontSize: '0.9rem',
    color: '#fff',
    fontWeight: '500'
  },
  whatsappBox: {
    padding: '24px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    borderRadius: 'var(--radius-md)',
    background: 'rgba(212, 175, 55, 0.03)'
  },
  waButton: {
    display: 'inline-block',
    background: 'var(--gold)',
    color: '#000',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '8px 16px',
    borderRadius: '4px',
    letterSpacing: '0.05em'
  },
  formColumn: {
    position: 'relative'
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '30px'
  },
  formTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--text-primary)'
  },
  budgetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  budgetDisplay: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--gold)',
    fontFamily: 'monospace'
  },
  rangeLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.7rem',
    color: 'var(--text-muted)'
  },
  errorText: {
    fontSize: '0.75rem',
    color: 'red',
    marginTop: '4px',
    display: 'block'
  },
  successPanel: {
    padding: '50px 30px',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center'
  },
  successTitle: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '15px'
  },
  successText: {
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: 'var(--text-secondary)',
    marginBottom: '30px',
    maxWidth: '500px',
    margin: '0 auto 30px'
  },
  newFormBtn: {
    background: 'transparent',
    border: '1px solid var(--gold)',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default Contact;
