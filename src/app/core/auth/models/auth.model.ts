import { User } from './user.model';

export interface AuthUser {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<User, 'id'> {
  password: string;
}
