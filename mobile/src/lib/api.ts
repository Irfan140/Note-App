import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
