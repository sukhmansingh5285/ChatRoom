import axios from "axios";

// Base axios instance — points to our Spring Boot backend
// withCredentials sends the JWT cookie automatically
const api = axios.create({
  baseURL: "http://localhost:8071/api",
  withCredentials: true,
});

export default api;
