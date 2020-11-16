import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions"

const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>prosHOP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart" /> Cart</Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id="userName"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                ) :
                  (<LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user" /> Sign In</Nav.Link>
                  </LinkContainer>
                  )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )

}

export default Header
