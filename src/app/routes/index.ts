import express from 'express';

import { ProductRoutes } from '../Modules/Products/Product.routes';
import { CategoryRoutes } from '../Modules/Category/Category.routes';
import { AuthRoutes } from '../Modules/Auth/Auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auths',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
