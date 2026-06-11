export interface Speaker {
  id: string;
  fullName: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  roomName: string;
  roomId:string;
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
  roomId: string;
  roomName: string;
  capacity: number;
  location : string;
}

