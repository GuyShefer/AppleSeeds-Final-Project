import React from 'react';
import './cart.style.css';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import CartItem from '../../components/cartItem/CartItem.component';

const Cart = ({ cart }) => {

    return (
        <>
            <div className="cart-main">
                <div className="cart-title">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="cart-container">
                    <div className="cart-left">
                        {cart.map(product => {
                            return <CartItem productData={product} />
                            // return <p key={product._id}>{product.productName}</p>
                        })}
                    </div>
                    <div className="cart-right">
                        <h3>Total Price : {'Price'}</h3>
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