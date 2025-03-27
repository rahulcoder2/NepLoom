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

const router = Router();

router
    .route('/')
    .post(verifyjwt, verifyPermission([UserRolesEnum.ADMIN]), createCategory) // Only Admin can create
    .get(getAllCategories);

router
    .route('/:categoryId')
    .get(getCategoryById)
    .put(verifyjwt, verifyPermission([UserRolesEnum.ADMIN]), updateCategoryById) // Only Admin can update
    .delete(
        verifyjwt,
        verifyPermission([UserRolesEnum.ADMIN]),
        deleteCategoryById
    ); // Only Admin can delete

export default router;
