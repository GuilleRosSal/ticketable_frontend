export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  password?: string;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export interface EmailsResponse {
  emails: string[];
}

export interface ProfileData extends Omit<User, 'id' | 'role' | 'password'> {}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordResponse {
  msg: string;
}
