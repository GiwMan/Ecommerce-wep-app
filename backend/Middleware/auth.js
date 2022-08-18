import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const verifyToken = asyncHandler (async (req, res, next) => {
    let token;
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET); 
            console.log(decoded.user._id);
            
            req.user = await User.findOne({_id: decoded.user._id}).select("-password")
            next();
        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authenticated");
        }
    } 

    if(!token) {
        res.status(401);
        throw new Error("Not authenticated");
    }
});  

export default verifyToken;