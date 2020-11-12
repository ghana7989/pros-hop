import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";


const ProductPage = ({ match, history }) => {

    const [quantity, setQuantity] = useState(0)

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id]);


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`);
    }
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {
                loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                    (

                        <Row>
                            <Col md={6}>
                                <Image fluid alt={product.name} src={product.image} />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {
                                            product.rating !== undefined &&
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ₹{product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price</Col>
                                                <Col><strong>₹{product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status</Col>
                                                <Col>
                                                    {
                                                        product.countInStock > 0 ? "In Stock" : "Out of Stock"
                                                    }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Quantity</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as="select"
                                                                style={{ padding: "10px 30px" }}
                                                                value={quantity}
                                                                onChange={({ target: { value } }) => setQuantity(value)}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }
                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block"
                                                type="button"
                                                disabled={product.countInStock === 0 || quantity === 0}
                                                onClick={addToCartHandler}
                                            >Add to cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }

        </>
    )
}

export default ProductPage
