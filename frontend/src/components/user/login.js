import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../../redux/actions/userActions';
import Loader from '../layouts/Loader'

export default function Login({ history, location }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, isAuthenticated, error} = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(isAuthenticated){
            history.push(redirect)
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, isAuthenticated, history, redirect]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className="row wrapper"> 
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                               className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                
                            <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                               className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                
                            <Link to='/password/forgot'className="float-right mb-4">Forgot Password?</Link>
                
                            <button
                            id="login_button"
                            type="submit"
                           className="btn btn-block py-3"
                            >
                            LOGIN
                            </button>
                
                            <Link to='register'className="float-right mt-3">New User?</Link>
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
