import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { myOrders, clearErrors } from '../../redux/actions/orderActions';

export default function ListOrders() {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, orders} = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders())
        
        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }
    }, [dispatch, alert, error]);

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions'
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
                    <Link to={`/me/order/${order._id}`} id="blue" className="btn">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        });
        return data
    }

    return (
        <Fragment>
            <h1 className="my-5">My Orders</h1>
            {loading ? <Loader/> : (
                <MDBDataTable 
                    data={setOrders()}
                    className="mx-3"
                    bordered
                    hover
                    striped
                />
            )}
        </Fragment>
    )
}
