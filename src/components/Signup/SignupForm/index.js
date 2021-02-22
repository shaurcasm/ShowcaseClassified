// A React Bootstrap Form Component for Sign Up
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SignupForm = ({ handleSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        // Stop form actions
        event.preventDefault();
        event.stopPropagation();
    
        // Sending the form data as URLSearchparams, could also use json
        const authObject = {
            "username": username,
            "password": password,
            "name": name,
            "phone": phone
        }
        const authURL = new URLSearchParams(authObject);
        // Send request to the server and store flash if there
        // If successful, store the received token in localStorage
        
        fetch('/api/signup', {
            method: 'POST',
            body: authURL
        }).then(res => {
            return res.json()
        }).then(data => {
            localStorage.setItem('token', data.token);
            handleSuccess();
        }).catch(err => {
            console.error(err);
        });
    } 

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username<span style={{color:'red'}}>* Required</span></Form.Label>
                <Form.Control
                    type='username'
                    placeholder='Username'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    required
                    pattern='.{2,16}'
                />
            </Form.Group>

            <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Anon'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formPhone'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type='tel'
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password<span style={{color:'red'}}>* Required</span></Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                    pattern='.{6,20}'
                />
            </Form.Group>

            <Button variant='primary' type='submit'>
                Sign up
            </Button>
        </Form>
    );
};

export default SignupForm;