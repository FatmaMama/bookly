import React, { Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { getAdminProducts} from '../redux/actions/productActions';
import { useAlert } from 'react-alert';
import Loader from './layouts/Loader';
import Product from './Product';

export default function Home({match}) {

    const alert = useAlert();
    const dispatch = useDispatch();
   
    const { loading, products, error} = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error)
        };

        dispatch(getAdminProducts());
        
    }, [dispatch, alert, error]);

    


    return (
        <Fragment>
            <section className="home" id="home">
                <div className="container" >
                    <div className="row p-5">

                        <div className="col-lg-6 pt-5">
                            <h3 className="cover-title">Upto 75% Off</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam deserunt nostrum accusamus. Nam alias sit necessitatibus, aliquid ex minima at!</p>
                            <Link to="/home" className="btn shop-btn">Shop Now</Link>
                        </div>

                        <div className="col-lg-6 pt-3">
                            <div className="images-wrapper d-flex justify-content-center">
                                <img className="cover-img" src="images/book-1.png" alt="book" />
                                <img className="cover-img" src="images/book-2.png" alt="book" />
                                <img className="cover-img" src="images/book-3.png" alt="book"/>

                            </div>
                            <img src="images/stand.png" className="stand" alt=""/>
                        </div>
                    </div>
                </div>

            </section>

            <section className="icons-container">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 icons d-flex align-items-center justify-content-center">
                            <i className="fas fa-shipping-fast fa-3x" style={{color : "#27ae60"}}></i>
                            <div className="content ml-3">
                                <h3 className="icons-title">Free Shipping</h3>
                                <p>Order Over $100</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 icons d-flex align-items-center justify-content-center">
                            <i className="fas fa-redo-alt fa-3x" style={{color : "#27ae60"}}></i>
                            <div className="content ml-3">
                                <h3 className="icons-title">Easy Returns</h3>
                                <p>10 Days Returns</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 icons d-flex align-items-center justify-content-center">
                            <i className="fas fa-headset fa-3x" style={{color : "#27ae60"}}></i>
                            <div className="content ml-3 d-flex flex-column align-content-center align-items-center">
                                <h3 className="icons-title">24/7 Support</h3>
                                <p>Call Us Anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <h1 className="heading"> <span>Latest Books</span> </h1>
                <div className="container" >
                    <div className="row" >
                        <Fragment>
                            {loading ? <Loader /> : (
                                <Fragment>
                                    {products && products.splice(products.length - 8 , products.length).map(product => (
                                        <Product key={product._id} product = {product} />
                                    ))}
                                </Fragment>
                            )}
                        </Fragment>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}