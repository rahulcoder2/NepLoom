import mongoose, { model } from 'mongoose';
import { AvailableSocialLogins, AvailableUserRoles, UserLoginType, UserRolesEnum } from '../constants';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            require: [true, 'fullName is required'],
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            require: [true, 'phone number is required'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: AvailableUserRoles,
            default: UserRolesEnum.USER,
        },
        loginType: {
            type: String,
            enum: AvailableSocialLogins,
            default: UserLoginType.EMAIL_PASSWORD,
        },
        isVerify: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        }
    },
    { timestamps: true }
);




export const User = model('User', userSchema);
