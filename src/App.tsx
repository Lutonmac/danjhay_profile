import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useSiteData } from './hooks/useSiteData';
import type { MediaItem } from './utils/siteContent';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { tracks } = useSiteData();

  useEffect(() => {
    const logVisit = async () => {
      // Only log once per session to avoid inflated counts
      if (!sessionStorage.getItem('has_visited')) {
        try {
          const { error } = await supabase.from('page_views').insert([{ path: window.location.pathname }]);
          if (!error) {
            sessionStorage.setItem('has_visited', 'true');
          }
        } catch (e) {
          console.error('Failed to log visit', e);
        }
      }
    };
    logVisit();
  }, []);

  if (isAdminMode) {
    return <Admin onClose={() => setIsAdminMode(false)} />;
  }

  return (
    <>
      {/* Sleek Minimal Header */}
      <Navbar />

      {/* Main Single-Page Content Area */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Home setLightboxItem={setLightboxItem} />
      </main>

      {/* Modern Footnote */}
      <Footer onAdminClick={() => setIsAdminMode(true)} />

      {/* Lightweight Media Gallery Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  );
};

export default App;
