import { asyncHandle } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';
import { UserLoginType, UserRolesEnum } from '../constants.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // find existed user in db
        const user = await User.findById(userId);

        // getGenerateAccessToken
        const accessToken = user.generateAccessToken();

        // getGenerateRefreshToken
        const refreshToken = user.generateRefreshToken();

        // set refreshToken in userModel
        user.refreshToken = refreshToken;

        // save data in userModel without using validation
        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(
            500,
            'Something went wrong while generating the access token'
        );
    }
};

const registerUser = asyncHandle(async (req, res) => {
    // get data from form
    const { email, password, phone, fullName } = req.body;

    // existedUser check
    const existedUser = await User.findOne({ email });

    if (existedUser) {
        return res
            .status(409)
            .json({ message: 'User with email  already exists' });
    }

    // create newUser account
    const newUser = User.create({
        fullName,
        email,
        phone,
        password,
        role: role || UserRolesEnum.USER,
        isVerified: true,
    });

    // keep out sensitive data or not to sent data to client
    const createdUser = await User.findById(newUser._id).select(
        '-password -refreshToken'
    );

    // check user is created or not
    if (!createdUser) {
        return res.status(500).json({
            message: 'Something went wrong while registering the user',
        });
    }

    return res.status(201).json({
        message: 'User registered Successfully',
        data: createdUser,
    });
});

const loginUser = asyncHandle(async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate if email is provided
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Find the user by email
    const existedUser = await User.findOne({ email });

    // Check if the user exists
    if (!existedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user's login type is email/password
    if (existedUser.loginType !== UserLoginType.EMAIL_PASSWORD) {
        return res.status(400).json({
            message: `You have previously registered using ${existedUser.loginType?.toLowerCase()}. Please use the ${existedUser.loginType?.toLowerCase()} login option to access your account.`,
        });
    }

    // Validate the password
    const isPasswordValid = await existedUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid user credentials' });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        existedUser._id
    );

    // Fetch the user data excluding the password and sensitive fields
    const loggedInUser = await User.findById(existedUser._id).select(
        '-password -refreshToken'
    );

    // Configure cookie options for security
    const options = {
        httpOnly: true, // Prevents client-side JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS in production
    };

    // Set access and refresh tokens as cookies
    res.cookie('accessToken', accessToken, options);
    res.cookie('refreshToken', refreshToken, options);

    return res.status(200).json({
        message: 'User logged in successfully',
        user: loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
});

const logoutUser = asyncHandle(async (req, res) => {
    // find loggedinUser to logout
    const loggedinUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            // update refreshtoken in db
            $set: {
                refreshToken: '',
            },
        },
        // update db with new data
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    };

    res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json({
            success: true,
            message: 'User logged out',
        });
});

export { registerUser, loginUser, logoutUser };
