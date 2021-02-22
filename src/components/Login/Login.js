import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isAuthenticated from '../../utils/isAuthenticated';
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';

//<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedin: isAuthenticated(),
            show: false
        };

        // Bind stateful methods
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogInSuccess = this.handleLogInSuccess.bind(this);
    }

    componentDidMount() {
        this.handleShow()
    }

    handleShow() {
        this.setState({
            show: true
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleLogInSuccess() {
        this.setState({
            loggedin: true
        })
        this.handleClose();
    }

    // Redirects to Homepage if user is logged in
    render() {
        if(this.state.loggedin) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: this.props.location }
                    }}
                />
            );
        } else {
            return (
                <>
                    <Modal
                        {...this.props}
                        show={this.state.show}
                        onHide={this.handleClose}
                        aria-labelledby="Login Form"
                        backdrop='static'
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LoginForm handleSuccess={this.handleLogInSuccess} />
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
    }
}