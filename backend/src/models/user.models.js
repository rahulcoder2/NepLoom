import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
    AvailableSocialLogins,
    AvailableUserRoles,
    USER_TEMPORARY_TOKEN_EXPIRY,
    UserLoginType,
    UserRolesEnum,
} from '../constants.js';

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
        refreshToken: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateTemporaryForgetPasswordToken = function () {
    const unHashToken = crypto.randomBytes(64).toString('hex');

    const hashToken = crypto.createHash('sha256').update(unHashToken).digest('hex');

    const tokenExpiry =  date.now() + USER_TEMPORARY_TOKEN_EXPIRY
    return {unHashToken, hashToken, tokenExpiry}

}
export const User = model('User', userSchema);
