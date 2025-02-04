import express from 'express';

import { ProductRoutes } from '../Modules/Products/Product.routes';
import { AuthRoutes } from '../Modules/Auth/Auth.routes';
import { MarqueeImagRoutes } from '../Modules/MarqueeImage/MarqueeImage.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auths',
    route: AuthRoutes,
  },
  
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/marquee',
    route: MarqueeImagRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
