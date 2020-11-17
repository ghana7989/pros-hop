import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfilePage = ({ location, history }) => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")


  const redirect = location.search ? location.search.split("=")[1] : "/"
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails)
  let { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  let { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
    if (!user?.name) {
      dispatch(getUserDetails())
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [history, userInfo, dispatch, user.name, user.email, redirect])

  function submitHandler(e) {
    e.preventDefault()
    if (!password || !confirmPassword || !email || !name) return setMessage("All Fields are required")
    if (password !== confirmPassword) return setMessage("Passwords Don't match")

    dispatch(updateUserProfile({ id: user._id, name, email, password }))
    setPassword("")
    setConfirmPassword("")
  }


  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
        </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfilePage
