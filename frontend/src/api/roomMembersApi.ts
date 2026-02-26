import { http } from './http'

// POST /api/room-members/join
export const joinRoom = async (userId: number, roomId: number) => {
  const res = await http.post('/api/room-members/join', {
    userId,
    roomId,
    role: 'MEMBER',
    status: 'APPROVED',
  })
  return res.data
}

// GET /api/room-members/room/:roomId
export const getRoomMembers = async (roomId: number) => {
  const res = await http.get(`/api/room-members/room/${roomId}`)
  return res.data
}
