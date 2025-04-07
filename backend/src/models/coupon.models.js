import mongoose from 'mongoose';
import { AvailableCouponTypes, CouponTypeEnum } from '../constants.js';

const {Schema, model} = mongoose

const couponSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        couponCode: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            uppercase: true,
        },
        type: {
            type: String,
            enum: AvailableCouponTypes,
            default: CouponTypeEnum.FLAT,
        },
        discountValue: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        minimumCartValue: {
            type: Number,
            default: 0,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        expiryDate: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export const Coupon = model('Coupon', couponSchema);
