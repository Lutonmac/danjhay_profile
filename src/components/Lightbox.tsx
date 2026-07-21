import React from 'react';
import { X, Calendar, Play } from 'lucide-react';
import type { MediaItem } from '../utils/siteContent';

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div className="lightbox-modal" style={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeButton} aria-label="Close details">
          <X size={18} color="white" />
        </button>

        {/* Two-Column Detail Layout */}
        <div className="lightbox-layout" style={styles.layout}>
          
          {/* Left Column: Visual Media */}
          <div className="lightbox-media-container" style={styles.mediaContainer}>
            {item.type === 'video' && item.videoUrl ? (
              <div style={styles.videoWrapper}>
                <video
                  src={item.videoUrl}
                  controls
                  autoPlay
                  muted
                  style={styles.mainVideo}
                  poster={item.imageUrl}
                />
                <div style={styles.videoBadge}>
                  <Play size={8} color="white" style={{ display: 'inline', fill: 'white', marginRight: '4px' }} />
                  <span>VIDEO COMPILATION</span>
                </div>
              </div>
            ) : (
              <img src={item.imageUrl} alt={item.title} style={styles.mainImage} />
            )}
          </div>

          {/* Right Column: Information details */}
          <div className="lightbox-details-container" style={styles.detailsContainer}>
            <div style={styles.header}>
              <span style={styles.categoryBadge}>{item.type.toUpperCase()} RECORD</span>
              <div style={styles.dateBadge}>
                <Calendar size={12} color="var(--text-muted)" style={{ marginRight: '6px' }} />
                <span>{item.date}</span>
              </div>
            </div>

            <h2 style={styles.title}>{item.title}</h2>
            <div style={styles.divider} />

            <div style={styles.body}>
              <h4 style={styles.sectionHeading}>DESCRIPTION</h4>
              <p style={styles.description}>{item.caption}</p>
            </div>

            <div style={styles.footer}>
              <button
                onClick={() => {
                  onClose();
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                BOOK DANJHAY NOW
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  },
  modal: {
    background: '#070707',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: '#111',
    border: '1px solid var(--border-color)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    outline: 'none'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    minHeight: '450px'
  },
  mediaContainer: {
    background: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderRight: '1px solid var(--border-color)',
    minHeight: '300px'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  mainVideo: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover'
  },
  videoBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'var(--primary-red)',
    color: '#fff',
    padding: '3px 6px',
    borderRadius: '2px',
    fontSize: '0.55rem',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  detailsContainer: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  categoryBadge: {
    fontSize: '0.6rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: 'var(--primary-red)',
    border: '1px solid var(--border-red)',
    padding: '2px 6px',
    borderRadius: '2px'
  },
  dateBadge: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7rem',
    color: 'var(--text-muted)'
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#fff',
    lineHeight: '1.2',
    marginBottom: '15px'
  },
  divider: {
    height: '1px',
    background: 'var(--border-color)',
    marginBottom: '20px'
  },
  sectionHeading: {
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
    marginBottom: '6px',
    textTransform: 'uppercase'
  },
  body: {
    marginBottom: '20px'
  },
  description: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontWeight: '300'
  },
  footer: {
    marginTop: 'auto',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '16px'
  }
};

export default Lightbox;
