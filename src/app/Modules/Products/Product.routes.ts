import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productSchemaValidations } from './Product.validations';
import { ProductControllers } from './Product.controllers';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from '../Auth/Auth.constant';

const router = express.Router();

router.post(
  '/create-product',
  auth(AUTH_ROLE.admin),
  validateRequest(productSchemaValidations.createProductSchemaValidation),
  ProductControllers.createProduct,
);
router.patch(
  '/update-product/:id',
  auth(AUTH_ROLE.admin),
  validateRequest(productSchemaValidations.updateProductSchemaValidation),
  ProductControllers.updateProduct,
);
router.get('/', ProductControllers.getAllProducts);
router.get('/single-product/:id', ProductControllers.getSingleProduct);

router.delete(
  '/delete-product/:id',
  auth(AUTH_ROLE.admin),
  ProductControllers.deleteSingleProduct,
);

router.post(
  '/create-order',
  auth(AUTH_ROLE.user),
  ProductControllers.createOrderProduct,
);

router.get(
  '/order',
  auth(AUTH_ROLE.user, AUTH_ROLE.admin),
  ProductControllers.OrderProductList,
);
router.patch('/order-status/:id', ProductControllers.orderStatusChange);

export const ProductRoutes = router;
