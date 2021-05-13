import React, { useEffect, useState } from 'react';
import './cart.style.css';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import CartItem from '../../components/cartItem/CartItem.component';

const Cart = ({ cart }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach(item => {
            items += item.qty;
            price += item.qty * item.price;
        });

        setTotalPrice(price);
        setTotalItems(items);

    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])



    return (
        <>
            <div className="cart-main">
                <div className="cart-title">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="cart-container">
                    <div className="cart-left">
                        {cart.map(product => {
                            return <CartItem key={product._id} productData={product} />
                            // return <p key={product._id}>{product.productName}</p>
                        })}
                    </div>
                    <div className="cart-right">
                        <h3>Total : <span className="total-span">({totalItems} items)</span> &#8362;{totalPrice}</h3>
                        <Button color="blue">CHECKOUT</Button>
                    </div>
                </div>
            </div>

            {console.log(cart)}
        </>
    )
}



const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(Cart);