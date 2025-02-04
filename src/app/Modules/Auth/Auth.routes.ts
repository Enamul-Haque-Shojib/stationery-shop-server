import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authSchemaValidations } from './Auth.validations';
import { AuthControllers } from './Auth.controllers';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from './Auth.constant';



const router = express.Router();

router.post(
  '/create-auth',
  validateRequest(authSchemaValidations.createAuthSchemaValidation),
  AuthControllers.createAuth
);


router.post(
  '/login',
  validateRequest(authSchemaValidations.loginAuthSchemaValidation),
  AuthControllers.loginAuth,
);
router.get(
  '/',
  AuthControllers.getAllAuth,
);
router.get(
  '/profile/:email',
  auth(AUTH_ROLE.user, AUTH_ROLE.admin),
  AuthControllers.getSingleAuth,
);
router.patch(
  '/manage-auth/:email',
  auth(AUTH_ROLE.admin),
  AuthControllers.manageAuth,
);
router.post(
  '/refresh-token',
  validateRequest(authSchemaValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;
