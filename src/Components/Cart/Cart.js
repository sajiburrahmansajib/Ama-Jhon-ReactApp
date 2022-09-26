import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'
import { deleteShoppingCart } from '../../utilities/fakedb';


const Cart = ({ cart }) => {
    // const initialValue = 0;
    // const totalPrice = cart.reduce(
    //     (previousValue, currentValue) => previousValue + currentValue.price,
    //     initialValue
    // );
    let totalPrice = 0;
    let quantity = 0;
    let shipping = 0;
    let tax = 0;
    let grandTotal = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
        shipping = shipping + product.shipping;
        tax = tax + product.price * product.quantity * 0.01;
        grandTotal = totalPrice + shipping + tax;
    }
    const handleAllClear = () => {
        deleteShoppingCart();
        console.log("clear click")
    }
    tax = tax.toFixed(2)
    grandTotal = parseFloat(grandTotal.toFixed(2))
    return (
        <div className='cart'>
            <h1>Order Summery</h1>
            <p>Selected Item : {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge :${shipping}  </p>
            <p>Tax : ${tax}</p>
            <h2>Grand Total : ${grandTotal}</h2>
            <div className='btn-clear'>
                <button onClick={handleAllClear}>
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
    );
};

export default Cart;