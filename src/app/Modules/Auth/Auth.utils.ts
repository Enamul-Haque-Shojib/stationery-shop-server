import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    throw new AppError(401, 'Unauthorized!');
  }
};
