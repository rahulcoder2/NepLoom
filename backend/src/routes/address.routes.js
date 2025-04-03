import { Router } from 'express';
import {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
} from '../controllers/address.controllers.js';
import { verifyjwt } from '../middleware/auth.middleware.js';

const router = Router();

router
    .route('/')
    .post(verifyjwt, createAddress) 
    .get(verifyjwt, getAllAddresses); 

router
    .route('/:addressId')
    .get(verifyjwt, getAddressById) 
    .put(verifyjwt, updateAddress) 
    .delete(verifyjwt, deleteAddress); 
export default router;
