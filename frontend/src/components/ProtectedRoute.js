import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({component : Component, ...rest}) {
     
    const { loading, isAuthenticated } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if(isAuthenticated === false){
                            return <Redirect to='/login' exact/>
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}
