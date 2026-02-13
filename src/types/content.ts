// Type definitions for all content across the site

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  city: string;
  theme: 'Memory' | 'Identity' | 'Place' | 'Space' | 'Labor';
  image: string;
  description: string;
  process: string;
}

export interface Film {
  id: number;
  title: string;
  description: string;
  image: string;
  videoUrl?: string;
  duration: string;
  year: string;
  director?: string;
  synopsis?: string;
  credits?: {
    role: string;
    name: string;
  }[];
  subtitle?: string;
  poster?: string;
  stills?: string[];
  screenings?: {
    venue: string;
    city: string;
    date: string;
  }[];
  themes?: string[];
  languages?: string[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
  category: string;
  details?: string;
  dimensions?: string;
  materials?: string;
}

export interface Person {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  location?: string;
  contribution?: string;
}

export interface Location {
  id: number;
  city: string;
  country: string;
  chapter: string;
  status: 'Completed' | 'Current' | 'Upcoming';
  date: string;
  description: string;
  venues: string[];
  artworks: number | string;
  images?: string[];
}

export interface AboutSection {
  id: number;
  title: string;
  content: string[];
  image?: string;
  order: number;
}

export interface ProcessStep {
  id: number;
  icon: string; // Icon name from lucide-react
  title: string;
  description: string;
  image: string;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  type: 'Exhibition' | 'Talk' | 'Screening' | 'Workshop' | 'Opening';
}