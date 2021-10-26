import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, getProductDetails, updateProduct} from '../../redux/actions/productActions';
import SideBar from './SideBar';
import { UPDATE_PRODUCT_RESET } from '../../redux/constants/productConstants';

export default function UpdateProduct({match, history}) {

    const [productToUpdate, setProductToUpdate] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
        seller: ''
    });
    const { name, price, description, category, stock, seller } = productToUpdate;
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const categories = [
        'Detective / Thriller',
        'Romance',
        'Fantasy / Science-fiction',
        'Practical Life / Leisure',
        'Religion',
        'Economics / Law',
        'Humanities / Social Sciences',
        'Science / Technology']

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, product } = useSelector(state => state.productDetails);
    const { error : updateError , loading, isUpdated } = useSelector(state => state.product);

    useEffect(() => {
        if(product && product._id !== match.params.id){
            dispatch(getProductDetails(match.params.id))
        } else {
            setProductToUpdate({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                stock: product.stock,
                seller: product.seller
            })
            setOldImages(product.images)
        }

        if(isUpdated){
            history.push('/admin/products');
            alert.success('Product updated successfully');
            dispatch({ type : UPDATE_PRODUCT_RESET})
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors())
        }
       
    }, [dispatch, alert, error, isUpdated, history, updateError, product, match.params.id]);

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

        if(images.length === 0){
            alert.error('Choose Images for your product');
            dispatch(clearErrors());
        } else {
            dispatch(updateProduct(product._id, formData))
        }
        
    };

    const onChange = (e) => {
        if(e.target.name === 'images'){

            const files = Array.from(e.target.files);

            setImagesPreview([]);
            setImages([]);
            setOldImages([]);


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
            setProductToUpdate({...productToUpdate, [e.target.name] : [e.target.value]})
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
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                            <label htmlFor="name_field">Name</label>
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
                                <label htmlFor="price_field">Price</label>
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
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field" rows="8" name= "description"
                                value={description} onChange={onChange}></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field" 
                                name= "category"
                                value={category}
                                onChange={onChange}>
                                    <option value={category}>{category}</option>
                                    {categories.map(category => (
                                        <option key={category} value={category} >{category}</option>
                                    ))}
                            
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
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
                                <label htmlFor="seller_field">Seller Name</label>
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
                                        <label className='custom-file-label' tmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    {oldImages && oldImages.map(image => (
                                        <img key={image} className="mt-3 mr-2" src={image.url} alt={image.url} 
                                        width="55" height="52" />
                                    ))}

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
                            UPDATE
                            </button>

                        </form>
                    </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
