import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { siteContent, type Track } from '../utils/siteContent';
import { useSiteData } from '../hooks/useSiteData';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const { tracks: dynamicTracks } = useSiteData();

  useEffect(() => {
    setTracks(dynamicTracks);
  }, [dynamicTracks]);

  const currentTrack = tracks[currentTrackIndex] || siteContent.tracks[0];

  // Volume slider sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Playback failed:', err);
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]); // Auto-play when track changes if already playing

  const onTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration || 0);
  };
  const onEnded = () => handleNext();

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log('Playback failed:', err));
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="panel" style={styles.container}>
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />

      {/* Player Layout Display */}
      <div className="player-layout" style={styles.playerLayout}>
        
        {/* Artwork cover */}
        <div className="player-cover-wrapper" style={styles.coverWrapper}>
          <img src={currentTrack.artwork} alt={currentTrack.title} style={styles.coverImage} />
          {isPlaying && (
            <div style={styles.playingOverlay}>
              <span style={styles.playingText}>PLAYING</span>
            </div>
          )}
        </div>

        {/* Audio controls panel */}
        <div style={styles.mainPanel}>
          <div className="player-meta-row" style={styles.metaRow}>
            <div>
              <h3 style={styles.trackTitle}>{currentTrack.title}</h3>
              <p style={styles.trackArtist}>{currentTrack.category}</p>
            </div>
            
            {/* Pure Red Audio wave visualizer */}
            <div style={styles.visualizer}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.visualizerBar,
                    animation: isPlaying
                      ? `wave ${0.5 + i * 0.15}s ease-in-out infinite alternate`
                      : 'none',
                    height: isPlaying ? '14px' : '2px'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar line */}
          <div style={styles.progressSection}>
            <span style={styles.timeLabel}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              style={styles.progressBar}
            />
            <span style={styles.timeLabel}>{formatTime(duration || 180)}</span>
          </div>

          {/* Interactive buttons */}
          <div style={styles.controlsRow}>
            <div style={styles.controlButtons}>
              <button onClick={handlePrev} style={styles.iconButton} aria-label="Previous Track">
                <SkipBack size={16} />
              </button>
              
              <button onClick={togglePlay} style={styles.playButton} aria-label="Play/Pause">
                {isPlaying ? <Pause size={18} color="white" /> : <Play size={18} color="white" style={{ marginLeft: '2px' }} />}
              </button>

              <button onClick={handleNext} style={styles.iconButton} aria-label="Next Track">
                <SkipForward size={16} />
              </button>
            </div>

            {/* Volume track control */}
            <div style={styles.volumeWrapper}>
              <button onClick={toggleMute} style={styles.volumeButton} aria-label="Mute">
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                style={styles.volumeSlider}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Playlist Grid */}
      <div style={styles.playlistSection}>
        <h4 style={styles.playlistHeading}>PLAYLIST TRACKS</h4>
        <div style={styles.playlistItems}>
          {tracks.map((track, index) => {
            const isCurrent = index === currentTrackIndex;
            return (
              <div
                key={track.title}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(true);
                }}
                style={{
                  ...styles.playlistItem,
                  background: isCurrent ? 'rgba(229, 9, 20, 0.05)' : 'transparent',
                  borderColor: isCurrent ? 'var(--border-red)' : 'var(--border-color)'
                }}
              >
                <div style={styles.playlistLeft}>
                  <img src={track.artwork} alt="" style={styles.playlistThumb} />
                  <span
                    style={{
                      ...styles.playlistTitle,
                      color: isCurrent ? 'var(--primary-red)' : '#fff'
                    }}
                  >
                    {track.title}
                  </span>
                </div>
                <span style={styles.playlistDuration}>
                  {isCurrent && isPlaying ? (
                    <span style={styles.liveIndicator}>PLAYING</span>
                  ) : (
                    'PREVIEW'
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px'
  },
  playerLayout: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    marginBottom: '24px'
  },
  coverWrapper: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    border: '1px solid var(--border-color)'
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  playingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--primary-red)',
    padding: '3px 0',
    textAlign: 'center'
  },
  playingText: {
    fontSize: '0.55rem',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '0.1em'
  },
  mainPanel: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  trackTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '2px'
  },
  trackArtist: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)'
  },
  visualizer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '2px',
    height: '24px'
  },
  visualizerBar: {
    width: '2px',
    background: 'var(--primary-red)',
    borderRadius: '1px',
    transition: 'height 0.2s ease'
  },
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  timeLabel: {
    fontSize: '0.7rem',
    fontFamily: 'monospace',
    color: 'var(--text-muted)',
    width: '32px'
  },
  progressBar: {
    flexGrow: 1
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  controlButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    outline: 'none'
  },
  playButton: {
    background: 'var(--primary-red)',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 0 10px var(--primary-red-glow)'
  },
  volumeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  volumeButton: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    outline: 'none'
  },
  volumeSlider: {
    width: '60px'
  },
  playlistSection: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '20px',
    textAlign: 'left'
  },
  playlistHeading: {
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
    marginBottom: '10px'
  },
  playlistItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  playlistItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  playlistLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  playlistThumb: {
    width: '28px',
    height: '28px',
    borderRadius: '2px',
    objectFit: 'cover'
  },
  playlistTitle: {
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  playlistDuration: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)'
  },
  liveIndicator: {
    color: 'var(--primary-red)',
    fontSize: '0.6rem',
    fontWeight: '700',
    letterSpacing: '0.05em'
  }
};

export default MusicPlayer;
