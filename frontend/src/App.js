import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import ProductDetails from './components/ProductDetails';
import login from './components/user/login';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="login" component={login} />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
