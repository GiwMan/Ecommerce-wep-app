import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";

const productRoute = express.Router();

// get all products
productRoute.get("/", 
    asyncHandler( async(req,res) => {
        const products = await Product.find({});
        res.json(products);
    })
);
// get product by id
productRoute.get("/:id", 
    asyncHandler( async(req,res) => {
        const products = await Product.findById(req.params.id);
        if(products) {
            res.json(products);
        } else {
            res.status(404)
            throw new Error("Product not found")
        }  
    })
);

export default productRoute;