import api from "./http";

// POST /api/room/create
export const createRoom = async (name: string, description: string) => {
  const { data } = await api.post("/room/create", { name, description });
  return data;
};

// GET /api/room/getall
export const getAllRooms = async () => {
  const { data } = await api.get("/room/getall");
  return data;
};

// GET /api/room/:id
export const getRoomById = async (id: number) => {
  const { data } = await api.get(`/room/${id}`);
  return data;
};
