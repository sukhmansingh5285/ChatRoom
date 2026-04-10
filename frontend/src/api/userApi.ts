import api from "./http";

// POST /api/user/register
export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post("/user/register", { name, email, password });
  return data;
};

// POST /api/user/login
export const login = async (email: string, password: string) => {
  const { data } = await api.post("/user/login", { email, password });
  return data;
};

// GET /api/user/logout
export const logout = async () => {
  const { data } = await api.get("/user/logout");
  return data;
};

// GET /api/user/getuser — returns null if not logged in
export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/user/getuser");
    return data;
  } catch {
    return null;
  }
};
