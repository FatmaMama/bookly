import React, { Fragment, useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import Loader from './layouts/Loader';
import Product from './Product';
import { useAlert } from 'react-alert';
import  Pagination  from 'react-js-pagination';

export default function Home({ match }) {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [ currentPage, setCurrentPage ] = useState(1);
    const keyword = match.params.keyword
   
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error)
        };

        dispatch(getProducts(keyword,currentPage));

    }, [dispatch, alert, error, keyword, currentPage]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

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

                    {resPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                        <Pagination 
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'first'}
                            lastPageText={'last'}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}
