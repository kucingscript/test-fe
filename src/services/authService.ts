import apiClient from "@/lib/api";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>("/login", credentials);
  return res.data;
};
