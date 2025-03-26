import { Router } from 'express';
import { createProduct } from '../controllers/product.controllers.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router
    .route('/')
    .post(upload.fields([{ name: 'image', maxCount: 1 }]), createProduct);

export default router;
