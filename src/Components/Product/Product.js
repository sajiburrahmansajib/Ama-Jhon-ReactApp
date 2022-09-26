import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    const { name, img, price, seller, ratings, stock } = props.product;
    const { handleAddToCart } = props
    return (
        <div className='products'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>Price : ${price}</p>
                <p><small>Manufacturer : {seller}</small> </p>
                <p> <small>Rating : {ratings} Star</small> </p>
                <h6>Stock : {stock}</h6>
            </div>
            <button id='addToCart' onClick={() => handleAddToCart(props.product)} >
                <p className='btn-text'>Add To Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;