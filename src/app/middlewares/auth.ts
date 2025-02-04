import { NextFunction, Request, Response } from 'express';

import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';


import catchAsync from '../utils/catchAsync';

import { TAuthRole } from '../Modules/Auth/Auth.interface';
import { verifyToken } from '../Modules/Auth/Auth.utils';
import { AuthModel } from '../Modules/Auth/Auth.model';

const auth = (...requiredRoles: TAuthRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

 
    const decoded = verifyToken(token, config.jwt_access_secret as string);
    

    const { role, email } = decoded;

    // checking if the user is exist
    const auth = await AuthModel.isUserExistsByEmail(email);

    if (!auth) {
      throw new AppError(404, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        401,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;


