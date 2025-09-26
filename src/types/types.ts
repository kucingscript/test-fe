export interface JwtPayload {
  exp: number;
}

export interface BaseUser {
  user_id: string;
  email: string;
  nickname: string;
  fullname: string;
  user_type: "CLIENT" | "PLATFORM";
}

export interface Corporate {
  corporate_id: string;
  code: string;
  name: string;
  address: string;
}

export interface ApiResponse<T> {
  code: number;
  request_id: string;
  message: string;
  data: T[];
}
