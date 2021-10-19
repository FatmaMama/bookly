import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import ProductDetails from './components/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import store from './redux/store'
import { useEffect } from 'react';
import { loadUser } from './redux/actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" exact component={Profile} />
          <ProtectedRoute path="/me/update" component={UpdateProfile} />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
