import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/actions/cartActions';
import CheckoutSteps from './CheckoutSteps';


export default function Shipping({history}) {

    const { shippingInfo } = useSelector(state => state.cart);

    
    const [address,setAddress] = useState(shippingInfo.address);
    const [city,setCity] = useState(shippingInfo.city);
    const [phoneNo,setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode,setPostalCode] = useState(shippingInfo.postalCode);
    const country = "Tunisia";

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country}));
        history.push('/order/confirm')
    };

    return (
        <Fragment>
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label for="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                name="phoneNo"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                name="country"
                                value={country}
                                readOnly
                                required
                            >
                                    <option>
                                        Tunisia
                                    </option>

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
