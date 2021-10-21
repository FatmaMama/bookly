import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { useAlert } from 'react-alert';
import { clearErrors } from '../../redux/actions/productActions';
import { createOrder } from '../../redux/actions/orderActions';


export default function ConfirmOrder({ history }) {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    //calculate order prices
    const itemsPrice = cartItems.reduce((acc, item) => item.quantity * item.price + acc, 0);
    const shippingPrice = itemsPrice > 250 ? 0 : 20;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const [isPayment, setIsPayment] = useState(false);

    const { loading, error } = useSelector(state => state.newOrder);

    const order = {
        orderItems : cartItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    };

    useEffect(() => {
        if(error) {
            dispatch(clearErrors());
            alert.error(error)
        }
    },[dispatch, alert, error]);

    const placeOrderHandler = (order) => {
        dispatch(createOrder(order))
        history.push('/success')
    }
    
    return (
        <Fragment>
            {isPayment ? <CheckoutSteps shipping confirmOrder payment/> : <CheckoutSteps shipping confirmOrder/> }
             
            <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b>{user.name}</p>
                <p><b>Phone:</b>{shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b>{`${shippingInfo.address}, ${shippingInfo.city},
                ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                {cartItems.map(item => (
                    <Fragment>
                        <hr />
                        <div className="cart-item my-1">
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt="Laptop" height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-6">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                </div>

                            </div>
                        </div>
                        <hr />


                    </Fragment>
                ))}
            </div>
			
            {!isPayment && <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block"
                        onClick={() => setIsPayment(true)}>Proceed to Payment</button>
                    </div>
                </div>}
            {isPayment && <div className='col-12 col-lg-8 mt-5' >
                <h4>Payment</h4>
                <h6>Cash on delivery</h6>
                <p>Pay with cash upon delivery</p>
                <button id="checkout_btn" className="btn btn-primary btn-block py-3" 
                onClick={() => placeOrderHandler(order)} 
                disabled ={loading? true : false} >Place Order</button>
                </div>}
			</div>
        </Fragment>
    )
}
