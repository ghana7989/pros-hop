/** @format */

import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline)
	} catch (error) {
		console.log(`Error: ${error.message}`.red.bgCyan.underline)
		process.exit(1)
	}
}

export default connectDB
