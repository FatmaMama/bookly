import React, { Fragment, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import Product from './Product';

export default function Home() {

    const dispatch = useDispatch();

    const { loading, products, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <Fragment>
            { loading ? <h1>Loading...</h1> : (
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
