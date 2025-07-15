const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/AsyncHandler");

//Auth middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token is in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //attach user to request (without password  and other sensitive data)
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
            
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
}
});
module.exports = protect;