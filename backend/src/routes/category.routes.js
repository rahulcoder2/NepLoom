import { Router } from 'express';
import {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from '../controllers/category.controllers.js';
import { verifyPermission } from '../middleware/auth.middleware.js';
import { UserRolesEnum } from '../constants.js';

const router = Router();

router
    .route('/')
    .post(verifyPermission([UserRolesEnum.ADMIN]), createCategory)  // Only Admin can create
    .get(getAllCategories);

router
    .route('/:categoryId')
    .get(getCategoryById)
    .put(verifyPermission([UserRolesEnum.ADMIN]), updateCategoryById)  // Only Admin can update
    .delete(verifyPermission([UserRolesEnum.ADMIN]), deleteCategoryById);  // Only Admin can delete


export default router;
