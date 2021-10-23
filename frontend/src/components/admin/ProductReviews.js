import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import SideBar from './SideBar';
import { clearErrors, getProductReviews } from '../../redux/actions/productActions';


export default function ProductReviews() {

    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, reviews} = useSelector(state => state.productReviews);
    
    useEffect(() => {
        
        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }

        if(productId !== ''){
            dispatch(getProductReviews(productId))
        }

    //    if(isDeleted){
    //         alert.success('User deleted successfully');
    //         history.push('/admin/users')
    //         dispatch({ type : DELETE_USER_RESET})
    //     }

    }, [dispatch, alert, error, productId ]);

    // const deleteUserHandler = (id) => {
    //     dispatch(deleteUser(id))
    // }

    const submitHandler= (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns : [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc',
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        reviews.forEach(review => {
            data.rows.push({
                id : review._id,
                rating : review.rating,
                comment : review.comment,
                user : review.name,
                actions : 
                
                    <button id="red" className="btn py-1 px-2 ml-2" >
                    <i className="fa fa-trash"></i>
                    </button>
                
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
                <div className="row justify-content-center mt-5">
			        <div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="productId_field">Enter Product ID</label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
								</button>
                            </ form>
                        </div>
                    </div>

                    {reviews && reviews.length > 0 ? (
                        <MDBDataTable 
                        data={setReviews()}
                        className="mx-3"
                        bordered
                        hover
                        striped
                    />
                    ) : (
                        <p className="mt-5 text-center" >No Reviews</p>
                    )}
                </Fragment>
            </div>
        </div>
    </Fragment>
    )
}
