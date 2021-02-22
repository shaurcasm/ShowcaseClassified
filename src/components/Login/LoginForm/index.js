// A React Bootstrap Form COmponent for Login
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginForm = ({ handleSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // Stop form actions
        event.preventDefault();
        event.stopPropagation();
    
        // Sending the form data as URLSearchparams, could also use json
        const authObject = {
            "username": username,
            "password": password
        }
        const authURL = new URLSearchParams(authObject);
        // Send request to the server and store flash if there
        // If successful, store the received token in localStorage
        
        fetch('/api/login', {
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
            <Form.Group controlId='formEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='username'
                    placeholder='Username'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;