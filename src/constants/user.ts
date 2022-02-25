export enum UserRole {
  SuperAdmin = 2,
  Admin = 1,
  User = 0,
}

export interface IUserInfo {
  access_token: string;
  refresh_token: string;
  id: number;
  email: string;
  company: string;
  fullname: string;
  phone: string;
  role: number;
  created_at: Date;
  last_login: Date;
  IP: string;
}
