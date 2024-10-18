import jwt from 'jsonwebtoken'
const User = require("../models/user.model");

export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error: "Unauthorized - Token not found",
                status: 'failure'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                error: "Unauthorized - Invalid token",
                status: 'failure'
            })
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({
                error: "Unauthorized - User not found",
                status: 'failure'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
        message: `Server Error: ${error.message}`       
    })
    }
}