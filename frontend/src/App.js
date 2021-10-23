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
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';

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

          <Route path="/cart" component={Cart} exact/>
          <ProtectedRoute path="/shipping" component={Shipping} exact/>
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          {/* <ProtectedRoute path="/order/new" component={ConfirmOrder} /> */}
          <ProtectedRoute path="/success" component={OrderSuccess} exact/>

          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" exact component={Profile} />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/me/order/:id" component={OrderDetails} exact />
          
        </div>
          <ProtectedRoute path="/dashboard" component={Dashboard} exact />
          <ProtectedRoute path="/admin/products" component={ProductsList} exact />
          <ProtectedRoute path="/admin/product" component={NewProduct} exact />
          <ProtectedRoute path="/admin/product/:id" component={UpdateProduct} exact />
          <ProtectedRoute path="/admin/orders" component={OrdersList} exact />
          <ProtectedRoute path="/admin/order/:id" component={ProcessOrder} exact />

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
