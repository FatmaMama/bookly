import React, {Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateUser, getUserDetails } from '../../redux/actions/userActions';
import { UPDATE_USER_RESET } from '../../redux/constants/userConstants';
import Loader from '../layouts/Loader';
import SideBar from './SideBar';


export default function UpdateUser({match, history}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    

    const alert = useAlert();
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.userDetails);
    const { loading, isUpdated, error} = useSelector(state => state.user);

    useEffect(() => {
        if(user && user._id !== match.params.id){
            dispatch(getUserDetails(match.params.id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if(isUpdated){
            alert.success("User updated successfully");
            history.push('/admin/users');
            dispatch({ type : UPDATE_USER_RESET})
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isUpdated, error, history, user, match.params.id]);

    const updateHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        dispatch(updateUser(user._id, formData))
    };


    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2" >
                    <SideBar />
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={updateHandler}>
                                    <h1 className="mt-2 mb-5">Update User</h1>
            
                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input 
                                            type="name" 
                                            id="name_field" 
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
            
                                    <div className="form-group">
                                                <label htmlFor="role_field">Role</label>
            
                                                <select
                                                    id="role_field"
                                                    className="form-control"
                                                    name='role'
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option value="user">user</option>
                                                    <option value="admin">admin</option>
                                                </select>
                                            </div>
            
                                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                                </form>
                            </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
