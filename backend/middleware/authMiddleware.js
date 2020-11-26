import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {

  let token = req.headers.authorization && req.headers.authorization.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : undefined

  if (!token) return next(new Error("Not Authorized"))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, iat, exp } = decoded
    req.user = await User.findById(id).select("-password")

    next()
  } catch (error) {
    console.log(error);
    res.status(401)
    next(new Error("Not an Authorized Token"))
  }

})

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not Authorized as an Admin")
  }
}