// app/_utils/api.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;