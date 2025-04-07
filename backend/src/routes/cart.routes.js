import { Router } from 'express';
import {
    getUserCart,
    addItemOrUpdateItemQuantity,
    removeItemFromCart,
    clearCart,
} from '../controllers/cart.controllers.js';
import { verifyjwt } from '../middleware/auth.middleware.js'; 

const router = Router();

router.use(verifyjwt); 

router.route('/').get(getUserCart).delete(clearCart);

router
    .route('/items/:productId')
    .post(addItemOrUpdateItemQuantity)
    .delete(removeItemFromCart);

export default router;
