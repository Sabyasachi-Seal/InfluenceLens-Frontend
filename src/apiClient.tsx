// src/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8000",
});

export default apiClient;
