import express from 'express';

import { MarqueeControllers } from './MarqueeImage.controllers';



const router = express.Router();

router.post(
  '/create-image',
  MarqueeControllers.createImage
);
router.get(
  '/',
  MarqueeControllers.getImage
);



export const MarqueeImagRoutes = router;
