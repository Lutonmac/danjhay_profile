import React, { useState, useEffect } from 'react';
import type { Track, EventItem, MediaItem } from '../utils/siteContent';
import { ArrowLeft, Plus, Trash2, Save, X, Lock, AlertCircle, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useSiteData } from '../hooks/useSiteData';

interface AdminProps {
  onClose: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'tracks' | 'events' | 'gallery' | 'analytics' | 'booking'>('tracks');
  const [totalViews, setTotalViews] = useState<number>(0);
  const [monthlyViews, setMonthlyViews] = useState<number>(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (activeTab === 'analytics' && isAuthenticated) {
        try {
          const { count: totalCount } = await supabase.from('page_views').select('*', { count: 'exact', head: true });
          
          const startOfMonth = new Date();
          startOfMonth.setDate(1);
          startOfMonth.setHours(0, 0, 0, 0);
          
          const { count: monthlyCount } = await supabase
            .from('page_views')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth.toISOString());
            
          setTotalViews(totalCount || 0);
          setMonthlyViews(monthlyCount || 0);
        } catch (e) {
          console.error("Error fetching analytics", e);
        }
      }
    };
    fetchAnalytics();
  }, [activeTab, isAuthenticated]);

  // We use useSiteData to automatically keep the Admin UI in sync with Firestore
  const { tracks: customTracks, events: customEvents, media: customMedia, bioImage: profileImage, bookingEmail, bookingPhone, bookingWhatsApp, heroLabel, fullName, tagline, description } = useSiteData();
  
  const [editBookingEmail, setEditBookingEmail] = useState('');
  const [editBookingPhone, setEditBookingPhone] = useState('');
  const [editBookingWhatsApp, setEditBookingWhatsApp] = useState('');

  const [editHeroLabel, setEditHeroLabel] = useState('');
  const [editFullName, setEditFullName] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    if (bookingEmail) setEditBookingEmail(bookingEmail);
    if (bookingPhone) setEditBookingPhone(bookingPhone);
    if (bookingWhatsApp) setEditBookingWhatsApp(bookingWhatsApp);
    if (heroLabel) setEditHeroLabel(heroLabel);
    if (fullName) setEditFullName(fullName);
    if (tagline) setEditTagline(tagline);
    if (description) setEditDescription(description);
  }, [bookingEmail, bookingPhone, bookingWhatsApp, heroLabel, fullName, tagline, description]);

  const handleSaveBookingSettings = async () => {
    if (!isAuthenticated) return;
    try {
      const { error } = await supabase.from('settings').upsert({
        id: 'profile',
        email: editBookingEmail,
        phone: editBookingPhone,
        whatsapp: editBookingWhatsApp
      });
      if (error) {
        alert("Failed to update booking settings: " + error.message);
      } else {
        alert("Booking settings updated successfully!");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleSaveBioSettings = async () => {
    if (!isAuthenticated) return;
    try {
      const { error } = await supabase.from('settings').upsert({
        id: 'profile',
        heroLabel: editHeroLabel,
        fullName: editFullName,
        tagline: editTagline,
        description: editDescription
      });
      if (error) {
        alert("Failed to update bio settings: " + error.message);
      } else {
        alert("Bio settings updated successfully!");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };
  
  const customOnlyTracks = customTracks;
  const customOnlyEvents = customEvents;
  const customOnlyMedia = customMedia;
  
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  // File objects for uploading
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  const [newTrack, setNewTrack] = useState<Partial<Track>>({
    title: '', category: '', artwork: '', audioUrl: '', streamingLinks: {}
  });

  const [newEvent, setNewEvent] = useState<Partial<EventItem>>({
    title: '', date: '', venue: '', location: '', ticketStatus: 'Tickets', ticketUrl: ''
  });

  const [newMedia, setNewMedia] = useState<Partial<MediaItem>>({
    title: '', caption: '', date: '', type: 'image'
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setAuthError('');
    } catch (error: any) {
      setAuthError(error.message || 'Access Denied. Invalid credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const uploadToSupabase = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage.from('media').upload(filePath, file);
    if (error) throw error;

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      if (id.length <= 5) {
        alert("This is a demo track hardcoded in the template. To remove it permanently, please delete it from src/utils/siteContent.ts, or upload a new track which will automatically replace the demo tracks.");
        return;
      }
      try {
        await supabase.from('tracks').delete().eq('id', id);
      } catch (error) {
        console.error("Error deleting track:", error);
        alert("Failed to delete track. Ensure Supabase is connected.");
      }
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      if (id.length <= 5) {
        alert("This is a demo event hardcoded in the template. Please remove it from src/utils/siteContent.ts.");
        return;
      }
      try { await supabase.from('events').delete().eq('id', id); } catch(e) {}
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      if (id.length <= 5) {
        alert("This is a demo media item hardcoded in the template. Please remove it from src/utils/siteContent.ts.");
        return;
      }
      try { await supabase.from('gallery').delete().eq('id', id); } catch(e) {}
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const { error: insertError } = await supabase.from('events').insert([newEvent]);
      if (insertError) throw insertError;
      setIsAdding(false);
      setNewEvent({ title: '', date: '', venue: '', location: '', ticketStatus: 'Tickets', ticketUrl: '' });
    } catch (error) {
      console.error(error);
      alert("Failed to add event");
    } finally {
      setIsUploading(false);
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalUrl = newMedia.imageUrl || '';
      if (artworkFile) {
        finalUrl = await uploadToSupabase(artworkFile, 'gallery');
      }
      
      const mediaDoc = {
        title: newMedia.title,
        caption: newMedia.caption || '',
        type: newMedia.type || 'image',
        imageUrl: finalUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
      };

      const { error: insertError } = await supabase.from('gallery').insert([mediaDoc]);
      if (insertError) throw insertError;
      setIsAdding(false);
      setNewMedia({ title: '', caption: '', date: '', type: 'image' });
      setArtworkFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add media");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>, field: 'artwork' | 'audioUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'audioUrl') setAudioFile(file);
      if (field === 'artwork') setArtworkFile(file);
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const downloadUrl = await uploadToSupabase(file, 'profile_images');
        
        // Save URL to Supabase
        const { error: upsertError } = await supabase.from('settings').upsert({ id: 'profile', aboutImage: downloadUrl });
        if (upsertError) throw upsertError;
        alert('Profile image updated successfully across all devices.');
      } catch (error) {
        console.error("Profile Image Upload Error:", error);
        alert("Failed to upload image. Ensure Supabase Storage is configured.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || (!audioFile && !newTrack.audioUrl)) {
      alert("Please provide at least a title and an audio file/URL.");
      return;
    }

    setIsUploading(true);

    if (audioFile && audioFile.size === 0) {
      alert("The selected audio file is empty or hasn't finished downloading to your device (common with iCloud files). Please ensure it is fully downloaded before uploading.");
      setIsUploading(false);
      return;
    }

    if (artworkFile && artworkFile.size === 0) {
      alert("The selected artwork file is empty. Please try another file.");
      setIsUploading(false);
      return;
    }

    try {
      let finalAudioUrl = newTrack.audioUrl || '';
      let finalArtworkUrl = newTrack.artwork || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80';

      // Upload Audio to Storage if provided
      if (audioFile) {
        finalAudioUrl = await uploadToSupabase(audioFile, 'tracks/audio');
      }

      // Upload Artwork to Storage if provided
      if (artworkFile) {
        finalArtworkUrl = await uploadToSupabase(artworkFile, 'tracks/artwork');
      }

      // Save to Supabase
      const trackDoc = {
        title: newTrack.title,
        category: newTrack.category || 'Custom Upload',
        artwork: finalArtworkUrl,
        audioUrl: finalAudioUrl,
        streamingLinks: newTrack.streamingLinks || {}
      };
      const { error: insertError } = await supabase.from('tracks').insert([trackDoc]);
      if (insertError) throw insertError;

      setIsAdding(false);
      setNewTrack({ title: '', category: '', artwork: '', audioUrl: '', streamingLinks: {} });
      setAudioFile(null);
      setArtworkFile(null);

    } catch (error) {
      console.error("Error uploading track:", error);
      alert("Upload failed. Please verify that Supabase is properly configured.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.lockScreen}>
        <div className="panel" style={styles.lockCard}>
          <div style={styles.iconBox}>
            <Lock size={32} color="var(--primary-red)" />
          </div>
          <h2 style={styles.lockTitle}>ADMIN DASHBOARD</h2>
          <p style={styles.lockSubtitle}>Sign in to manage your site</p>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
              ACCESS CONSOLE
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
              RETURN TO SITE
            </button>

            {authError && (
              <div style={styles.errorToast}>
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }



  return (
    <div style={styles.container}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={styles.dashboardHeader}>
          <div>
            <h1 style={styles.headerTitle}>ADMIN DASHBOARD</h1>
            <p style={styles.headerSubtitle}>Manage your custom music uploads</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={16} /> LOGOUT
            </button>
            <button onClick={onClose} className="btn btn-secondary">
              <ArrowLeft size={16} /> RETURN TO SITE
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button onClick={() => { setActiveTab('tracks'); setIsAdding(false); }} className={`btn ${activeTab === 'tracks' ? 'btn-primary' : 'btn-secondary'}`}>MUSIC & PROFILE</button>
          <button onClick={() => { setActiveTab('events'); setIsAdding(false); }} className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`}>EVENTS</button>
          <button onClick={() => { setActiveTab('gallery'); setIsAdding(false); }} className={`btn ${activeTab === 'gallery' ? 'btn-primary' : 'btn-secondary'}`}>GALLERY</button>
          <button onClick={() => { setActiveTab('booking'); setIsAdding(false); }} className={`btn ${activeTab === 'booking' ? 'btn-primary' : 'btn-secondary'}`}>SITE SETTINGS</button>
          <button onClick={() => { setActiveTab('analytics'); setIsAdding(false); }} className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}>ANALYTICS</button>
        </div>

        {activeTab === 'analytics' && (
          <div>
            <div style={styles.sectionTop}>
              <h2>Visitor Analytics</h2>
            </div>
            
            <div className="grid-2">
              <div className="panel" style={{ padding: '30px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Total Visitors (All Time)</h3>
                <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-red)' }}>{totalViews}</p>
              </div>
              <div className="panel" style={{ padding: '30px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Visitors This Month</h3>
                <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-red)' }}>{monthlyViews}</p>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Note:</strong> Make sure you have created the <code>page_views</code> table in your Supabase dashboard using the SQL query provided. Analytics data updates in real-time as users visit your site.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div>
            <div style={styles.sectionTop}>
              <h2>Site Settings</h2>
            </div>

            <div className="panel" style={{ padding: '30px', borderColor: 'var(--border-color)', marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Bio Settings</h3>
                <button onClick={handleSaveBioSettings} className="btn btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Save size={16} /> SAVE BIO
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>
                Update the hero section text on the homepage.
              </p>

              <div style={styles.formGroup}>
                <label style={styles.label}>Hero Label</label>
                <input type="text" value={editHeroLabel} onChange={(e) => setEditHeroLabel(e.target.value)} style={styles.input} placeholder="e.g. DANJHAY" />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name / Main Title</label>
                <input type="text" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} style={styles.input} placeholder="e.g. DANJHAY" />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tagline</label>
                <input type="text" value={editTagline} onChange={(e) => setEditTagline(e.target.value)} style={styles.input} placeholder="e.g. MUSIC ARTIST • DIGITAL MARKETER" />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={{...styles.input, height: '100px', resize: 'vertical'}} placeholder="Short bio description..." />
              </div>
            </div>

            <div className="panel" style={{ padding: '30px', borderColor: 'var(--border-color)', marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Booking Settings</h3>
                <button onClick={handleSaveBookingSettings} className="btn btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Save size={16} /> SAVE SETTINGS
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>
                Update the contact information displayed in the "Booking & Inquiries" section of your homepage. Note that the WhatsApp Business Phone Number is just for display, while the WhatsApp Direct Link is the actual URL users are sent to when they click the button.
              </p>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={editBookingEmail}
                  onChange={(e) => setEditBookingEmail(e.target.value)}
                  style={styles.input}
                  placeholder="e.g. ayomide@danjhay.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>WhatsApp Business Phone Number (Display Text)</label>
                <input
                  type="text"
                  value={editBookingPhone}
                  onChange={(e) => setEditBookingPhone(e.target.value)}
                  style={styles.input}
                  placeholder="e.g. +2349069510888"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>WhatsApp Direct Link (URL)</label>
                <input
                  type="url"
                  value={editBookingWhatsApp}
                  onChange={(e) => setEditBookingWhatsApp(e.target.value)}
                  style={styles.input}
                  placeholder="e.g. https://wa.me/2349069510888"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracks' && (
          <>
            <div className="panel" style={{ marginBottom: '40px', borderColor: 'var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', borderBottom: 'none' }}>Profile Settings</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.85rem' }}>
                Update your primary portrait image shown on the hero section. Synced via Firebase Cloud Storage.
              </p>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
              />
            </div>
            {profileImage && (
              <div style={{ width: '80px', height: '100px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={profileImage} alt="Profile preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>

        <div>
          <div style={styles.sectionTop}>
            <h2>Custom Tracks</h2>
            {!isAdding && (
              <button onClick={() => setIsAdding(true)} className="btn btn-primary">
                <Plus size={16} /> ADD NEW TRACK
              </button>
            )}
          </div>

          {isAdding && (
            <div className="panel" style={styles.formPanel}>
              <div style={styles.formHeader}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Upload New Track</h3>
                <button onClick={() => setIsAdding(false)} style={styles.closeBtn} disabled={isUploading}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Track Title *</label>
                    <input 
                      type="text" 
                      value={newTrack.title}
                      onChange={e => setNewTrack({...newTrack, title: e.target.value})}
                      className="form-input"
                      placeholder="e.g. Kingdom Grace"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category / Genre</label>
                    <input 
                      type="text" 
                      value={newTrack.category}
                      onChange={e => setNewTrack({...newTrack, category: e.target.value})}
                      className="form-input"
                      placeholder="e.g. Christian Drill"
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group panel" style={{ padding: '16px', border: '1px solid var(--border-color)', background: 'transparent' }}>
                    <label className="form-label">Audio File (Any Format) *</label>
                    <div style={styles.fileInputWrapper}>
                      <input 
                        type="file" 
                        accept="audio/*,.mp3,.wav,.m4a,.aac,.flac,.ogg"
                        onChange={e => handleFileSelection(e, 'audioUrl')}
                        style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      />
                      <div style={styles.orDivider}>
                        <div style={styles.line}></div>
                        <span style={styles.orText}>OR URL</span>
                        <div style={styles.line}></div>
                      </div>
                      <input 
                        type="url" 
                        value={newTrack.audioUrl || ''}
                        onChange={e => setNewTrack({...newTrack, audioUrl: e.target.value})}
                        className="form-input"
                        placeholder="https://example.com/audio.mp3"
                        disabled={!!audioFile}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group panel" style={{ padding: '16px', border: '1px solid var(--border-color)', background: 'transparent' }}>
                    <label className="form-label">Artwork Image (Optional)</label>
                    <div style={styles.fileInputWrapper}>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => handleFileSelection(e, 'artwork')}
                        style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      />
                      <div style={styles.orDivider}>
                        <div style={styles.line}></div>
                        <span style={styles.orText}>OR URL</span>
                        <div style={styles.line}></div>
                      </div>
                      <input 
                        type="url" 
                        value={newTrack.artwork || ''}
                        onChange={e => setNewTrack({...newTrack, artwork: e.target.value})}
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                        disabled={!!artworkFile}
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.sectionDivider}>
                  <label className="form-label" style={{ marginBottom: '16px' }}>Streaming Links (Optional)</label>
                  <div className="grid-2">
                    <div className="form-group">
                      <input 
                        type="url" 
                        value={newTrack.streamingLinks?.spotify || ''}
                        onChange={e => setNewTrack({...newTrack, streamingLinks: {...newTrack.streamingLinks, spotify: e.target.value}})}
                        className="form-input"
                        placeholder="Spotify URL"
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="url" 
                        value={newTrack.streamingLinks?.appleMusic || ''}
                        onChange={e => setNewTrack({...newTrack, streamingLinks: {...newTrack.streamingLinks, appleMusic: e.target.value}})}
                        className="form-input"
                        placeholder="Apple Music URL"
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.formActions}>
                  <button type="button" onClick={() => setIsAdding(false)} className="btn btn-secondary" disabled={isUploading}>
                    CANCEL
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isUploading}>
                    {isUploading ? `UPLOADING TO CLOUD...` : <><Save size={16} /> SAVE TRACK</>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {customOnlyTracks.length === 0 && !isAdding ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No custom tracks uploaded yet.</p>
              <button onClick={() => setIsAdding(true)} className="btn btn-primary">
                <Plus size={16} /> UPLOAD FIRST TRACK
              </button>
            </div>
          ) : (
            <div style={styles.trackGrid}>
              {customOnlyTracks.map((track) => (
                <div key={track.id} className="panel product-card-wrapper" style={styles.trackCard}>
                  <div style={styles.trackCover}>
                    <img 
                      src={track.artwork} 
                      alt={track.title} 
                      className="product-image"
                      style={styles.trackImage}
                    />
                    <button 
                      onClick={() => handleDelete(track.id)}
                      style={styles.deleteBtn}
                      title="Delete Track"
                      className="admin-delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={styles.trackInfo}>
                    <h3 style={styles.trackTitle} title={track.title}>{track.title}</h3>
                    <p style={styles.trackCategory}>{track.category}</p>
                    <span style={styles.badgeExternal}>CLOUD SYNCED</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
        )}

        {activeTab === 'events' && (
          <div>
            <div style={styles.sectionTop}>
              <h2>Event Management</h2>
              {!isAdding && (
                <button onClick={() => setIsAdding(true)} className="btn btn-primary">
                  <Plus size={16} /> ADD NEW EVENT
                </button>
              )}
            </div>

            {isAdding && (
              <div className="panel" style={styles.formPanel}>
                <div style={styles.formHeader}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Create New Event</h3>
                  <button onClick={() => setIsAdding(false)} style={styles.closeBtn} disabled={isUploading}>
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleEventSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Event Title *</label>
                      <input type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date (e.g. OCT 24)</label>
                      <input type="text" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="form-input" required />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Venue</label>
                      <input type="text" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input type="text" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="form-input" required />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Ticket Status</label>
                      <select value={newEvent.ticketStatus} onChange={e => setNewEvent({...newEvent, ticketStatus: e.target.value as any})} className="form-select">
                        <option value="Tickets">Tickets Available</option>
                        <option value="Sold Out">Sold Out</option>
                        <option value="Register">Register</option>
                        <option value="Past">Past Event</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ticket URL</label>
                      <input type="url" value={newEvent.ticketUrl} onChange={e => setNewEvent({...newEvent, ticketUrl: e.target.value})} className="form-input" />
                    </div>
                  </div>
                  <div style={styles.formActions}>
                    <button type="button" onClick={() => setIsAdding(false)} className="btn btn-secondary" disabled={isUploading}>CANCEL</button>
                    <button type="submit" className="btn btn-primary" disabled={isUploading}>{isUploading ? 'SAVING...' : 'SAVE EVENT'}</button>
                  </div>
                </form>
              </div>
            )}

            {customOnlyEvents.length === 0 && !isAdding ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No custom events uploaded yet.</p>
                <button onClick={() => setIsAdding(true)} className="btn btn-primary"><Plus size={16} /> ADD FIRST EVENT</button>
              </div>
            ) : (
              <div style={styles.trackGrid}>
                {customOnlyEvents.map((evt) => (
                  <div key={evt.id} className="panel product-card-wrapper" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: '#fff' }}>{evt.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{evt.date} • {evt.venue}</p>
                    </div>
                    <button onClick={() => handleDeleteEvent(evt.id)} className="btn btn-secondary" style={{ padding: '8px' }}>
                      <Trash2 size={16} color="var(--primary-red)" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div style={styles.sectionTop}>
              <h2>Gallery Management</h2>
              {!isAdding && (
                <button onClick={() => setIsAdding(true)} className="btn btn-primary">
                  <Plus size={16} /> ADD NEW MEDIA
                </button>
              )}
            </div>

            {isAdding && (
              <div className="panel" style={styles.formPanel}>
                <div style={styles.formHeader}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Upload Media</h3>
                  <button onClick={() => setIsAdding(false)} style={styles.closeBtn} disabled={isUploading}>
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleMediaSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Title *</label>
                      <input type="text" value={newMedia.title} onChange={e => setNewMedia({...newMedia, title: e.target.value})} className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date (e.g. 2024)</label>
                      <input type="text" value={newMedia.date} onChange={e => setNewMedia({...newMedia, date: e.target.value})} className="form-input" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Caption</label>
                    <input type="text" value={newMedia.caption} onChange={e => setNewMedia({...newMedia, caption: e.target.value})} className="form-input" required />
                  </div>
                  <div className="form-group panel" style={{ padding: '16px', border: '1px solid var(--border-color)', background: 'transparent' }}>
                    <label className="form-label">Image File *</label>
                    <div style={styles.fileInputWrapper}>
                      <input type="file" accept="image/*" onChange={e => handleFileSelection(e, 'artwork')} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }} />
                      <div style={styles.orDivider}><div style={styles.line}></div><span style={styles.orText}>OR URL</span><div style={styles.line}></div></div>
                      <input type="url" value={newMedia.imageUrl || ''} onChange={e => setNewMedia({...newMedia, imageUrl: e.target.value})} className="form-input" disabled={!!artworkFile} />
                    </div>
                  </div>
                  <div style={styles.formActions}>
                    <button type="button" onClick={() => setIsAdding(false)} className="btn btn-secondary" disabled={isUploading}>CANCEL</button>
                    <button type="submit" className="btn btn-primary" disabled={isUploading}>{isUploading ? 'UPLOADING...' : 'SAVE MEDIA'}</button>
                  </div>
                </form>
              </div>
            )}

            {customOnlyMedia.length === 0 && !isAdding ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No custom media uploaded yet.</p>
                <button onClick={() => setIsAdding(true)} className="btn btn-primary"><Plus size={16} /> ADD FIRST MEDIA</button>
              </div>
            ) : (
              <div style={styles.trackGrid}>
                {customOnlyMedia.map((item) => (
                  <div key={item.id} className="panel product-card-wrapper" style={styles.trackCard}>
                    <div style={styles.trackCover}>
                      <img src={item.imageUrl} alt={item.title} className="product-image" style={styles.trackImage} />
                      <button onClick={() => handleDeleteMedia(item.id)} style={styles.deleteBtn} className="admin-delete-btn">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div style={styles.trackInfo}>
                      <h3 style={styles.trackTitle}>{item.title}</h3>
                      <p style={styles.trackCategory}>{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        .admin-delete-btn {
          opacity: 0.9;
          background: rgba(0,0,0,0.6);
          border-radius: 50%;
          padding: 8px;
        }
        .product-card-wrapper:hover .admin-delete-btn {
          opacity: 1;
          background: rgba(255,0,0,0.8);
        }
        .product-card-wrapper .product-image {
          filter: grayscale(80%);
        }
        .admin-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }
        @media (max-width: 768px) {
          .admin-tabs {
            flex-direction: column;
          }
          .admin-tabs .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'var(--bg-pure)',
    padding: '80px 24px',
    position: 'relative',
    zIndex: 50
  },
  lockScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'var(--bg-pure)',
    padding: '24px',
    position: 'relative',
    zIndex: 50
  },
  lockCard: {
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'var(--primary-red-glow)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  lockTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '8px',
    letterSpacing: '0.05em',
    color: '#fff'
  },
  lockSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '32px'
  },
  errorToast: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: 'var(--primary-red)',
    fontSize: '0.8rem',
    marginTop: '16px'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '24px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    marginBottom: '4px',
    color: '#fff'
  },
  headerSubtitle: {
    color: 'var(--text-secondary)'
  },
  sectionTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  formPanel: {
    marginBottom: '40px'
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '4px'
  },
  fileInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  orDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0'
  },
  line: {
    flexGrow: 1,
    height: '1px',
    background: 'var(--border-color)'
  },
  orText: {
    padding: '0 12px',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  sectionDivider: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '24px',
    marginTop: '24px'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '16px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    border: '1px dashed var(--border-color)',
    borderRadius: 'var(--radius-md)'
  },
  emptyText: {
    color: 'var(--text-secondary)',
    marginBottom: '16px'
  },
  trackGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
    gap: '24px'
  },
  trackCard: {
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  trackCover: {
    height: '180px',
    position: 'relative',
    background: '#111',
    overflow: 'hidden'
  },
  trackImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-smooth)'
  },
  deleteBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'rgba(229, 9, 20, 0.8)',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    cursor: 'pointer',
    transition: 'var(--transition-fast)'
  },
  trackInfo: {
    padding: '20px'
  },
  trackTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#fff'
  },
  trackCategory: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  },
  badgeLocal: {
    marginTop: '12px',
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase'
  },
  badgeExternal: {
    marginTop: '12px',
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--primary-red-glow)',
    color: 'var(--primary-red)',
    textTransform: 'uppercase'
  }
};

export default Admin;
