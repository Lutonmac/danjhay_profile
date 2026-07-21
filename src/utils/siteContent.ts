export interface Track {
  id: string;
  title: string;
  category: string;
  artwork: string;
  audioUrl: string; // fallback MP3 preview URL
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    audiomack?: string;
    youtube?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  checklist: string[];
  whatsAppTemplate: string; // Pre-filled text to open in WhatsApp chat
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  badge?: string;
  imageUrl: string;
  whatsAppTemplate: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  ticketStatus: 'Tickets' | 'Sold Out' | 'Register' | 'Past';
  ticketUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  caption: string;
  date: string;
}

export const siteContent = {
  // Bio & Social Profiles
  bio: {
    fullName: "DANJHAY",
    tagline: "Music Artist • Digital Marketer • Creative Strategist",
    slogan: "Soli Deo Gloria. Bringing people closer to God.",
    heroLabel: "SOLI DEO GLORIA",
    description: "Danjhay is a Nigerian music artist, digital marketer, and creative strategist passionate about creating meaningful music and helping brands grow. Through authentic storytelling, innovative marketing, and creative solutions, he connects people, builds communities, and delivers impact both on and off the stage.",
    aboutImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    phone: "+2349069510888",
    email: "ayomide@danjhay.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    whatsAppDirect: "https://wa.me/2349069510888", // pre-composed quick message will trigger
  },

  // Discography Playlist (Fast Loading Previews + Outlinks)
  tracks: [
    {
      id: 't1',
      title: 'Grace & Gold (Acoustic Sessions)',
      category: 'Soulful Acoustic / Devotional',
      artwork: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      streamingLinks: {
        spotify: 'https://spotify.com',
        appleMusic: 'https://music.apple.com',
        audiomack: 'https://audiomack.com',
        youtube: 'https://youtube.com'
      }
    },
    {
      id: 't2',
      title: 'Kingdom Gangsters (Official Anthem)',
      category: 'Christian Drill / High-Tempo',
      artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      streamingLinks: {
        spotify: 'https://spotify.com',
        appleMusic: 'https://music.apple.com',
        audiomack: 'https://audiomack.com',
        youtube: 'https://youtube.com'
      }
    },
    {
      id: 't3',
      title: 'Soli Deo Gloria (Worship Drill)',
      category: 'Atmospheric Kingdom Beats',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      streamingLinks: {
        spotify: 'https://spotify.com',
        appleMusic: 'https://music.apple.com',
        audiomack: 'https://audiomack.com',
        youtube: 'https://youtube.com'
      }
    }
  ] as Track[],

  // Professional Consulting Services (WhatsApp Inquiry Buttons)
  services: [
    {
      id: 's1',
      title: "Music Artistry & Performance",
      description: "Bringing high-energy spiritual authority to stages, recording studios, and special assemblies.",
      checklist: [
        "Live Music Stage Performances",
        "Songwriting & Lyric Composition",
        "Studio Session Vocal Recording",
        "Artist Feature Collaborations"
      ],
      whatsAppTemplate: "Hi Danjhay, I would like to inquire about booking you for a Music Performance/Session."
    },
    {
      id: 's2',
      title: "Digital Marketing & Funnels",
      description: "Designing high-conversion short-form content loops to capture attention and grow organic reach.",
      checklist: [
        "Short-Form Video Strategy (TikTok/Reels)",
        "Social Media Organic Growth Strategy",
        "Automated DM Hype Funnels",
        "Creative Campaign Direction"
      ],
      whatsAppTemplate: "Hi Danjhay, I would like to inquire about your Digital Marketing and Content Funnel services."
    },
    {
      id: 's3',
      title: "Content & Event Coverage",
      description: "Rapid delivery of high-profile event stories, red carpet interviews, and real-time social edits.",
      checklist: [
        "Red Carpet & Panel Interviews",
        "Real-Time Social Story Curations",
        "Rapid On-Site Video Kits",
        "Post-Event Aftermovie Cuts"
      ],
      whatsAppTemplate: "Hi Danjhay, I'm interested in booking your team for Content and Event Media Coverage."
    },
    {
      id: 's4',
      title: "Creative Branding & Identity",
      description: "Crafting structured, premium identity designs and press media kits for artists and visual brands.",
      checklist: [
        "Artist Visual Brand Architecture",
        "Album/EP Art Creative Direction",
        "Press Release Media Kits",
        "Identity Consultation Reviews"
      ],
      whatsAppTemplate: "Hi Danjhay, I want to discuss a Brand Identity & Design Consultation project with you."
    }
  ] as ServiceItem[],

  // Merch Drop Showcase (Inquire/Order via WhatsApp)
  merch: [
    {
      id: 'm1',
      name: '"God\'s Gangster" Luxury Hoodie',
      price: '₦28,500',
      badge: 'PRE-ORDER NOW',
      imageUrl: '/images/merch/luxury_hoodie.png',
      whatsAppTemplate: "Hi Danjhay, I would like to pre-order the 'God's Gangster' Luxury Hoodie!"
    },
    {
      id: 'm2',
      name: 'Kingdom Drill Premium Tee',
      price: '₦14,500',
      badge: 'LIMITED EDITION',
      imageUrl: '/images/merch/premium_tee.png',
      whatsAppTemplate: "Hi Danjhay, I want to order the 'Kingdom Drill' Premium Tee!"
    },
    {
      id: 'm3',
      name: 'Soli Deo Gloria Snapback Cap',
      price: '₦9,500',
      badge: 'POPULAR DROP',
      imageUrl: '/images/merch/snapback_cap.png',
      whatsAppTemplate: "Hi Danjhay, I'm interested in buying the 'Soli Deo Gloria' Snapback Cap!"
    },
    {
      id: 'm4',
      name: 'Acoustic Sessions Vinyl Disc',
      price: '₦18,000',
      badge: 'COLLECTORS PIECE',
      imageUrl: '/images/merch/vinyl_disc.png',
      whatsAppTemplate: "Hi Danjhay, I would love to order the 'Acoustic Sessions' Vinyl Disc!"
    }
  ] as MerchItem[],

  // Event Ticketing Calendar
  events: [
    {
      id: 'e1',
      title: 'Olojo Festival',
      date: 'September 2025',
      venue: 'Ooni’s palace',
      location: 'Ile-Ife, Osun state',
      ticketStatus: 'Past',
      ticketUrl: '#'
    },
    {
      id: 'e2',
      title: 'Family Fun Fiesta',
      date: 'December 26, 2025',
      venue: 'Darlington Hall',
      location: 'Ilupeju Lagos',
      ticketStatus: 'Past',
      ticketUrl: '#'
    },
    {
      id: 'e3',
      title: 'Wizkid goat experience',
      date: 'December 28, 2025',
      venue: 'Tafawa Balewa square TBS',
      location: 'LAGOS',
      ticketStatus: 'Past',
      ticketUrl: '#'
    }
  ] as EventItem[],

  // Visual Media Gallery Records
  media: [
    {
      id: 'g1',
      title: 'Recording Sessions',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      caption: 'Laying down background vocals for the upcoming acoustic devotional in the studio.',
      date: '2026-03'
    },
    {
      id: 'g2',
      title: 'Live Stage Performance',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      caption: 'Performing the Kingdom Gangster drill anthem live in Lagos before 5,000+ worshippers.',
      date: '2025-11'
    },
    {
      id: 'g3',
      title: 'Red Carpet Interviews',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      caption: 'Directing the media coverage and interviewing special guests during the Praise Fest.',
      date: '2025-11'
    },
    {
      id: 'g4',
      title: 'Brand Growth Advisory',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      caption: 'Consulting with clean beauty startup executives on short-form viral storytelling hooks.',
      date: '2026-01'
    }
  ] as MediaItem[]
};
