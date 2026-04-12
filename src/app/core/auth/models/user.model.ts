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
