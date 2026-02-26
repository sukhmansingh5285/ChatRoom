import axios from 'axios'

// Base axios instance — points to our Spring Boot backend
// withCredentials sends the JWT cookie automatically
export const http = axios.create({
  baseURL: 'http://localhost:8071',
  withCredentials: true,
})
