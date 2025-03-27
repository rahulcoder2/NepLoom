import { AvailableUserRoles } from '../constants.js';
import { User } from '../models/user.models.js';
import { asyncHandle } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

export const verifyjwt = asyncHandle(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized request',
        });
    }

    try {
        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            '-password -refreshToken'
        );

        if (!user) {
            res.status(401).json({
                message: 'Invalid access token',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: error?.message || 'Invalid access token',
        });
    }
});

/**
 * @param {AvailableUserRoles} roles
 * @description
 * * This middleware is responsible for validating multiple user role permissions at a time.
 * * So, in future if we have a route which can be accessible by multiple roles, we can achieve that with this middleware
 */

export const verifyPermission = (roles = []) =>
    asyncHandle(async (req, res, next) => {
        if (!req.user?._id) {
            return res.status(401).json({
                message: 'Unauthorized ',
            });
        }
        if (roles.includes(req.user?.role)) {
            next();
        } else {
            return res.status(403).json({
                message: 'Your role is not allowed to perform this action.',
            });
        }
    });