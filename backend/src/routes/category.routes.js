import { Router } from 'express';
import {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from '../controllers/category.controllers.js';
import { verifyjwt, verifyPermission } from '../middleware/auth.middleware.js';
import { UserRolesEnum } from '../constants.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router
    .route('/')
    .post(
        verifyjwt,
        verifyPermission([UserRolesEnum.ADMIN]),
        upload.fields([{ name: 'image', maxCount: 1 }]),
        createCategory
    ) // Only Admin can create
    .get(getAllCategories);

router
    .route('/:categoryId')
    .get(getCategoryById)
    .put(
        verifyjwt,
        verifyPermission([UserRolesEnum.ADMIN]),
        upload.fields([{ name: 'image', maxCount: 1 }]),
        updateCategoryById
    ) // Only Admin can update
    .delete(
        verifyjwt,
        verifyPermission([UserRolesEnum.ADMIN]),
        deleteCategoryById
    ); // Only Admin can delete

export default router;
