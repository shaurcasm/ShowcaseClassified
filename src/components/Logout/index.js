import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        // When component is initialized, token is removed from localStorage, i.e. logged out.
        localStorage.removeItem('token');
    }

    render() {
        return (
            <Redirect to='/login' />
        );
    }
}