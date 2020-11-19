import express from 'express';
import { config } from 'dotenv';
import connectDB from "./config/db.js";
import colors from "colors"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"


import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

config();

connectDB()

const app = express();

app.use(express.json())
app.get("/", (req, res) => {
  res.send("API is working")
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound)

app.use(errorHandler)


const port = process.env.PORT || 5000;

app.listen(port, console.log(`
Server Running in ${process.env.NODE_ENV} mode on Port ${port}`.yellow.bgBlack.bold))