// API endpoints and helper functions
import api from "./api";
import type {
  User,
} from "@/types";


export const authAPI = {

  getProfile: async () => {
    const response = await api.get<User>("/user/profile");
    return response.data;
  },
};


export default {
  auth: authAPI,
};
