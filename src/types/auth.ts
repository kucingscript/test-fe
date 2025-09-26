import type { BaseUser } from "./types";

export interface UserCredentials extends BaseUser {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  request_id: string;
  data: UserCredentials;
}
