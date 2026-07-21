import React from 'react';
import { Mail, MessageSquare, Compass, Lock } from 'lucide-react';
import { siteContent } from '../utils/siteContent';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="footer-grid" style={styles.grid}>
          {/* Column 1: Brand & Message */}
          <div style={styles.col}>
            <img src="/images/danjhay-logo.png" alt="Danjhay Logo" style={{ height: '120px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }} />
            <p style={styles.description}>
              {siteContent.bio.description.substring(0, 160)}...
            </p>
            <div style={styles.socials}>
              <a href={siteContent.bio.instagram} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>INSTAGRAM</a>
              <a href={siteContent.bio.tiktok} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>TIKTOK</a>
              <a href={siteContent.bio.youtube} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>YOUTUBE</a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div style={styles.col}>
            <h4 style={styles.heading}>SECTIONS</h4>
            <ul style={styles.list}>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} style={styles.listLink}>Home</a></li>
              <li><a href="#music" onClick={(e) => handleNavClick(e, 'music')} style={styles.listLink}>Music Discography</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')} style={styles.listLink}>Consulting Services</a></li>
              <li><a href="#merch" onClick={(e) => handleNavClick(e, 'merch')} style={styles.listLink}>Brand Merch</a></li>
              <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')} style={styles.listLink}>Show Calendar</a></li>
              <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} style={styles.listLink}>Media Gallery</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div style={styles.col}>
            <h4 style={styles.heading}>CONNECT</h4>
            <ul style={styles.list}>
              <li style={styles.contactItem}>
                <Mail size={14} color="var(--primary-red)" />
                <a href={`mailto:${siteContent.bio.email}`} style={styles.contactText}>{siteContent.bio.email}</a>
              </li>
              <li style={styles.contactItem}>
                <MessageSquare size={14} color="var(--primary-red)" />
                <a href={siteContent.bio.whatsAppDirect} target="_blank" rel="noopener noreferrer" style={styles.contactText}>Quick Chat Room</a>
              </li>
              <li style={styles.contactItem}>
                <Compass size={14} color="var(--primary-red)" />
                <span style={styles.contactText}>Lagos, Nigeria • Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © {currentYear} {siteContent.bio.fullName}. All rights reserved. Soli Deo Gloria.
          </p>
          {onAdminClick && (
            <button 
              onClick={onAdminClick}
              title="Admin Access"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', marginLeft: 'auto' }}
            >
              <Lock size={12} color="var(--text-muted)" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    background: '#050505',
    borderTop: '1px solid var(--border-color)',
    padding: '60px 0 30px',
    marginTop: 'auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr',
    gap: '40px',
    marginBottom: '40px',
    textAlign: 'left'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  logoText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: '#fff',
    borderLeft: '2px solid var(--primary-red)',
    paddingLeft: '10px'
  },
  description: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '320px'
  },
  socials: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginTop: '4px'
  },
  socialLink: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em',
    textDecoration: 'none'
  },
  heading: {
    fontSize: '0.7rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    color: 'var(--text-primary)',
    marginBottom: '4px'
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  listLink: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    transition: 'color 0.15s ease'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.8rem'
  },
  contactText: {
    color: 'var(--text-secondary)',
    textDecoration: 'none'
  },
  bottom: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  copyright: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)'
  }
};

export default Footer;
