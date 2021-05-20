/** @format */

import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginPage = ({location, history}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const redirect = location.search ? location.search.split('=')[1] : '/'
	const handlePreFillClick = () => {
		setEmail('test@gmail.com')
		setPassword('test123')
	}

	const dispatch = useDispatch()
	const userLogin = useSelector(state => state.userLogin)
	const {loading, error, userInfo} = userLogin

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	function submitHandler(e) {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email address'
						value={email}
						onChange={({target: {value}}) => setEmail(value)}
					/>

					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={({target: {value}}) => setPassword(value)}
					/>
				</Form.Group>
				{email !== 'test@gmail.com' && password !== 'test123' && (
					<Button onClick={handlePreFillClick} variant='primary'>
						Click This To Autofill With Dummy Account
					</Button>
				)}
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					New Customer? <Link to={`/register?redirect=${redirect}`}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginPage
