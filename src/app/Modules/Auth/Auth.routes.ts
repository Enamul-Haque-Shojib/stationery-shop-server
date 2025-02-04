import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authSchemaValidations } from './Auth.validations';
import { AuthControllers } from './Auth.controllers';



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
  AuthControllers.getSingleAuth,
);
router.patch(
  '/manage-auth/:email',
  AuthControllers.manageAuth,
);


export const AuthRoutes = router;
