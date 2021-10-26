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

export default function AllProducts({ match }) {
    const alert = useAlert();
    const dispatch = useDispatch();
    

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ price, setPrice ] = useState([1, 1000]);
    const [ category, setCategory ] = useState('')
    const keyword = match.params.keyword;

    const categories = [
        'All',
        'Detective / Thriller',
        'Romance',
        'Fantasy / Science-fiction',
        'Practical Life / Leisure',
        'Religion',
        'Economics / Law',
        'Humanities / Social Sciences',
        'Science / Technology']
   
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error)
        };

        dispatch(getProducts(keyword,currentPage, price, category));
        
    }, [dispatch, alert, error, keyword, currentPage, price, category]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <h1 className="heading mt-5"> <span>All Books</span> </h1>

                    <div className="row px-5 mt-5 mb-3" >
                        <div className="range col-lg-3 col-md-3 col-6 mt-2">
                            <Range className="range"
                                    marks={{
                                        1: '$1',
                                        200: '$200'
                                    }}
                                    min={1}
                                    max={200}
                                    defaultValue={[1,200]}
                                    tipFormatter={value => `$${value}`}
                                    tipProps={{
                                        placement: "top",
                                        visible: true
                                    }}
                                    value={price}
                                    onChange={price => setPrice(price)}
                                    handleStyle={{
                                        borderColor: "#27ae60"
                                      }}
                                    railStyle={{ backgroundColor: '#27ae60' }}
                            />
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="col-lg-3 col-md-3 col-12 categories-sideBar pt-3">
                            <h5 className="pl-2 fw-bold">Books Genre</h5>
                            <ul>
                                {categories.map(category => (
                                    <li key={category}
                                        className="py-2 book-genre"
                                        style={{cursor : 'pointer'}}
                                        onClick={()=>{
                                        if(category==='All'){
                                            setCategory('')
                                        } else {
                                            setCategory(category)
                                        }
                                    }}
                                >{category}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                            <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product = {product} />
                            ))}
                            </div>
                        </div>
                    </div>

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
