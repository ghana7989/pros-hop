import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <main className="py-3" style={{ minHeight: "80vh" }}>
        <Container>
          <Switch>
            <Route path="/product/:id" exact component={ProductPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
