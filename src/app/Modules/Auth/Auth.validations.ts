import { z } from 'zod';

const createAuthSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    imageUrl: z.string({ message: 'Image is required' }),
    email: z.string().email({ message: 'Email is required' }),
    password: z.string({ message: 'Password is required' }),
  }),
});

const loginAuthSchemaValidation = z.object({
  body: z.object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string({ message: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const authSchemaValidations = {
  createAuthSchemaValidation,
  loginAuthSchemaValidation,
  refreshTokenValidationSchema,
};
