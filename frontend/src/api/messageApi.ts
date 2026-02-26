import { http } from './http'

// GET /api/message/history/:roomId
export const getHistory = async (roomId: number) => {
  const res = await http.get(`/api/message/history/${roomId}`)
  return res.data
}
