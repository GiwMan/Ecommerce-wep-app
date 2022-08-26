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
                if(err) throw new Error("Error with token login");
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

// sign-up
userRoute.post("/register", 
    asyncHandler( async(req,res) => {
       const {name,email,password,afm,phone,address} = req.body;
       // check the emails
       const emailExists = await User.findOne({ email });
       if(emailExists) {
        res.status(400);
        throw new Error("Email already exists");
       } 
       // check afm
       const afmExists = await User.findOne({ afm });
       if(afmExists) {
        res.status(400);
        throw new Error("Afm already exists");
       } 
       // check phone 
       const phoneExists = await User.findOne({ phone });
       if(phoneExists) {
        res.status(400);
        throw new Error("Phone number already exists");
       } 
       
       // hash password
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if(err) {
            res.status(400);
            throw new Error("Invalid password");
        } else {
            const user = await User.create({
                name, 
                email, 
                hashedPassword, 
                phone, 
                afm, 
                address : 'mikonoy',
                isAdmin:false
               });
            console.log(user);
            if(user) {
                const payload = {
                    user: {
                        _id: user._id
                    }
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn:"30d" }, 
                    (err, tok) => {
                        if(err) throw new Error("Error with token signup");
                        res.status(201)
                            .json({
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                                phone: user.phone,
                                afm: user.afm,
                                isAdmin: user.isAdmin,
                                token: tok,
                                createdAt: user.createdAt
                            });
                     }); 
            } else {
                res.status(400);
                throw new Error("Cannot create new User")
            }
        }
       })       
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