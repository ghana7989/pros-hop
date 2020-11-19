import { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from "../components/Message"


const OrderPage = ({ match }) => {

  const orderId = match.params.id


  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (order) {
    order.itemsPrice = addDecimals((order?.orderItems?.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)))

    function addDecimals(num) {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  if (error === "Request failed with status code 500") {
    window.location.reload(false)
  }

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name: </strong>{order.user.name}
              <br />
              <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address}{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode}{" "}
                {order?.shippingAddress?.country}
              </p>
              {
                order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> :
                  <Message variant="warning">Not Delivered</Message>
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {
                order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> :
                  <Message variant="warning">Not Paid</Message>
              }

            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message>Order Is Empty</Message> :
                <ListGroup variant="flush">
                  {
                    order.orderItems.map((item, index) => {

                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col >
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ₹{item.price} = ₹{(Number(item.qty) * Number(item.price)).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    })
                  }
                </ListGroup>
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage