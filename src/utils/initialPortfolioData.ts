export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Music' | 'Digital Marketing' | 'Event Coverage' | 'Creative Branding';
  subtitle: string;
  imageUrl: string;
  description: string;
  mediaType: 'video' | 'audio' | 'image';
  mediaUrl: string;
  metrics?: { label: string; value: string }[];
  date: string;
}

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'm1',
    title: 'Grace & Gold (Acoustic Sessions)',
    category: 'Music',
    subtitle: 'Latest Studio Album Single',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'An intimate blend of soulful worship and afro-acoustic melodies. This single reached the top gospel charts, inspiring listeners to embrace faith through deep, authentic storytelling.',
    mediaType: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Curated premium sample loop
    metrics: [
      { label: 'Spotify Streams', value: '150K+' },
      { label: 'YouTube Views', value: '80K+' }
    ],
    date: '2026-03'
  },
  {
    id: 'd1',
    title: 'TikTok Viral Strategy — CleanScent Brand',
    category: 'Digital Marketing',
    subtitle: 'Brand Growth Campaign',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Designed and executed a short-form video challenge that scaled an organic skincare brand across West Africa. Focused on high-retention storytelling hooks and micro-influencer partnerships.',
    mediaType: 'image',
    mediaUrl: '',
    metrics: [
      { label: 'Total Views', value: '4.2 Million' },
      { label: 'Follower Increase', value: '250%' },
      { label: 'Conversion ROI', value: '4.8x' }
    ],
    date: '2026-01'
  },
  {
    id: 'e1',
    title: 'Mega Praise Fest Live Coverage',
    category: 'Event Coverage',
    subtitle: 'Full Media & Red Carpet Coverage',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    description: 'Lead director for full-event social media coverage. Conducted red carpet interviews with notable artists, curated live reels that trended on Twitter (X), and managed rapid event-to-screen media flow.',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Premium video loop mockup
    metrics: [
      { label: 'Live Engagement', value: '620K+' },
      { label: 'Interviews Conducted', value: '18' }
    ],
    date: '2025-11'
  },
  {
    id: 'c1',
    title: 'Divine Royalty Artist Identity',
    category: 'Creative Branding',
    subtitle: 'Complete Creative Direction & Rebrand',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted the visual architecture, album art direction, and press release kits for gospel artist Divine Royalty. Established a dark luxury signature identity that helped secure major streaming editorial playlist slots.',
    mediaType: 'image',
    mediaUrl: '',
    metrics: [
      { label: 'Press Pickup', value: '12 Outlets' },
      { label: 'Editorial Playlists', value: '5' }
    ],
    date: '2025-09'
  },
  {
    id: 'm2',
    title: 'Kingdom Gangsters (Official Video)',
    category: 'Music',
    subtitle: 'Directing & Vocal Performance',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    description: 'An energetic Christian drill anthem pushing the message of righteousness. The music video portrays raw, street-level faith, utilizing high-contrast luxury visuals and fast cinematic transitions.',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/movie.mp4',
    metrics: [
      { label: 'YouTube Views', value: '300K+' },
      { label: 'Shazams', value: '45K+' }
    ],
    date: '2025-07'
  },
  {
    id: 'd2',
    title: 'Lagos Fashion Week Content Takeover',
    category: 'Digital Marketing',
    subtitle: 'Social Media Management & Hype Campaign',
    imageUrl: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80',
    description: 'Managed real-time event stories, brand collaborations, and automated DM funnels during Lagos Fashion Week, delivering massive lead captures for a luxury menswear client.',
    mediaType: 'image',
    mediaUrl: '',
    metrics: [
      { label: 'Reaches', value: '1.8M Account' },
      { label: 'Leads Generated', value: '3,200+' }
    ],
    date: '2025-10'
  }
];
