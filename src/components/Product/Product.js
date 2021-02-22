import React, { Component } from 'react';
import './Product.scss';

export default class Product extends Component {
    constructor(props) {
        super(props);

        // Ideally have upvotes/Likes in server side database and update it there, visually here.
        this.state = {
            upvoted: 'neutral',
            disableAdd: this.props.product.id in this.props.productsInCart ? true : false
        };

        // Binders
        this.upvoted = this.upvoted.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
    
    }

    addToCart() {
        // Add to redux state of items in cart
        var productObject = this.props.product;
        this.props.addProduct(productObject)

        this.setState({
            disableAdd: true
        })
    }

    upvoted() {
        // Add className to upvote button, if already there remove the className
        var current = this.state.upvoted;
        var next = current === 'neutral' ? 'upvoted' : 'neutral';
        this.setState({
            upvoted: next
        });
    }

    render() {
        return (
            <div className='product'>
                <h3>{this.props.product.name}</h3>
                <div className='image-container'>
                    <img className='product-image' src={this.props.product.imageURL} alt={this.props.product.name} />
                </div>
                <div className='detail-container'>
                    <button id='upvote'  className={this.state.upvoted} onClick={this.upvoted}><i>Thumbs up</i></button>
                    <span id='cost'>{this.props.product.cost}</span>
                    <button id='addToCart' onClick={this.addToCart} disabled={this.state.disableAdd}><i>Cart</i></button>
                </div>
            </div>
        )
    }
}