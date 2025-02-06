/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { AUTH_ROLE } from './Auth.constant';

export type TLogin = {
  email: string;
  password: string;
};

export type TAuth = {
  name: string;
  imageUrl: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
};

export interface AuthStaticModel extends Model<TAuth> {

  isUserExistsByEmail(email: string): Promise<TAuth>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TAuthRole = keyof typeof AUTH_ROLE;
