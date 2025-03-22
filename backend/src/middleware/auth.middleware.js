import { User } from '../models/user.models';
import { asyncHandle } from '../utils/asyncHandler';
import jwt from 'jsonwebtoken';

const verifyjwt = asyncHandle((req, res, next) => {
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

        const user = User.findById(decodedToken?._id).select(
            '-password -refreshToken'
        );

        if (!user) {
            res.status(401).json({
                message: 'Invalid acess token',
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
