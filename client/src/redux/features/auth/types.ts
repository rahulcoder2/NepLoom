import { LOGIN_TYPES, USER_ROLES } from "@/types/auth-types";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: USER_ROLES;
  loginType: LOGIN_TYPES;
}

export interface LoginResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  refreshToken: string;
  accessToken: string;
}

