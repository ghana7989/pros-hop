import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import Rating from './Rating';


const Product = ({ product }) => {
    const { name, _id, image, price, rating, numReviews } = product
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
        >
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${_id}`}>
                    <Card.Img src={image} variant="top" />
                </Link>
                <Card.Body>
                    <Link to={`/product/${_id}`}>
                        <motion.div
                            whileHover={{ x: 10 }}
                        >
                            <Card.Title as="div"><strong>{name}</strong></Card.Title>
                        </motion.div>
                    </Link>
                    <Card.Text as="div">
                        <Rating value={rating} text={`${numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as="h3">₹{price}</Card.Text>
                </Card.Body>
            </Card>
        </motion.div>
    )
}

export default Product
