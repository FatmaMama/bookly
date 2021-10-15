import React, { Fragment, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import Loader from './layouts/Loader';
import Product from './Product';
import { useAlert } from 'react-alert';

export default function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error)
        };

        dispatch(getProducts());

    }, [dispatch, alert, error])

    return (
        <Fragment>
            { loading ? <Loader/> : (
                <Fragment>
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                            <Product key={product._id} product = {product} />
                            ))}
                            
                        </div>
                    </section>
                </Fragment>
            )}
            
        </Fragment>
    )
}
