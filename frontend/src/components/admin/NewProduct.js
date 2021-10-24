import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, newProduct } from '../../redux/actions/productActions';
import SideBar from './SideBar';
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstants';

export default function NewProduct({history}) {

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
        seller: ''
    });
    const { name, price, description, category, stock, seller } = product;
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Dtective & Thriller','Romance','Fantasy & Science-fiction','Practical Life & Leisure','Religion',
        'Economics & Law','Humanities & Social Sciences','Science and Technology']

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, success, error} = useSelector(state => state.newProduct);

    useEffect(() => {
        if(success){
            history.push('/admin/products');
            alert.success('Product added successfully');
            dispatch({ type : NEW_PRODUCT_RESET})
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('category', category);

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newProduct(formData))
    };

    const onChange = (e) => {
        if(e.target.name === 'images'){

            const files = Array.from(e.target.files);

            setImagesPreview([]);
            setImages([]);

            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImagesPreview(oldArray => [...oldArray, reader.result]);
                        setImages(oldArray => [...oldArray, reader.result])
                    }
                }
                reader.readAsDataURL(file)
            })

        } else {
            setProduct({...product, [e.target.name] : [e.target.value]})
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2" >
                    <SideBar/>
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                    <div className="wrapper my-5"> 
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                            <label for="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name= "name"
                                value={name}
                                onChange={onChange}
                            />
                            </div>

                            <div className="form-group">
                                <label for="price_field">Price</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                name= "price"
                                value={price}
                                onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label for="description_field">Description</label>
                                <textarea className="form-control" id="description_field" rows="8" name= "description"
                                value={description} onChange={onChange}></textarea>
                            </div>

                            <div className="form-group">
                                <label for="category_field">Category</label>
                                <select className="form-control" id="category_field" 
                                name= "category"
                                value={category}
                                onChange={onChange}>
                                    <option>Choose a Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category} >{category}</option>
                                    ))}
                            
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="stock_field">Stock</label>
                                <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                name= "stock"
                                value={stock}
                                onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label for="seller_field">Seller Name</label>
                                <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                name= "seller"
                                value={seller}
                                onChange={onChange}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label>Images</label>
                                
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            // name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            name= "images"
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' for='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {imagesPreview.map(image => (
                                        <img key={image} className="mt-3 mr-2" src={image} alt="images Preview" 
                                        width="55" height="52" />
                                    ))}
                            </div>

                
                            <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled= {loading? true : false}
                            >
                            CREATE
                            </button>

                        </form>
                    </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
