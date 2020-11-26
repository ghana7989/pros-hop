import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"


// @desc        Create new order
// @route       POST /api/order/
// @access      Private Route
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items found")
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = await order.save()

    res.status(201).json({
      order: createdOrder,
      status: "success"
    })
  }
})


// @desc        Get Order by ID
// @route       GET /api/order/:id
// @access      Private Route
export const getOrderById = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id).populate("user", "name email")

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }

})


// @desc        Update Order to Paid
// @route       GET /api/order/:id/pay
// @access      Private Route
export const updateOrderToPaid = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }

})



// @desc        Update Order to delivered
// @route       GET /api/orders/:id/deliver
// @access      Private Route/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }

})


// @desc        Get Logged In user orders
// @route       GET /api/order/myorders
// @access      Private Route
export const getMyOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find({ user: req.user._id })

  res.status(200).json(orders)

})

// @desc        Get All Orders
// @route       GET /api/order
// @access      Private Route/Admin
export const getAllOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find().populate('user','id name')

  res.status(200).json(orders)

})

