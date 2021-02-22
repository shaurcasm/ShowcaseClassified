// eslint-disable-next-line no-unused-vars
import React from 'react';
import Product from './Product.js';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/productsAction.js';
import productsInCart from '../../selectors/productsInCart.js';

const mapStateToProps = state => ({
    productsInCart: productsInCart(state)
});

const mapDispatchToProps = dispatch => ({
    addProduct: (product) => dispatch(addProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);