import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { getAdminProducts, clearErrors, deleteProduct } from '../../redux/actions/productActions';
import SideBar from './SideBar';
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants';

export default function ProductsList({history}) {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, products} = useSelector(state => state.products);
    const {error : deleteError, isDeleted} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts())
        
        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Product deleted successfully');
            history.push('/admin/products')
            dispatch({ type : DELETE_PRODUCT_RESET})
        }

    }, [dispatch, alert, error, isDeleted, deleteError, history]);

    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        products.forEach(product => {
            data.rows.push({
                id : product._id,
                name : product.name,
                price : `$${product.price}`,
                stock: product.stock,
                actions : 
                <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn py-1 px-2" id="blue">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button id="red" className="btn py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        });
        return data
    };

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2" >
                    <SideBar/>
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                        <h1 className="my-5" >All Products</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable 
                            data={setProducts()}
                            className="mx-3"
                            bordered
                            hover
                            striped
                        />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
