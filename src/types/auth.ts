import type { ApiResponse, Corporate } from "./types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginData {
  user_id: string;
  nickname: string;
  fullname: string;
  email: string;
  user_type: "CLIENT" | "PLATFORM";
  token: string;
  corporates: Corporate[];
}

export type LoginResponse = ApiResponse<LoginData>;

export interface RegisterCredentials {
  email: string;
  password: string;
  nickname: string;
  fullname: string;
  corporate_name: string;
  corporate_code: string;
  corporate_address: string;
  corporate_type_id: string;
}

interface RegisterCorporate {
  corporate_id: string;
  name: string;
  code: string;
}

interface UserGroup {
  name: string;
  corporates: RegisterCorporate[];
}

export interface RegisterData {
  user_id: string;
  email: string;
  nickname: string;
  fullname: string;
  type: "CLIENT" | "PLATFORM";
  status: "ACTIVE" | "INACTIVE";
  role: string;
  created_at: string;
  created_by: string | null;
  user_group_id: string;
  user_groups: UserGroup;
}

export type RegisterResponse = ApiResponse<RegisterData>;
