import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import SideBar from './SideBar';
import { clearErrors, deleteOrder, getAllOrders } from '../../redux/actions/orderActions';
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants';


export default function OrdersList({history}) {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, orders} = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(getAllOrders())
        
        if(error){
            dispatch(clearErrors())
            alert.error(error)
        }

       
        if(isDeleted){
            alert.success('Order deleted successfully');
            history.push('/admin/orders')
            dispatch({ type : DELETE_ORDER_RESET})
        }

    }, [dispatch, alert, error, isDeleted, history]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'No of Items',
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
                <Fragment>
                    <Link to={`/admin/order/${order._id}`} id="blue" className="btn">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button id="red" className="btn py-1 px-2 ml-2" onClick={() =>{deleteOrderHandler(order._id)} } >
                    <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        });
        return data
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2" >
                    <SideBar/>
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                        <h1 className="my-5" >All Orders</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable 
                            data={setOrders()}
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
