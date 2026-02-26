import { http } from './http'

// POST /api/user/register
export const register = async (name: string, email: string, password: string) => {
  const res = await http.post('/api/user/register', { name, email, password })
  return res.data
}

// POST /api/user/login
export const login = async (email: string, password: string) => {
  const res = await http.post('/api/user/login', { email, password })
  return res.data
}

// GET /api/user/logout
export const logout = async () => {
  const res = await http.get('/api/user/logout')
  return res.data
}

// GET /api/user/getuser — returns null if not logged in
export const getCurrentUser = async () => {
  try {
    const res = await http.get('/api/user/getuser')
    return res.data
  } catch {
    return null
  }
}
