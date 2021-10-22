import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { getAdminProducts } from '../../redux/actions/productActions';

export default function ProductsList() {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, products} = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAdminProducts())
        
        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }
    }, [dispatch, alert, error]);

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

        orders.forEach(order => {
            data.rows.push({
                id : order._id,
                numOfItems : order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status : order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p style={{color : 'green'}}>{order.orderStatus}</p>
                : <p style={{color : 'red'}}>{order.orderStatus}</p>,
                actions : 
                    <Link to={`/order/${order._id}`} className="btn btn_primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        });
        return data
    }

    return (
        <div>
            
        </div>
    )
}
