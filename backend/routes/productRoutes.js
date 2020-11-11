import express from "express";
import asyncHandler from "express-async-handler"
const router = express.Router();
import Product from "../models/productModel.js"


// @desc        Fetch all products
// @route       GET /api/products/
// @access      Public Route
router.get("/", asyncHandler(async (req, res) => {

    const products = await Product.find({})

    res.status(200).json(products)
}))

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      Public Route
router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) return res.status(200).json(product)
    else {
        res.status(404)
        throw new Error('Product not found')
    }

}))

export default router;