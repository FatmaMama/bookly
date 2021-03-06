import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Search from './Search';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

export default function Header() {

    const alert= useAlert();
    const dispatch= useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);

    const logoutHandler = () =>{
        dispatch(logout())
        alert.success("Logged out successfully")
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => item.quantity + qty, 0)
    }

    return (
    <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/' className="bookly ml-5">
                    <i className="fa fa-book"></i>
                    Bookly
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Route render={({history}) => <Search history={history} />} />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 d-flex align-items-center justify-content-center">
                <Link to="/home" className="mr-4 shop menu">
                    Shop
                </Link>
                <Link to="/cart" style={{textDecoration : "none"}} id="cart" className="d-flex align-items-center">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="ml-1" id="cart_count">{getCartCount()}</span>
                </Link>

                {user ? (
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle mr-4" type="button" 
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <figure className="avatar avatar-nav">
                                <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {user && user.role === "admin" && (
                               <Link  to="/dashboard" className="dropdown-item">
                                    Dashboard
                                </Link>
                            )} 
                             <Link  to="/orders/me" className="dropdown-item">
                                    Orders
                                </Link>
                            <Link to="/me" className="dropdown-item">
                                Profile
                            </Link>
                            <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>
                                Logout
                            </Link>
                        </div>
                    </div>
                ) : !loading && <Link to="/login" className="btn ml-4 menu" id="login_btn">Login</Link>}
                
            </div>
        </nav>
    </Fragment>
    )
}
