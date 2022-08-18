import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../Middleware/auth.js";

const userRoute = express.Router();

// login
userRoute.post("/login", 
    asyncHandler( async(req,res) => {
       const {email, password} = req.body;
       const user = await User.findOne({ email });
       const isMatch = await bcrypt.compare(password, user.password);

       if(user && isMatch ) {

        const payload = {
            user: {
                _id: user._id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"30d" }, 
            (err, tok) => {
                if(err) throw err;
                res.status(200)
                    .json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        role: user.role,
                        token: tok,
                        createdAt: user.createdAt
                    });
             }); 
       } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
       }
    })
);

userRoute.get("/profile",
    verifyToken,
    asyncHandler(async (req,res) => {
        console.log(req.user)
        const user = await User.findById(req.user._id);

       if(user) {
        res.status(200)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                role: user.role,
                createdAt: user.createdAt
            });
       } else {
        res.status(404);
        throw new Error("User not found");
       }
    })
);


export default userRoute;