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

// @desc        Delete a Product
// @route       DELETE /api/products/:id
// @access      Public Route/Admin
export const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.sendStatus(204)
  }
  else {
    res.status(404)
    throw new Error('Product not found')
  }

})

// @desc        Create a Product
// @route       POST /api/products
// @access      Public Route/Admin
export const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc        Update a Product
// @route       PUT /api/products/:id
// @access      Public Route/Admin
export const updateProduct = asyncHandler(async (req, res) => {

  const { name, price, image, countInStock, description, brand, category } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.sendStatus(404)
    throw new Error("Product not found")
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
    name, price, image, countInStock, description, brand, category
  })
  res.status(201).json(updatedProduct)
})