import { AvailableUserRoles } from '../constants.js';
import { User } from '../models/user.models.js';
import { asyncHandle } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

export const verifyjwt = asyncHandle(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized request' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            '-password -refreshToken '
        );
        if (!user) {
            // Client should make a request to /api/users/refresh-token if they have refreshToken present in their cookie
            // Then they will get a new access token which will allow them to refresh the access token without logging out the user
            return res.status(401).json({ error: 'Invalid access token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
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
