import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productSchemaValidations } from './Product.validations';
import { ProductControllers } from './Product.controllers';


const router = express.Router();

router.post(
  '/create-product',
  validateRequest(productSchemaValidations.createProductSchemaValidation),
  ProductControllers.createProduct
);
router.patch(
  '/update-product/:id',
  validateRequest(productSchemaValidations.updateProductSchemaValidation),
  ProductControllers.updateProduct
);
router.get(
  '/',
  ProductControllers.getAllProducts
);
router.get('/single-product/:id', ProductControllers.getSingleProduct);

router.delete('/delete-product/:id', ProductControllers.deleteSingleProduct);

router.post('/create-order', ProductControllers.createOrderProduct);

router.get('/order', ProductControllers.OrderProductList);
router.patch('/order-status/:id', ProductControllers.orderStatusChange);

export const ProductRoutes = router;
