
export type UUID = string;
export type ISODataString = string;

export interface Room {
  id: UUID;
  name: string;
}

export interface Speaker {
  id: UUID;
  fullName: string;
  profilePicture?: string;
  bio: string;
  externalLinks?: string[];
  sessions?: Session[];
}

export interface Question {
  id: UUID;
  content: string;
  authorName: string | null;
  upvotes: number;
  sessionId: UUID;
  createdAt: ISODataString;
}

export interface Session {
  id: UUID;
  title: string;
  description: string;
  startTime: ISODataString;
  endTime: ISODataString;
  roomId: UUID;
  capacity?: number;
  eventId: UUID;
  speakers: Speaker[];
  questions?: Question[];
}

export interface Event {
  id: UUID;
  title: string;
  description: string;
  startDate: ISODataString;
  endDate: ISODataString;
  location: string;
  sessions?: Session[];
}

export interface LiveSession {
  id: UUID;
  title: string;
  startTime: ISODataString;
  endTime: ISODataString;
  room: Room;
  speakers: Pick<Speaker, 'id' | 'fullName'>[];
}
