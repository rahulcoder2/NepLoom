import { Router } from 'express';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
} from '../controllers/product.controllers.js';
import { upload } from '../middleware/multer.middleware.js';
import { verifyjwt, verifyPermission } from '../middleware/auth.middleware.js';
import { UserRolesEnum } from '../constants.js';

const router = Router();

router
    .route('/')
    .post(
        verifyjwt,
        verifyPermission([UserRolesEnum.ADMIN]),
        upload.fields([{ name: 'image', maxCount: 1 }]),
        createProduct
    )
    .get(getAllProducts); // Get all products with pagination

router
    .route('/:productId')
    .get(getProductById) // Get product by ID
    .put(
        verifyjwt,
        verifyPermission([UserRolesEnum.ADMIN]),
        upload.fields([{ name: 'image', maxCount: 1 }]),
        updateProduct
    ) // Update product
    .delete(verifyjwt, verifyPermission([UserRolesEnum.ADMIN]), deleteProduct); // Delete product

// Get products by category
router.route('/category/:categoryId').get(getProductsByCategory);

export default router;
