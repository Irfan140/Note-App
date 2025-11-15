import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";

export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: "http://192.168.1.69:5000",
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
