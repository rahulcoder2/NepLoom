import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    AvailableSocialLogins,
    AvailableUserRoles,
    UserLoginType,
    UserRolesEnum,
} from '../constants';

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
        isAdmin: {
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
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password, 10);
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
export const User = model('User', userSchema);
