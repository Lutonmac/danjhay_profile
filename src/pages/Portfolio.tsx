import React, { useState } from 'react';
import { Sparkles, BarChart2, Video, Music, Filter } from 'lucide-react';
import type { PortfolioItem } from '../utils/initialPortfolioData';

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
  setLightboxItem: (item: PortfolioItem) => void;
}

type CategoryFilter = 'All' | 'Music' | 'Digital Marketing' | 'Event Coverage' | 'Creative Branding';

const Portfolio: React.FC<PortfolioProps> = ({ portfolioItems, setLightboxItem }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = ['All', 'Music', 'Digital Marketing', 'Event Coverage', 'Creative Branding'];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Music': return <Music size={14} color="var(--gold)" />;
      case 'Digital Marketing': return <BarChart2 size={14} color="var(--gold)" />;
      case 'Event Coverage': return <Video size={14} color="var(--gold)" />;
      default: return <Sparkles size={14} color="var(--gold)" />;
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '90vh' }}>
      
      {/* Cover Header */}
      <section style={styles.headerSection}>
        <div style={styles.headerOverlay} />
        <div className="container" style={styles.headerContent}>
          <span style={styles.sectionLabel} className="gradient-text">MEDIA KIT & ARCHIVE</span>
          <h1 className="page-header-title">Proof of Authority</h1>
          <p style={styles.headerSubtext}>
            Explore our complete record of music releases, corporate campaigns, live event coverage, and identity strategies.
          </p>
        </div>
      </section>

      {/* Filter Options & Catalog */}
      <section className="section-padding" style={{ background: '#030303' }}>
        <div className="container">
          
          {/* Filters Bar */}
          <div className="portfolio-filters-bar">
            <div style={styles.filterLabelGroup}>
              <Filter size={16} color="var(--gold)" />
              <span style={styles.filterHeading}>FILTER GALLERY</span>
            </div>
            
            <div style={styles.categoriesRow}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      ...styles.catButton,
                      background: isActive ? 'var(--gold-gradient)' : 'rgba(20, 20, 20, 0.7)',
                      color: isActive ? '#000' : 'var(--text-primary)',
                      border: isActive ? '1px solid transparent' : '1px solid #1a1a1a',
                      fontWeight: isActive ? '700' : '400'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredItems.length === 0 ? (
            <div style={styles.emptyState}>
              <Sparkles size={32} color="var(--text-muted)" style={{ margin: '0 auto 15px' }} />
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '8px' }}>No entries found</h3>
              <p style={{ fontSize: '0.85rem' }}>Try adding items via the Admin Panel to see them pop up here.</p>
            </div>
          ) : (
            <div className="grid-3" style={{ marginTop: '40px' }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="portfolio-page-card animate-fade-in"
                >
                  {/* Card Visual cover */}
                  <div style={styles.cardImageWrapper}>
                    <img src={item.imageUrl} alt={item.title} className="portfolio-page-image" />
                    <div className="portfolio-page-hover-overlay">
                      <span style={styles.hoverText}>EXPLORE MEDIA</span>
                    </div>
                    <div style={styles.cardBadge}>
                      {getCategoryIcon(item.category)}
                      <span style={{ fontSize: '0.6rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                        {item.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Card descriptions */}
                  <div style={styles.cardInfo}>
                    <div style={styles.cardHeaderRow}>
                      <span style={styles.cardDate}>{item.date}</span>
                    </div>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <p style={styles.cardSubtitle}>{item.subtitle}</p>

                    {/* Brief strategy description */}
                    <p style={styles.cardSummary}>
                      {item.description.slice(0, 100)}...
                    </p>

                    {/* Direct metric preview */}
                    {item.metrics && item.metrics.length > 0 && (
                      <div style={styles.metricsRow}>
                        {item.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} style={styles.metricItem}>
                            <span style={styles.metricValue}>{m.value}</span>
                            <span style={styles.metricLabel}>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  headerSection: {
    position: 'relative',
    background: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80") no-repeat center center',
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
  filterLabelGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  filterHeading: {
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    color: 'var(--text-primary)'
  },
  categoriesRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  catButton: {
    border: 'none',
    padding: '8px 16px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  cardImageWrapper: {
    position: 'relative',
    height: '220px',
    overflow: 'hidden',
    background: '#000'
  },
  hoverText: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#000',
    background: 'var(--gold-gradient)',
    padding: '8px 16px',
    borderRadius: '2px',
    letterSpacing: '0.05em'
  },
  cardBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'rgba(5, 5, 5, 0.85)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '4px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#fff'
  },
  cardInfo: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardDate: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#fff',
    lineHeight: '1.2'
  },
  cardSubtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  },
  cardSummary: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: 'var(--text-muted)',
    marginTop: '6px'
  },
  metricsRow: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
    borderTop: '1px solid #1a1a1a',
    paddingTop: '15px'
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  metricValue: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--gold)',
    fontFamily: 'var(--font-serif)'
  },
  metricLabel: {
    fontSize: '0.6rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  emptyState: {
    padding: '80px 24px',
    textAlign: 'center',
    border: '1px dashed #1a1a1a',
    borderRadius: 'var(--radius-lg)'
  }
};

export default Portfolio;
