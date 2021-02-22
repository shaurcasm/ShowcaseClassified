import React, { useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
    const [anybodyHome, setHomeStatus] = useState(false);
    //let dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        let path = location.pathname;
        if(path === '/profile') {
            setHomeStatus(true);
        }
        else setHomeStatus(false);
    }, [location.pathname])
    
    return (
        <nav id='navigation'>
            <ul id='nav-list'>
                {   !anybodyHome &&
                    <>
                    <li><Link to='/signup'>Signup</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    </>
                }
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/logout'>Logout</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;