import api from "./http";

// POST /api/room-members/join
export const joinRoom = async (userId: number, roomId: number) => {
  const { data } = await api.post("/room-members/join", {
    userId,
    roomId,
    role: "MEMBER",
    status: "APPROVED",
  });
  return data;
};

// GET /api/room-members/room/:roomId
export const getRoomMembers = async (roomId: number) => {
  const { data } = await api.get(`/room-members/room/${roomId}`);
  return data;
};
