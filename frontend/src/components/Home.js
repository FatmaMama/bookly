import React, { Fragment, useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import Loader from './layouts/Loader';
import Product from './Product';
import { useAlert } from 'react-alert';
import  Pagination  from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

export default function Home({ match }) {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ price, setPrice ] = useState([1, 1000])
    const keyword = match.params.keyword
   
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error)
        };

        dispatch(getProducts(keyword,currentPage, price));

    }, [dispatch, alert, error, keyword, currentPage, price]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <Fragment>
            { loading ? <Loader/> : (
                <Fragment>
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div classname="row" >
                            <div className="range col-lg-4 col-md-4 col-6 mt-5 mb-5">
                                <Range className="range"
                                    marks={{
                                        1: '$1',
                                        1000: '$1000'
                                    }}
                                    min={1}
                                    max={1000}
                                    defaultValue={[1,1000]}
                                    tipFormatter={value => `$${value}`}
                                    tipProps={{
                                        placement: "top",
                                        visible: true
                                    }}
                                    value={price}
                                    onChange={price => setPrice(price)}
                                    handleStyle={{
                                        borderColor: "#fa9c23"
                                      }}
                                    railStyle={{ backgroundColor: '#fa9c23' }}
                                />
                            </div>
                        </div>
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
