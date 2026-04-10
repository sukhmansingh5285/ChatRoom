import api from "./http";

// GET /api/message/history/:roomId
export const getHistory = async (roomId: number) => {
  const { data } = await api.get(`/message/history/${roomId}`);
  return data;
};
