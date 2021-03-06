import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../layouts/Loader';
import SideBar from './SideBar';
import { getOrderDetails, clearErrors, updateOrder } from '../../redux/actions/orderActions';
import { UPDATE_ORDER_RESET } from '../../redux/constants/orderConstants';


export default function ProcessOrder({match}) {

   const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, order } = useSelector(state => state.orderDetails);
    const {shippingInfo, orderItems, user, totalPrice, orderStatus, isPaid} = order;
    const {error : updateError, isUpdated} = useSelector(state => state.order)

    useEffect(() => {
        
        dispatch(getOrderDetails(match.params.id))

        if(isUpdated){
            alert.success('Order updated successfully');
            dispatch({ type : UPDATE_ORDER_RESET})
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, isUpdated, updateError, match.params.id]);


    const updateOrderHandler = (id) =>{
        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    };


    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2" >
                    <SideBar/>
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-7 order-details">
        
                                <h2 className="my-5">Order # {order._id}</h2>
        
                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b>{user && user.name}</p>
                                <p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Address:</b>{`${shippingInfo && shippingInfo.address}, ${shippingInfo && shippingInfo.city},
                                ${shippingInfo && shippingInfo.postalCode}, ${shippingInfo && shippingInfo.country}`}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>
        
                                <hr />
        
                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
        
                                <h4 className="my-4">Order Status:</h4>
                                <p className={orderStatus && String(orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'} >
                                    <b>{order.orderStatus}</b></p>
        
        
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
                            
                            <div class="col-12 col-lg-3 mt-5">
                                            <h4 class="my-4">Status</h4>
        
                                            <div class="form-group">
                                                <select
                                                    class="form-control"
                                                    name='status'
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </div>
        
                                            <button class="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)} >
                                                Update Status
                                        </button>
                                        </div>
                            
                        </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
