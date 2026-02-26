import { http } from './http'

// POST /api/room/create
export const createRoom = async (name: string, description: string) => {
  const res = await http.post('/api/room/create', { name, description })
  return res.data
}

// GET /api/room/getall
export const getAllRooms = async () => {
  const res = await http.get('/api/room/getall')
  return res.data
}
