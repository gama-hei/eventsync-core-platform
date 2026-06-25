// src/types/index.ts

export interface Speaker {
  id: string;
  fullName: string;
  profilePicture?: string;
  bio: string;
  externalLinks?: string[] | {
    twitter?: string;
    linkedin?: string;
    website?: string;
    github?: string;
  };
  sessions?: Session[];
}

// Helper pour accéder aux liens
export function getSpeakerLinks(speaker: Speaker): string[] {
  if (!speaker.externalLinks) return [];
  if (Array.isArray(speaker.externalLinks)) return speaker.externalLinks;
  return Object.values(speaker.externalLinks).filter(Boolean) as string[];
}

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  roomName: string;
  roomId: string;
  capacity: number;
  eventId: string;
  eventTitle: string;
  speakers?: Speaker[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  sessions?: Session[];
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
}

export interface Question {
  id: string;
  content: string;
  authorName: string;
  upvotes: number;
  createdAt: string;
  sessionId: string;
}
