import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categorySchemaValidations } from './Category.validations';
import { CategoryControllers } from './Category.controllers';




const router = express.Router();

router.post(
  '/create-category',
  
  validateRequest(categorySchemaValidations.createCategorySchemaValidation),
  CategoryControllers.createCategory
);



export const CategoryRoutes = router;
