import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";


const ProductPage = ({ match }) => {

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id]);



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
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
                                                <Col><strong>{product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status</Col>
                                                <Col>{
                                                    product.countInStock > 0 ? "In Stock" : "Out of Stock"
                                                }</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block"
                                                type="button"
                                                disabled={product.countInStock === 0}
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
