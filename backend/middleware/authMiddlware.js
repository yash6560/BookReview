const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        const decode = await jwt.sign(token, process.env.JWT_SECRET);
        if(!decoded || !decoded.userID){
            return res.status(401).json({message: "Unauthorized access, invalid token"});
        }

        const user = await userModel.findById(decoded.userID).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error in middleware.")
      return res.status(401).json({ message: 'Invalid token' });  
    }
}

module.exports = { authMiddleware };