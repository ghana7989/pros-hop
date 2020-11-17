import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from '../utils/generateToken.js'


// @desc        Auth the user and get a token
// @route       GET /api/users/login
// @access      Public Route
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id)
    })
  } else {
    res.status(401)
    throw new Error("Invalid Email or Password")
  }

})

// @desc        Register a new user
// @route       POST /api/users
// @access      Public Route
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400)
    throw new Error("User with this email already exists")
  }
  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    const { _id, name, email, isAdmin } = user
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }

})


// @desc        GET user profile
// @route       GET /api/users/profile
// @access      Private Route

export const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {
    const { _id, name, email, isAdmin } = user
    res.json({
      _id,
      name,
      email,
      isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})


// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private Route

export const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) user.password = req.body.password

    const updatedUser = await user.save()

    const { _id, name, email, isAdmin } = updatedUser

    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id)
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
