export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  sessions: Session[];
}

export interface Room {
  id: string;
  name: string;
}

export interface Speaker {
  id: string;
  fullName: string;
  profilePicture?: string;
  bio: string;
  externalLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessionIds: string[];
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  room: Room;
  capacity?: number;
  speakers: Speaker[];
  isLive: boolean;
}

export interface Question {
  id: string;
  sessionId: string;
  content: string;
  authorName?: string;
  upvotes: number;
  createdAt: string;
}
