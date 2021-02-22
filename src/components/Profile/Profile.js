// A React Bootstrap Form Component for Profile update
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import NewAd from '../NewAd';
import './Profile.scss';

const ProfileForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmativePassword, setConfirmativePassword] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [userID, setID] = useState('');

    useEffect(() => {
        // Header has authorization compliant with extract as bearer with token method.
        fetch('/api/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        }).then(user => {
            setID(user.id);
        }).catch(err => {
            console.log(err);
        });

        setUpdateStatus('');
    }, [])

    const handleSubmit = (event) => {
        // Stop form actions
        event.preventDefault();
        event.stopPropagation();
        setUpdateStatus("");

        if(newPassword !== confirmativePassword) {
            setUpdateStatus("Passwords don't match.");
            return console.error("Error: Passwords weren't confirmed.");
        }

        if(!userID) {
            return console.error("Error: User ID wasn't accessed at mount.");
        }
    
        // Sending the form data as URLSearchparams, could also use json
        const authObject = {
            "id": userID,
            "username": username,
            "password": password,
            "name": name,
            "phone": phone,
            "newPassword": newPassword
        };
        const authURL = new URLSearchParams(authObject);
        // Send request to the server and store flash if there
        // If successful, store the received token in localStorage
        
        fetch('/api/update-user', {
            method: 'POST',
            body: authURL
        }).then(res => {
            return res.json()
        }).then(data => {
            setUpdateStatus(data.message);
        }).catch(err => {
            console.error(err);
        });
    }

    // Add button to open New Ad Modal.

    return (
        <>
            <NewAd />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
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

                <Form.Group controlId='formNewPassword'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                        pattern='.{6,20}'
                    />
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password <span style={{color:'orange'}}>* Required if setting new Password</span></Form.Label>
                    <Form.Control
                        type='password'
                        value={confirmativePassword}
                        onChange={event => setConfirmativePassword(event.target.value)}
                        pattern='.{6,20}'
                    />
                </Form.Group>

                <Form.Group controlId='formPassword'>
                    <Form.Label>Confirm changes with your current Password <span style={{color:'red'}}>* Required</span></Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        pattern='.{6,20}'
                    />
                </Form.Group>

                {
                    updateStatus &&
                    <Form.Control id='status' plaintext readOnly defaultValue={updateStatus} />
                }

                <Button id='update-submit-button' variant='primary' type='submit'>
                    Update
                </Button>
            </Form>
        </>
    );
};

export default ProfileForm;