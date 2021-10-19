import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Search from './Search';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {

    const alert= useAlert();
    const dispatch= useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    return (
    <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img className="logo" src="/images/logo.png" alt="logo"/>
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Route render={({history}) => <Search history={history} />} />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link tp="/cart" style={{textDecoration : "none"}}>
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span>
                </Link>

                {user ? (
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" class="btn dropdown-toggle text-white" type="button" 
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <figure className="avatar avatar-nav">
                                <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {user && user.role !== "admin" ? (
                                <Link  to="/orders/me" className="dropdown-item">
                                    Orders
                                </Link>
                            ) : (
                                <Link  to="/dashboard" className="dropdown-item">
                                    Dashboard
                                </Link>
                            )}
                            <Link to="/me" className="dropdown-item">
                                Profile
                            </Link>
                            <Link to="/" className="dropdown-item text-danger">
                                Logout
                            </Link>
                        </div>
                    </div>
                ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                
            </div>
        </nav>
    </Fragment>
    )
}
