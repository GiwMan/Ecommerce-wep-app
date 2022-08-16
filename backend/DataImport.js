import express from "express";
import products from "./data/Products.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import User from "./Models/UserModel.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router()

ImportData.post("/user", 
    asyncHandler(async (req,res)=> {
        await User.remove({})
        const importUser = await User.insertMany(users);
        res.send({importUser});
    })
);

ImportData.post("/products",  
    asyncHandler(async (req,res)=> {
        await User.remove({})
        const importUser = await User.insertMany(users);
        res.send({importUser});
    })
);

export default ImportData;