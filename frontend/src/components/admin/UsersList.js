import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import SideBar from './SideBar';
import { getAllUsers, clearErrors, deleteUser } from '../../redux/actions/userActions';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

export default function UsersList({history}) {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, users} = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
        
        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }

       if(isDeleted){
            alert.success('User deleted successfully');
            history.push('/admin/users')
            dispatch({ type : DELETE_USER_RESET})
        }

    }, [dispatch, alert, error, isDeleted, history]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        users.forEach(user => {
            data.rows.push({
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                actions : 
                <Fragment>
                    <Link to={`/admin/user/${user._id}`} id="blue" className="btn">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <button id="red" className="btn py-1 px-2 ml-2" onClick={()=>{deleteUserHandler(user._id)}} >
                    <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        });
        return data
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2" >
                    <SideBar/>
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                        <h1 className="my-5" >All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable 
                            data={setUsers()}
                            className="mx-3"
                            bordered
                            hover
                            striped
                        />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
