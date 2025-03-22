import { asyncHandle } from '../utils/asyncHandler.js';

const registerUser = asyncHandle(async (req, res) => {
    res.send("connect to registerUser")
});


export {registerUser}