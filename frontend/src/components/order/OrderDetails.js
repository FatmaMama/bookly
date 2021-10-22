import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../layouts/Loader';
import { getOrderDetails, clearErrors } from '../../redux/actions/orderActions';

export default function OrderDetails({match}) {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, order } = useSelector(state => state.orderDetails);
    
    const {shippingInfo, orderItems, user, totalPrice, orderStatus, isPaid} = order

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))

        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }
    }, [dispatch, alert, error, match.params.id]);

    return (
        <Fragment>
             {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b>{user && user.name}</p>
                        <p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b>{`${shippingInfo && shippingInfo.address}, ${shippingInfo && shippingInfo.city}, ${shippingInfo && shippingInfo.postalCode}, ${shippingInfo && shippingInfo.country}`}</p>
                        <p><b>Amount:</b>{totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className={orderStatus && String(orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{order.orderStatus}</b></p>


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            {orderItems && orderItems.map(item => (
                                <div className="row my-5" key={item.product}>
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${item.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item.quantity} Piece(s)</p>
                                    </div>
                                </div>
                            ))}
                                    
                        </div>
                        <hr />
                    </div>
                    </div>
                </Fragment>
            )}
                        
        </Fragment>
    )
}
