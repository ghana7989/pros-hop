import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Row, Col, ListGroup, Image, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartPage = ({ match, location, history }) => {

  const productId = match.params.id;
  const quantity = location.search ? +location.search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
    history.push("/cart")
  }
  const checkOutHandler = () => {
    history.push("/login?redirect=shipping")
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, history, productId, quantity])
  useEffect(() => {
    if (location.pathname !== "/cart") {
      setTimeout(() => {
        history.push("/cart")
      }, 0);
    }
  }, [history, location])
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ?
            <Message>Your cart is empty <Link to="/">Go Home</Link></Message> :
            <ListGroup variant="flush">
              {
                cartItems.map(item => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>₹{item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          style={{ padding: "10px 30px" }}
                          value={item.qty}
                          onChange={({ target: { value } }) => dispatch(addToCart(item.product, Number(value)))}
                        >
                          {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button as="button"
                          onClick={() => removeFromCartHandler(item.product)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((total, item) => total + item.qty, 0)}) items</h2>
        ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage
