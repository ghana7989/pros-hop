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

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <main className="py-3" style={{ minHeight: "80vh" }}>
        <Container>
          <Switch>
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route exact path="/cart/:id?" component={CartPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
