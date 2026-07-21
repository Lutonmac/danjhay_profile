import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteContent } from '../utils/siteContent';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music' },
    { id: 'services', label: 'Services' },
    { id: 'merch', label: 'Merch' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  // Track scroll position to update active navbar state dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset for sticky nav
      
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <header style={styles.header}>
        <div className="navbar-fluid" style={styles.navbarContainer}>
          {/* Logo Brand */}
          <a href="#home" style={styles.brand} onClick={(e) => handleNavClick(e, 'home')}>
            <img src="/images/danjhay-logo.png" alt="Danjhay Logo" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
          </a>

          {/* Desktop Nav Items */}
          <nav className="navbar-desktop-nav" style={styles.desktopNav}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={{
                    ...styles.navLink,
                    color: isActive ? 'var(--primary-red)' : '#000000',
                    fontWeight: isActive ? '600' : '400'
                  }}
                >
                  {item.label}
                  {isActive && <div style={styles.activeLine} />}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-mobile-toggle"
            aria-label="Toggle Menu"
            style={styles.mobileToggle}
          >
            {mobileMenuOpen ? <X size={22} color="black" /> : <Menu size={22} color="black" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div style={styles.backdrop} onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Nav Drawer */}
      <div
        style={{
          ...styles.mobileDrawer,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div style={styles.drawerHeader}>
          <span style={styles.drawerTitle}>NAVIGATION</span>
          <button onClick={() => setMobileMenuOpen(false)} style={styles.closeBtn}>
            <X size={18} color="var(--text-secondary)" />
          </button>
        </div>
        <div style={styles.drawerLinks}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                style={{
                  ...styles.drawerLink,
                  color: isActive ? 'var(--primary-red)' : 'var(--text-primary)',
                  borderLeft: isActive ? '2px solid var(--primary-red)' : '2px solid transparent',
                  background: isActive ? 'rgba(229, 9, 20, 0.04)' : 'transparent'
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <div style={styles.drawerFooter}>
          <p style={styles.drawerFooterText}>{siteContent.bio.slogan}</p>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    zIndex: 100,
    background: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center'
  },
  navbarContainer: {
    // Layout handled by .navbar-fluid in index.css
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    letterSpacing: '0.15em',
    textDecoration: 'none'
  },
  logoText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#ffffff',
    transition: 'color 0.2s ease'
  },
  logoIcon: {
    color: 'var(--primary-red)',
    marginBottom: '4px'
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px'
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '6px 0',
    position: 'relative',
    transition: 'color 0.2s ease',
    outline: 'none',
    cursor: 'pointer'
  },
  activeLine: {
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    right: 0,
    height: '2px',
    background: 'var(--primary-red)'
  },
  mobileToggle: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 98,
    background: 'rgba(0, 0, 0, 0.8)'
  },
  mobileDrawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '260px',
    zIndex: 99,
    background: '#070707',
    borderLeft: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  drawerHeader: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-color)'
  },
  drawerTitle: {
    fontSize: '0.7rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    color: 'var(--text-muted)'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  },
  drawerLinks: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
    flexGrow: 1
  },
  drawerLink: {
    textDecoration: 'none',
    fontSize: '0.9rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textAlign: 'left',
    padding: '14px 20px',
    outline: 'none',
    transition: 'all 0.15s ease',
    width: '100%'
  },
  drawerFooter: {
    padding: '20px',
    borderTop: '1px solid var(--border-color)'
  },
  drawerFooterText: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textAlign: 'center',
    fontStyle: 'italic'
  }
};

export default Navbar;
