import { Router } from 'express';
import {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from '../controllers/category.controllers.js';
import { verfiyPermission } from '../middleware/auth.middleware.js';
import { UserRolesEnum } from '../constants.js';

const router = Router();

router
    .route('/')
    .post(verfiyPermission(UserRolesEnum.ADMIN), createCategory)
    .get(getAllCategories);

router
    .route('/:categoryId')
    .get(getCategoryById)
    .put(verfiyPermission(UserRolesEnum.ADMIN), updateCategoryById)
    .delete(verfiyPermission(UserRolesEnum.ADMIN),deleteCategoryById);

export default router;
