import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { siteContent, type Track, type EventItem, type MediaItem } from '../utils/siteContent';

export const useSiteData = () => {
  const [tracks, setTracks] = useState<Track[]>(siteContent.tracks);
  const [events, setEvents] = useState<EventItem[]>(siteContent.events);
  const [media, setMedia] = useState<MediaItem[]>(siteContent.media);
  const [bioImage, setBioImage] = useState<string>(siteContent.bio.aboutImage);

  const fetchTracks = async () => {
    const { data } = await supabase.from('tracks').select('*');
    if (data) {
      const normalizedTracks = data.map(t => ({
        ...t,
        audioUrl: t.audioUrl || t.audiourl || '',
        streamingLinks: t.streamingLinks || t.streaminglinks || {}
      }));
      setTracks(normalizedTracks.length > 0 ? (normalizedTracks as Track[]) : siteContent.tracks);
    }
  };

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*');
    if (data && data.length > 0) {
      setEvents([...(data as EventItem[]), ...siteContent.events]);
    } else {
      setEvents(siteContent.events);
    }
  };

  const fetchMedia = async () => {
    const { data } = await supabase.from('gallery').select('*');
    if (data) setMedia(data.length > 0 ? (data as MediaItem[]) : siteContent.media);
  };

  const [bookingEmail, setBookingEmail] = useState<string>(siteContent.bio.email);
  const [bookingPhone, setBookingPhone] = useState<string>(siteContent.bio.phone);
  const [bookingWhatsApp, setBookingWhatsApp] = useState<string>(siteContent.bio.whatsAppDirect);

  const [heroLabel, setHeroLabel] = useState<string>(siteContent.bio.heroLabel);
  const [fullName, setFullName] = useState<string>(siteContent.bio.fullName);
  const [tagline, setTagline] = useState<string>(siteContent.bio.tagline);
  const [description, setDescription] = useState<string>(siteContent.bio.description);

  const fetchProfile = async () => {
    const { data } = await supabase.from('settings').select('aboutImage, email, phone, whatsapp, heroLabel, fullName, tagline, description').eq('id', 'profile').maybeSingle();
    if (data) {
      if (data.aboutImage) setBioImage(data.aboutImage);
      if (data.email) setBookingEmail(data.email);
      if (data.phone) setBookingPhone(data.phone);
      if (data.whatsapp) setBookingWhatsApp(data.whatsapp);
      if (data.heroLabel) setHeroLabel(data.heroLabel);
      if (data.fullName) setFullName(data.fullName);
      if (data.tagline) setTagline(data.tagline);
      if (data.description) setDescription(data.description);
    }
  };

  useEffect(() => {
    fetchTracks();
    fetchEvents();
    fetchMedia();
    fetchProfile();

    const channelName = `schema-db-changes-${Math.random()}`;
    const channel = supabase.channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tracks' }, () => fetchTracks())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => fetchEvents())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => fetchMedia())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => fetchProfile())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { tracks, events, media, bioImage, bookingEmail, bookingPhone, bookingWhatsApp, heroLabel, fullName, tagline, description };
};
