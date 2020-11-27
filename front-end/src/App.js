import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import GlobalStyles from "./GlobalStyles";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import ShippingPage from "./Pages/ShippingPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import PaymentPage from "./Pages/PaymentMethodPage";
import OrderPage from "./Pages/OrderPage";
import UserListPage from "./Pages/UserListPage";
import UserEditPage from "./Pages/UserEditPage";
import ProductListPage from './Pages/ProductListPage';
import ProductEditPage from './Pages/ProductEditPage';
import OrderListPage from './Pages/OrderListPage';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <main className="py-3" style={{ minHeight: "80vh" }}>
        <Container>
          <Switch>
            <Route path="/admin/productlist" exact component={ProductListPage} />
            <Route path="/admin/productlist/:pageNumber" exact component={ProductListPage} />
            <Route path="/admin/user/:id/edit" exact component={UserEditPage} />
            <Route path="/admin/userlist" exact component={UserListPage} />
            <Route path="/admin/product/:id/edit" exact component={ProductEditPage} />
            <Route path="/admin/orderlist" exact component={OrderListPage} />

            <Route path="/order/:id" exact component={OrderPage} />
            <Route path="/placeorder" exact component={PlaceOrderPage} />
            <Route path="/payment" exact component={PaymentPage} />
            <Route path="/shipping" exact component={ShippingPage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route exact path="/cart/:id?" component={CartPage} />
            <Route exact path="/search/:keyword" component={HomePage} />
            <Route exact path="/page/:pageNumber" component={HomePage} />
            <Route exact path="/search/:keyword/page/:pageNumber" component={HomePage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
