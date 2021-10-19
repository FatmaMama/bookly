import React, {useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../redux/actions/userActions';


export default function Register({ history }) {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default-avatar.png')

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, isAuthenticated, error} = useSelector(state => state.auth);

    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, isAuthenticated, history]);

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        dispatch(register(formData))
    };

    const onChange = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({...user, [e.target.name] : [e.target.value]})
        }
    }

    return (
        <div class="row wrapper">
            <div class="col-10 col-lg-5">
                <form class="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1 class="mb-3">Register</h1>

                <div class="form-group">
                    <label htmlFor="email_field">Name</label>
                    <input 
                        type="name" 
                        id="name_field" 
                        class="form-control" 
                        name = "name"
                        value={name}
                        onChange={onChange}
                    />
                </div>

                    <div class="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        class="form-control"
                        name = "email"
                        value={email}
                        onChange={onChange}
                    />
                    </div>
        
                    <div class="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        class="form-control"
                        name = "password"
                        value={password}
                        onChange={onChange}
                    />
                    </div>

                    <div class='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div class='d-flex align-items-center'>
                        <div>
                            <figure class='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarPreview}
                                    class='rounded-circle'
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>
                        <div class='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                class='custom-file-input'
                                id='customFile'
                                accept= 'images/*'
                                onChange={onChange}
                            />
                            <label class='custom-file-label' for='customFile'>
                                Choose Avatar
                            </label>
                        </div>
                    </div>
                </div>
        
                    <button
                    id="register_button"
                    type="submit"
                    class="btn btn-block py-3"
                    disabled={loading ? true : false }
                    >
                    REGISTER
                    </button>
                </form>
            </div>
        </div>
    )
}
