import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isAuthenticated from '../../utils/isAuthenticated';
import { Modal } from 'react-bootstrap';
import SignupForm from './SignupForm';
import './Signup.scss';

export default class Signup extends Component {
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
                        aria-labelledby="Signup Form"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Sign Up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SignupForm handleSuccess={this.handleLogInSuccess} />
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
    }
}