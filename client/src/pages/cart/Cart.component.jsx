import React, { useEffect, useState } from 'react';
import './cart.style.css';
import { connect } from 'react-redux';
import { clearState } from '../../redux/Shopping/shopping-actions';
import { Button } from 'semantic-ui-react';
import CartItem from '../../components/cartItem/CartItem.component';
import axios from 'axios';
import url from '../../utilities/serverURL';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { errorToast, infoToast } from '../../utilities/toast';

const Cart = ({ cart, clearState }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const history = useHistory();

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

    const purchaseProducts = async () => {
        const token = JSON.parse(localStorage.getItem('token'));

        const pruchaseCart = cart.map(product => {
            return {
                productId: product._id,
                amount: product.qty,
            }
        })
        const purchaseBody = { products: pruchaseCart, totalPrice };
        try {
            await axios.put(url + '/api/purchases', purchaseBody, { headers: { Authorization: `Bearer ${token}` } });

            clearState();
            infoToast(`Purchase completed successfully`);
            setTimeout(() => {
                history.push("/");
            }, 2000);
        } catch (err) {
            errorToast(err.response.data);
        }
    }


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
                        })}
                    </div>
                    <div className="cart-right">
                        <h3>Total : <span className="total-span">({totalItems} items)</span> &#8362;{totalPrice}</h3>
                        <Button color="blue" onClick={purchaseProducts}>CHECKOUT</Button>
                    </div>
                </div>
            </div>
            <div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    )
}


const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearState: () => dispatch(clearState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);