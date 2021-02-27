import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import products from '../../constants/products';
//import Product from '../Product';
import './Home.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
        };

        // Bind stateful methods
    }

    componentDidMount() {
        // Header has authorization compliant with extract as bearer with token method.
        fetch('/api/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        }).then(user => {
            this.setState({ username: user.username });  
        }).catch(err => {
            console.log(err);
        });
    }
    

    componentDidUpdate() {
    }

    productsToComponents() {
        /*
        return products.map(product => (
            <div className='product' key={product.id}>
                <Product product={product} />
            </div>
        ));
        */
    }

    render() {
        let username = this.state.username;

        return (
            <div className='homepage'>
                <div className='header'>
                    <div>
                        <h2>Home</h2>
                        <p>Welcome Home, {username}!</p>
                    </div>
                    <ul className='link-box'>
                        <li><Link to='/checkout'><i></i>Checkout</Link></li>
                        
                    </ul>
                </div>
                <img src='./adImages/1614112968790.png' alt="It's britney bitch" />
                
                <div className='products-container'>
                    {this.productsToComponents()}
                </div>
            </div>
        );
    }
}