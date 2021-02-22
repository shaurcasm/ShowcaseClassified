import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewAdForm from './NewAdForm';
import './NewAd.scss';

export default class NewAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        // Bind stateful methods
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNewAdSuccess = this.handleNewAdSuccess.bind(this);
    }

    componentDidMount() {
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

    handleNewAdSuccess() {

        this.handleClose();
        // redirect home
    }

    // Redirects to Homepage if user is logged in
    render() {
        return (
            <>  
                <Button id='new-ad-button' variant="success" onClick={this.handleShow} size='sm'>
                    New Ad
                </Button>
                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="New Ad Form"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>New Ad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewAdForm handleSuccess={this.handleNewAdSuccess} />
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}