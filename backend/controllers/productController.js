import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"



// @desc        Fetch all products
// @route       GET /api/products/
// @access      Public Route
export const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({})

  res.status(200).json(products)
})

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      Public Route
export const getProductById = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (product) return res.status(200).json(product)
  else {
    res.status(404)
    throw new Error('Product not found')
  }

})