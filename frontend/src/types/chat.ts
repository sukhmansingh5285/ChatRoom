// Simple types that match exactly what the backend sends

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
}

export interface RoomMember {
  userId: number;
  roomId: number;
  role: string;
  status: string;
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  roomId: number;
  senderId: number;
  senderName: string;
}
