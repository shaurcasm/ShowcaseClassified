// A gatekeeping wrapper Route
// Referenced from: https://reactrouter.com/web/example/auth-workflow
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';

// Checks if the user is logged in
// Else redirects to '/login'
// ...rest spread routeProps and makes it available to pass onto the component
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )}
    />
)

export default PrivateRoute;