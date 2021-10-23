import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCart } from '../../redux/actions/cartActions';


export default function OrderSuccess() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetCart())
    }, [])

    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success_order.png" alt="Order Success" width="200" height="200" />

                <h2>Your Order has been placed successfully.</h2>

                <Link to="/orders/me">Go to Orders</Link>
            </div>

        </div>
    )
}
