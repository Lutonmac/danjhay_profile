import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import MusicPlayer from '../components/MusicPlayer';
import { siteContent } from '../utils/siteContent';
import { useSiteData } from '../hooks/useSiteData';
import type { MediaItem } from '../utils/siteContent';

interface HomeProps {
  setLightboxItem: (item: MediaItem) => void;
}

const Home: React.FC<HomeProps> = ({ setLightboxItem }) => {
  const content = siteContent;
  const { events, media, bioImage, bookingEmail, bookingPhone, bookingWhatsApp, heroLabel, fullName, tagline, description } = useSiteData();

  // Contact Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Music',
    budget: 500000,
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return '₦10,000,000+ (Premium)';
    return `₦${val.toLocaleString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'budget' ? parseInt(value) : value
    });
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
      errors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) errors.message = 'Details are required';
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate low-latency email dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Music',
        budget: 500000,
        message: ''
      });
    }, 1200);
  };

  const encodeWhatsAppUrl = (text: string) => {
    const baseUrl = bookingWhatsApp || 'https://wa.me/2349069510888';
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
  };

  const handleScrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      
      {/* 1. Hero / Home Section */}
      <section id="home" style={styles.heroSection}>
        <div className="container" style={styles.heroContainer}>
          
          {/* Left Block: Identity */}
          <div style={styles.heroContent}>
            <span style={styles.heroLabel}>{heroLabel || content.bio.heroLabel}</span>
            <h1 className="hero-title-main" style={styles.heroTitle}>{fullName || content.bio.fullName}</h1>
            <p style={styles.heroTagline}>{tagline || content.bio.tagline}</p>
            <p style={styles.heroDescription}>{description || content.bio.description}</p>
            
            <div style={styles.ctaRow}>
              <a
                href="#music"
                onClick={(e) => handleScrollToId(e, 'music')}
                className="btn btn-primary"
              >
                LISTEN TO MUSIC
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollToId(e, 'contact')}
                className="btn btn-secondary"
              >
                BOOK DANJHAY
              </a>
            </div>

            {/* Quick direct connects */}
            <div style={styles.quickConnect}>
              <a href={content.bio.instagram} target="_blank" rel="noopener noreferrer" style={styles.connectLink}>INSTAGRAM</a>
              <span style={styles.dot}>•</span>
              <a href={content.bio.tiktok} target="_blank" rel="noopener noreferrer" style={styles.connectLink}>TIKTOK</a>
              <span style={styles.dot}>•</span>
              <a href={content.bio.whatsAppDirect} target="_blank" rel="noopener noreferrer" style={styles.connectLink}>WHATSAPP</a>
            </div>
          </div>

          <div style={styles.heroPortraitContainer}>
            <div style={styles.portraitFrame}>
              <img src={bioImage} alt="Danjhay Portrait" style={styles.portraitImage} />
              <div style={styles.portraitBorder} />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Music Section */}
      <section id="music" className="section-padding" style={styles.darkSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>DISCOGRAPHY</span>
            <h2>FUTURISTIC SOUNDS</h2>
            <p style={styles.sectionSub}>Play preview clips, or stream full releases across official global channels.</p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <MusicPlayer />
          </div>

          {/* Platform buttons */}
          <div style={styles.platformSection}>
            <p style={styles.platformLabel}>AVAILABLE FOR STREAMING</p>
            <div className="platform-grid-main" style={styles.platformGrid}>
              <a href="https://open.spotify.com/artist/7DsnVD0VUeXVowmhP2XzSM?si=_PTxoIZITaq3IOpWc0cLLw&utm_source=whatsapp&nd=1&dlsi=abb5a56239764a21" target="_blank" rel="noopener noreferrer" style={styles.platformCard}>
                <span>SPOTIFY</span>
                <ExternalLink size={12} color="var(--text-muted)" />
              </a>
              <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" style={styles.platformCard}>
                <span>APPLE MUSIC</span>
                <ExternalLink size={12} color="var(--text-muted)" />
              </a>
              <a href="https://audiomack.com" target="_blank" rel="noopener noreferrer" style={styles.platformCard}>
                <span>AUDIOMACK</span>
                <ExternalLink size={12} color="var(--text-muted)" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={styles.platformCard}>
                <span>YOUTUBE</span>
                <ExternalLink size={12} color="var(--text-muted)" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>CAPABILITIES</span>
            <h2>PROFESSIONAL SERVICES</h2>
            <p style={styles.sectionSub}>Helping brands grow through strategic digital marketing, creative content, and impactful social media management.</p>
          </div>

          <div className="grid-2" style={{ marginTop: '40px' }}>
            {content.services.map((svc) => (
              <div key={svc.id} className="panel" style={styles.servicePanel}>
                <h3 style={styles.serviceTitle}>{svc.title}</h3>
                <p style={styles.serviceDescription}>{svc.description}</p>
                <div style={styles.serviceDivider} />
                <ul style={styles.serviceList}>
                  {svc.checklist.map((item, idx) => (
                    <li key={idx} style={styles.serviceItem}>
                      <span style={styles.bullet}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={encodeWhatsAppUrl(svc.whatsAppTemplate)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: '10px', fontSize: '0.7rem' }}
                >
                  INQUIRE VIA WHATSAPP
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Merchandise Section */}
      <section id="merch" className="section-padding" style={styles.darkSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>EXCLUSIVE DROP</span>
            <h2>THE DANJHAY COLLECTION</h2>
            <p style={styles.sectionSub}>Exclusive apparel and essentials inspired by the Danjhay movement.</p>
          </div>

          <div className="grid-4" style={{ marginTop: '40px' }}>
            {content.merch.map((prod) => (
              <div key={prod.id} className="panel product-card product-card-wrapper" style={styles.productCard}>
                <div style={styles.productImageWrapper}>
                  <img src={prod.imageUrl} alt={prod.name} className="product-image" style={styles.productImage} />
                  {prod.badge && <span style={styles.productBadge}>{prod.badge}</span>}
                </div>
                <div style={styles.productInfo}>
                  <h4 style={styles.productName}>{prod.name}</h4>
                  <div style={styles.productPriceRow}>
                    <span style={styles.productPrice}>{prod.price}</span>
                    <span style={styles.productInStock}>IN STOCK</span>
                  </div>
                  <a
                    href={encodeWhatsAppUrl(prod.whatsAppTemplate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.7rem', padding: '10px 14px', marginTop: '12px' }}
                  >
                    ORDER VIA WHATSAPP
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Events Section */}
      <section id="events" className="section-padding">
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>SHOW CALENDAR</span>
            <h2>UPCOMING & PAST SHOWS</h2>
            <p style={styles.sectionSub}>Catch Danjhay live on stage, campus tours, and spiritual conventions.</p>
          </div>

          <div style={styles.eventsWrapper}>
            {events.map((evt) => {
              const isPast = evt.ticketStatus === 'Past';
              const isSoldOut = evt.ticketStatus === 'Sold Out';
              return (
                <div key={evt.id} className="event-row-wrapper" style={styles.eventRow}>
                  {/* Date details */}
                  <div style={styles.eventDateCol}>
                    <span style={styles.eventDate}>{evt.date}</span>
                  </div>

                  {/* Venue details */}
                  <div style={styles.eventVenueCol}>
                    <h4 style={styles.eventTitle}>{evt.title}</h4>
                    <p style={styles.eventSubText}>{evt.venue} • {evt.location}</p>
                  </div>

                  {/* Ticketing action */}
                  <div style={styles.eventActionCol}>
                    {isPast ? (
                      <span style={styles.eventMutedBadge}>PAST SHOW</span>
                    ) : isSoldOut ? (
                      <span style={styles.eventRedBadge}>SOLD OUT</span>
                    ) : (
                      <a
                        href={evt.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ fontSize: '0.7rem', padding: '8px 16px' }}
                      >
                        {evt.ticketStatus.toUpperCase()} <ExternalLink size={10} style={{ marginLeft: '4px' }} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Media Gallery Section */}
      <section id="gallery" className="section-padding" style={styles.darkSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>ARCHIVES</span>
            <h2>VISUAL MEDIA GALLERY</h2>
            <p style={styles.sectionSub}>Recent captures showing studio releases, live events, and creative campaigns.</p>
          </div>

          <div className="grid-4" style={{ marginTop: '40px' }}>
            {media.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="gallery-card-wrapper"
                style={styles.galleryCard}
              >
                <div style={styles.galleryImageWrapper}>
                  <img src={item.imageUrl} alt={item.title} className="gallery-image" style={styles.galleryImage} />
                  <div style={styles.galleryOverlay}>
                    <span style={styles.galleryOverlayText}>VIEW DETAILED BRIEF</span>
                  </div>
                </div>
                <div style={styles.galleryInfo}>
                  <h4 style={styles.galleryCardTitle}>{item.title}</h4>
                  <span style={styles.galleryCardDate}>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>COLLABORATE</span>
            <h2>BOOKING & INQUIRIES</h2>
            <p style={styles.sectionSub}>Pitch your project, schedule a recording consult, or lock show bookings.</p>
          </div>

          <div className="contact-container-main" style={styles.contactContainer}>
            {/* Direct contact info */}
            <div style={styles.contactDetailsCol}>
              <h3 style={styles.contactDetailsTitle}>Direct Channels</h3>
              <p style={styles.contactDetailsSub}>Operating globally out of Lagos, Nigeria. Send direct messages or drop emails anytime.</p>
              
              <div style={styles.directList}>
                <div style={styles.directCard}>
                  <Mail size={16} color="var(--primary-red)" />
                  <div>
                    <span style={styles.directLabel}>EMAIL CHANNEL</span>
                    <a href={`mailto:${bookingEmail}`} style={styles.directVal}>{bookingEmail}</a>
                  </div>
                </div>

                <div style={styles.directCard}>
                  <Phone size={16} color="var(--primary-red)" />
                  <div>
                    <span style={styles.directLabel}>WHATSAPP BUSINESS</span>
                    <a href={bookingWhatsApp} target="_blank" rel="noopener noreferrer" style={styles.directVal}>{bookingPhone}</a>
                  </div>
                </div>

                <div style={styles.directCard}>
                  <MapPin size={16} color="var(--primary-red)" />
                  <div>
                    <span style={styles.directLabel}>HEADQUARTERS</span>
                    <span style={styles.directVal}>Lagos, Nigeria • Operating Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <div style={styles.instantWhatsappPanel}>
                <MessageSquare size={20} color="var(--primary-red)" />
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Instant Response Consultation</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 10px' }}>
                    Need a direct reply in minutes? Connect directly via WhatsApp with our team.
                  </p>
                  <a
                    href={bookingWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: '0.65rem', padding: '6px 12px' }}
                  >
                    START LIVE CHAT
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiries brief form */}
            <div style={styles.contactFormCol}>
              {isSubmitted ? (
                <div className="panel" style={styles.submittedPanel}>
                  <CheckCircle size={44} color="var(--primary-red)" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>brief received successfully</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                    Thank you. Your project brief has been dispatched. A coordinator from Danjhay's management studio will reach out via email within 24 hours.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary" style={{ fontSize: '0.7rem' }}>
                    SUBMIT NEW BRIEF
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="panel" style={{ textAlign: 'left' }}>
                  <div style={styles.formTitleRow}>
                    <Sparkles size={14} color="var(--primary-red)" />
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em' }}>PROJECT BRIEF BRIEF</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">FULL NAME / AGENCY</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Femi Adebayo"
                      className="form-input"
                      style={{ borderColor: formErrors.name ? 'var(--primary-red)' : '' }}
                    />
                    {formErrors.name && <span style={styles.errorText}>{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. femi@brand.com"
                      className="form-input"
                      style={{ borderColor: formErrors.email ? 'var(--primary-red)' : '' }}
                    />
                    {formErrors.email && <span style={styles.errorText}>{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectType" className="form-label">PROJECT CATEGORY</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Music">Music Performance & Release</option>
                      <option value="Digital Marketing">Social Content & Funnel Advisory</option>
                      <option value="Event Coverage">Event Media & Interviews</option>
                      <option value="Creative Branding">Artist Identity Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <div style={styles.budgetLabelRow}>
                      <label htmlFor="budget" className="form-label">ESTIMATED BUDGET</label>
                      <span style={styles.budgetValDisplay}>{formatCurrency(formData.budget)}</span>
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
                      style={{ margin: '8px 0' }}
                    />
                    <div style={styles.sliderLimitsRow}>
                      <span>₦100K</span>
                      <span>₦5.0M</span>
                      <span>₦10M+</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">PROJECT BRIEF & DETAILS</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Explain your goals, target timeline, or music feature specifications..."
                      className="form-textarea"
                      style={{ borderColor: formErrors.message ? 'var(--primary-red)' : '' }}
                    />
                    {formErrors.message && <span style={styles.errorText}>{formErrors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '0.75rem' }}
                  >
                    {isSubmitting ? 'DISPATCHING BRIEF ...' : (
                      <>
                        <span>SUBMIT BRIEF</span>
                        <Send size={12} />
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
  heroSection: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: '60px 0',
    position: 'relative'
  },
  heroContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap-reverse'
  },
  heroContent: {
    flex: '1 1 500px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  heroLabel: {
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'var(--primary-red)'
  },
  heroTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '4.5rem',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '0.9',
    letterSpacing: '0.04em'
  },
  heroTagline: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  heroDescription: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '520px'
  },
  ctaRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
    flexWrap: 'wrap'
  },
  quickConnect: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  connectLink: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em',
    textDecoration: 'none'
  },
  dot: {
    color: 'var(--text-muted)',
    fontSize: '0.8rem'
  },
  heroPortraitContainer: {
    flex: '1 1 350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  portraitFrame: {
    position: 'relative',
    width: '320px',
    height: '380px',
    borderRadius: 'var(--radius-sm)'
  },
  portraitImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'var(--radius-sm)',
    filter: 'grayscale(100%)',
    border: '1px solid var(--border-color)',
    position: 'relative',
    zIndex: 2
  },
  portraitBorder: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    right: '-12px',
    bottom: '-12px',
    border: '2px solid var(--primary-red)',
    borderRadius: 'var(--radius-sm)',
    zIndex: 1
  },
  darkSection: {
    background: '#040404'
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '650px',
    margin: '0 auto 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sectionLabel: {
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--primary-red)'
  },
  sectionSub: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  platformSection: {
    marginTop: '40px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '30px'
  },
  platformLabel: {
    fontSize: '0.6rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
    marginBottom: '15px'
  },
  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  platformCard: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    padding: '12px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    color: '#fff',
    transition: 'border-color 0.2s ease',
    textDecoration: 'none'
  },
  servicePanel: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  serviceTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#fff'
  },
  serviceDescription: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5'
  },
  serviceDivider: {
    height: '1px',
    background: 'var(--border-color)',
    margin: '4px 0'
  },
  serviceList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1,
    marginBottom: '16px'
  },
  serviceItem: {
    display: 'flex',
    gap: '8px',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    alignItems: 'flex-start'
  },
  bullet: {
    color: 'var(--primary-red)'
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflow: 'hidden',
    textAlign: 'left'
  },
  productImageWrapper: {
    width: '100%',
    height: '220px',
    position: 'relative',
    background: '#000000'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(100%)',
    transition: 'filter 0.2s ease'
  },
  productBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'var(--primary-red)',
    color: '#fff',
    fontSize: '0.55rem',
    fontWeight: '700',
    padding: '3px 6px',
    borderRadius: '2px',
    letterSpacing: '0.05em'
  },
  productInfo: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1
  },
  productName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff',
    lineHeight: '1.4'
  },
  productPriceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#fff'
  },
  productInStock: {
    fontSize: '0.6rem',
    color: 'var(--primary-red)',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  eventsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  eventRow: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px 20px',
    gap: '20px',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  eventDateCol: {
    flex: '0 0 100px',
    borderRight: '1px solid var(--border-color)'
  },
  eventDate: {
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--primary-red)'
  },
  eventVenueCol: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  eventTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff'
  },
  eventSubText: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)'
  },
  eventActionCol: {
    flex: '0 0 120px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  eventMutedBadge: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    letterSpacing: '0.05em'
  },
  eventRedBadge: {
    fontSize: '0.65rem',
    color: 'var(--primary-red)',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  galleryCard: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    cursor: 'pointer',
    textAlign: 'left'
  },
  galleryImageWrapper: {
    width: '100%',
    height: '180px',
    position: 'relative'
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(100%)'
  },
  galleryOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease'
  },
  galleryOverlayText: {
    fontSize: '0.6rem',
    fontWeight: '700',
    color: 'var(--primary-red)',
    letterSpacing: '0.08em'
  },
  galleryInfo: {
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  galleryCardTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#fff'
  },
  galleryCardDate: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)'
  },
  contactContainer: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    marginTop: '40px',
    flexWrap: 'wrap'
  },
  contactDetailsCol: {
    flex: '1 1 350px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  contactDetailsTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#fff'
  },
  contactDetailsSub: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  directList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  directCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)'
  },
  directLabel: {
    display: 'block',
    fontSize: '0.55rem',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em'
  },
  directVal: {
    fontSize: '0.85rem',
    color: '#fff',
    fontWeight: '600',
    textDecoration: 'none'
  },
  instantWhatsappPanel: {
    padding: '16px',
    background: 'rgba(229, 9, 20, 0.03)',
    border: '1px solid var(--border-red)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  contactFormCol: {
    flex: '1.2 1 450px'
  },
  formTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '20px'
  },
  budgetLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  budgetValDisplay: {
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    fontWeight: '600',
    color: 'var(--primary-red)'
  },
  sliderLimitsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.65rem',
    color: 'var(--text-muted)'
  },
  errorText: {
    fontSize: '0.7rem',
    color: 'var(--primary-red)',
    marginTop: '3px',
    display: 'block'
  },
  submittedPanel: {
    padding: '40px 20px',
    textAlign: 'center'
  }
};

export default Home;
