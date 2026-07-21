import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  metrics?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Danjhay didn't just manage our social media campaign; he understood our brand core. His creative direction on our TikTok strategy brought 1.2M organic views in under a month and drove our conversions up by 400%!",
    author: "Femi Adebayo",
    role: "Marketing Director, CleanScent Ltd",
    metrics: "4.2M views • 4.8x ROI"
  },
  {
    quote: "Collaborating with Danjhay in the studio and on stage is electric. He brings a rare depth of songwriting talent combined with absolute professional focus. The 'Grace & Gold' acoustic session represents high-fidelity luxury worship at its absolute best.",
    author: "Sarah Jenkins",
    role: "Gospel Recording Artist",
    metrics: "Top 10 Gospel Charts"
  },
  {
    quote: "We hired Danjhay for our annual gala event coverage. The turnaround speed was mind-blowing, and the reels generated were of elite premium quality. The red carpet interviews made our VIP guests feel like royalty.",
    author: "Emmanuel Nduka",
    role: "Chief Organizer, West African Fashion Awards",
    metrics: "Trended #3 on Twitter (X)"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="glass-panel" style={styles.carousel}>
      {/* Big quotation graphics */}
      <span style={styles.quoteIcon}>“</span>

      <div style={styles.contentWrapper}>
        {TESTIMONIALS.map((t, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={t.author}
              style={{
                ...styles.slide,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(30px)',
                position: isActive ? 'relative' : 'absolute',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <p style={styles.quoteText}>{t.quote}</p>
              
              <div style={styles.meta}>
                <h4 style={styles.author}>{t.author}</h4>
                <p style={styles.role}>{t.role}</p>
                {t.metrics && <span style={styles.badge}>{t.metrics}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chevrons Navigation */}
      <div style={styles.navRow}>
        <button onClick={handlePrev} style={styles.arrowBtn} aria-label="Previous Review">
          <ChevronLeft size={16} color="var(--gold)" />
        </button>
        
        {/* Indicators Dots */}
        <div style={styles.dots}>
          {TESTIMONIALS.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                ...styles.dot,
                background: idx === activeIndex ? 'var(--gold)' : '#222',
                transform: idx === activeIndex ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>

        <button onClick={handleNext} style={styles.arrowBtn} aria-label="Next Review">
          <ChevronRight size={16} color="var(--gold)" />
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  carousel: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '50px 40px 30px',
    textAlign: 'center',
    overflow: 'hidden'
  },
  quoteIcon: {
    fontFamily: 'var(--font-serif)',
    fontSize: '6rem',
    color: 'rgba(212, 175, 55, 0.1)',
    position: 'absolute',
    top: '-20px',
    left: '25px',
    lineHeight: '1'
  },
  contentWrapper: {
    position: 'relative',
    minHeight: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  slide: {
    width: '100%',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  quoteText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.25rem',
    fontStyle: 'italic',
    lineHeight: '1.7',
    color: '#fff',
    marginBottom: '25px',
    fontWeight: '300'
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  author: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--gold)',
    letterSpacing: '0.05em'
  },
  role: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)'
  },
  badge: {
    fontSize: '0.65rem',
    fontWeight: '700',
    background: 'rgba(212, 175, 55, 0.08)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    color: 'var(--gold-light)',
    padding: '3px 8px',
    borderRadius: '10px',
    marginTop: '8px',
    letterSpacing: '0.05em'
  },
  navRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
    borderTop: '1px solid #151515',
    paddingTop: '15px'
  },
  arrowBtn: {
    background: 'transparent',
    border: '1px solid #222',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  dots: {
    display: 'flex',
    gap: '8px'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default TestimonialCarousel;
