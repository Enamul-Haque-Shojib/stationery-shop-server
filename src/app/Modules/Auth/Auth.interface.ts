/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { AUTH_ROLE } from "./Auth.constant";


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
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TAuth>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    
  }
  
  export type TAuthRole = keyof typeof AUTH_ROLE;