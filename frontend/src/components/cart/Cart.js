import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';


export default function Cart({history}) {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1

        if(newQty > stock) return ;
        dispatch(addToCart(id,newQty))
    };

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1

        if(newQty < 1) return ;
        dispatch(addToCart(id,newQty))
    };

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id))
    };

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    };

    const getCartTotalPrice = () => {
        return cartItems.reduce((totalPrice, item) => Number(item.price * item.quantity) + totalPrice, 0).toFixed(3)
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Fragment>
            {cartItems.length === 0 ? <h2 className="mt-5">Your Cart is empty...</h2> : (
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map(item => (
                                <Fragment  key={item.product}>
                                    <hr/>
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${(item.price * item.quantity).toFixed(3)}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={()=>{
                                                        decreaseQty(item.product, item.quantity)
                                                    }} >-</span>
                                                    <input type="number" className="form-control count d-inline" 
                                                    value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={()=>{
                                                        increaseQty(item.product, item.quantity, item.stock)
                                                    }}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger"
                                                onClick={()=>{
                                                    removeItemHandler(item.product)
                                                }}></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                            </Fragment>
                            ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{getCartCount()} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">{getCartTotalPrice()}</span></p>
                
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block"
                                onClick={checkoutHandler} >Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
