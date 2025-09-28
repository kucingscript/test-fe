export interface JwtPayload {
  exp: number;
}

export interface PageInfo {
  page: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  code: number;
  request_id: string;
  message: string;
  data: T;
  pageInfo?: PageInfo;
}

export interface CorporateType {
  name: string;
}

export interface Corporate {
  corporate_id: string;
  name: string;
  code: string;
  timezone: string;
  corporate_type_id: string;
  corporate_types: CorporateType;
}
