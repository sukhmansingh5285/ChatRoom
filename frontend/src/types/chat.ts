// Simple types that match exactly what the backend sends

export type User = {
  id: number
  name: string
  email: string
}

export type Room = {
  id: number
  name: string
  description: string
}

export type RoomMember = {
  userId: number
  roomId: number
  role: string
  status: string
}

export type Message = {
  id: number
  content: string
  timestamp: string
  roomId: number
  senderId: number
  senderName: string
}
