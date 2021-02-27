// File upload referred from = https://www.js-tutorials.com/react-js/learn-react-file-upload-in-5-minute/
// A React Bootstrap Form Component for Sign Up
import React, { useState, useEffect } from 'react';
import { Button, Form, Toast } from 'react-bootstrap';

const NewAdForm = ({ handleSuccess }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');
    const [productname, setProductname] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [ownerID, setOwnerID] = useState('');

    useEffect(() => {
        // Header has authorization compliant with extract as bearer with token method.
        fetch('/api/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        }).then(user => {
            setOwnerID(user.id);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const validateFile = (file) => {
        let size = 3000000;
        let regEx = /^[^.]+(\.jpg|\.png|\.jpeg)$/;
        
        if(!regEx.test(file.name)) {
            setToastText('Upload a .jpeg, .jpg or .png format Image please');
            setShowToast(true);
            return false;
        }

        if(file.size > size) {
            setToastText(file.type+' is too large, please pick a smaller file\n');
            setShowToast(true);
            return false;
        }

        return true;
    }

    const onFileChange = (event) => {
        var file = event.target.files[0];

        if(validateFile(file)) {
            setImage(file);
        }
    }

    const handleSubmit = (event) => {
        // Stop form actions
        event.preventDefault();
        event.stopPropagation();

        event.target.submitButton.disabled = true;
    
        // Sending the form data as URLSearchparams, could also use json
        const data = new FormData()
        data.append('productname', productname);
        data.append('cost', cost);
        data.append('category', category);
        data.append('image-file', image);
        data.append('owner', ownerID);

        // Send request to the server and store flash if there
        // If successful, store the received token in localStorage
        
        fetch('/api/add-ad', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data'
            },
            body: data
        }).then(res => {
            return res.json()
        }).then(data => {
            handleSuccess();
        }).catch(err => {
            setToastText(JSON.stringify(err));
            setShowToast(true);
            console.error(err);
        });
    } 

    return (
        <>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={4500} autohide>
                <Toast.Header>
                    <strong className='mr-auto'>Image Upload</strong>
                </Toast.Header>
                <Toast.Body>{toastText}</Toast.Body>
            </Toast>
            <Form id='new-ad-form' onSubmit={handleSubmit}>
                <Form.Group controlId='formProductname'>
                    <Form.Label>Product Name <span style={{color:'red'}}>* Required</span></Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='What are you selling today?'
                        value={productname}
                        onChange={event => setProductname(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='formCost'>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Selling Price?'
                        value={cost}
                        onChange={event => setCost(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='formCategory'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='What type of Product is it?'
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='formImage'>
                    <Form.Label>Product Image <span style={{color:'red'}}>* Required</span></Form.Label>
                    <Form.File
                        type='file'
                        id='image-upload'
                        onChange={onFileChange}
                        name='image-file'
                        required
                    />
                </Form.Group>

                <Button name='submitButton' variant='success' type='submit' size='sm'>
                    Add this Ad
                </Button>
            </Form>
        </>
    );
};

export default NewAdForm;