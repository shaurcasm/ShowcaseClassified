// Core SPA.
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute.js';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';

// ToDO
//import Checkout from './components/Checkout';
//<PrivateRoute exact path='/' component={Home} />

import './App.scss';

const App = () => {
    
    return(
        <div className='app-container'>
            <header>
                <h1><Link to='/'>BARTER SHOP</Link></h1>
                <Navigation />
            </header>
            <main id='main-container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute path='/profile' component={Profile} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/logout' component={Logout} />
                </Switch>
            </main>
            <footer id='footer'>
                Copyright © Shaurya S. Pal 2021.
            </footer>
        </div>
    );
}

export default App