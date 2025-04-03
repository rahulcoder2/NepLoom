import { Router } from 'express';
import {
    getUserCart,
    addItemOrUpdateItemQuantity,
    removeItemFromCart,
    clearCart,
} from '../controllers/cart.controller.js'; // Adjust the path if needed
import { verifyJWT } from '../middlewares/auth.middleware.js'; // Import your auth middleware

const router = Router();

router.use(verifyJWT); 

router.route('/').get(getUserCart).delete(clearCart);

router
    .route('/items/:productId')
    .post(addItemOrUpdateItemQuantity)
    .delete(removeItemFromCart);

export default router;
