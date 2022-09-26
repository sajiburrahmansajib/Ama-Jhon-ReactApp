import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, deleteShoppingCart, getStoredData } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storedItem = getStoredData();
        const saveCart = [];
        for (const id in storedItem) {
            const addProduct = products.find(product => product.id === id)
            if (addProduct) {
                const newQuantity = storedItem[id]
                addProduct.quantity = newQuantity;
                saveCart.push(addProduct)
            }
            setCart(saveCart)
        }
    }, [products, cart])
    const handleAddToCart = (selectedProduct) => {

        const exists = cart.find(product => product.id === selectedProduct.id)
        let newCart = [];
        if (!exists) {
            selectedProduct.quantity = 1;
            selectedProduct.stock = selectedProduct.stock - 1;
            if (selectedProduct.stock === 0) {
                selectedProduct.stock = 'Out Of Stock';
                newCart = [...cart, selectedProduct];

            }
            else {
                newCart = [...cart, selectedProduct];
            }

        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id)
            exists.quantity = exists.quantity + 1;
            exists.stock = exists.stock - 1;
            if (exists.stock === 0) {
                exists.stock = 'Out Of Stock';
                newCart = [...rest, exists];
            }
            else {
                newCart = [...rest, exists]
            }
        }
        setCart(newCart)
        addToDb(selectedProduct.id)
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;