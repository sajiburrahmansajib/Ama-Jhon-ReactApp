import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const initialValue = 0;
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalShipping, setTotalShipping] = useState(0)
    const [tax, setTax] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)

        const totalCost = newCart.reduce(
            (previousValue, currentValue) => previousValue + currentValue.price,
            initialValue
        );
        setTotalPrice(totalCost)
        const totaltax = newCart.reduce(
            (previousValue, currentValue) => previousValue + currentValue.price * 0.05,
            initialValue
        );
        const newtax = Math.ceil(totaltax)
        setTax(newtax)
        const totalCostShipping = newCart.reduce(
            (previousValue, currentValue) => previousValue + currentValue.shipping,
            initialValue
        );
        setTotalShipping(totalCostShipping)

        const total = totalCost + totalCostShipping;
        setGrandTotal(total)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <h1>Order Summery</h1>
                <h3>Selected Item : {cart.length}</h3>
                <h3>Total Price: ${totalPrice}</h3>
                <h3>Total Shipping Charge : ${totalShipping} </h3>
                <h3>Tax : ${tax} </h3>
                <h2>Grand Total : ${grandTotal}</h2>
                <div className='btn-clear'>
                    <button>
                        <p className='btn-text'>Clear Cart</p>
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                </div>
                <div className='btn-review'>
                    <button>
                        <p className='btn-text'>Review Orders</p>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shop;