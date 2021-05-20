import React, { useEffect, useState } from 'react';
import './saveProduct.style.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import url from '../../utilities/serverURL';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { errorToast, successToast } from '../../utilities/toast';

const SaveProduct = (props) => {
    const initProductState = { productName: '', productType: 'earrings', bestSeller: false, quantity: 0, price: 0, image: '', material: 'silver', description: '' };
    const [product, setProduct] = useState(initProductState);
    const [updateProduct, setUpateProduct] = useState(false);
    const [userType] = useState(props.userType || props.location.userType);
    const history = useHistory();

    useEffect(() => {

        const getProductById = async (id) => {
            const response = await axios.patch(url + '/api/products/' + id);
            setProduct(response.data)
            setUpateProduct(true);
        }

        if (userType && props.history) {
            const id = props.history.location.productId;
            getProductById(id);
        }

    }, [userType, props.history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));

        let formData = new FormData();
        for (const [key, value] of Object.entries(product)) {
            formData.append(key, value);
        }

        if (updateProduct) {
            formData.append('id', props.history.location.productId);
            formData.delete('_id');
            formData.delete('__v');
            formData.delete('impressions');

            try {
                await axios.put(url + `/api/products/updateProduct/byform`, formData, { headers: { Authorization: `Bearer ${token}` } });
                successToast(`Product has been updated successfully`);
                setTimeout(() => {
                    history.push({
                        pathname: `/admin`,
                        userType: { type: 'admin' },
                    });
                }, 2000);
            } catch (err) {
                errorToast(err.response.data.error)
            }
        }
        else {// create new product
            try {
                await axios.post(url + "/api/products", formData, { headers: { Authorization: `Bearer ${token}` } });
                setProduct(initProductState);
                successToast(`Product has been added successfully`);
            } catch (err) {
                errorToast(err.response.data)
            }
        }
    }


    return (
        <>
            {userType ?
                <div className="product-save">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={product.productName} required onChange={(e) => {
                                return setProduct({ ...product, productName: e.target.value })
                            }} />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Product type</Form.Label>
                            <Form.Control defaultValue={product.productType} as="select" required onChange={e => {
                                return setProduct({ ...product, productType: e.target.value })
                            }}>
                                <option value="earrings">earrings</option>
                                <option value="rings">ring</option>
                                <option value="necklaces">necklace</option>
                                <option value="bracelets">bracelet</option>
                                <option value="piercings">piercings</option>
                                <option value="macrame">macrame</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Amount" value={product.quantity} required onChange={e => {
                                return setProduct({ ...product, quantity: e.target.value })
                            }} />
                        </Form.Group>


                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Material</Form.Label>
                            <Form.Control as="select" defaultValue={product.material} required onChange={e => {
                                return setProduct({ ...product, material: e.target.value })
                            }}>
                                <option value="silver">silver</option>
                                <option value="pure brass">pure brass</option>
                                <option value="sterling silver">sterling silver</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Price" value={product.price} required onChange={e => {
                                return setProduct({ ...product, price: e.target.value })
                            }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={product.description} style={{ resize: 'none' }} as="textarea" rows={2} required onChange={e => {
                                return setProduct({ ...product, description: e.target.value })
                            }} />
                        </Form.Group>

                        <Form.Group>
                            {/* <Form.Label>Best seller</Form.Label> */}
                            <Form.Check type="checkbox" label="Best seller" value={product.bestSeller} onChange={e => {
                                return setProduct({ ...product, bestSeller: e.target.checked })
                            }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.File onChange={e => {
                                return setProduct({ ...product, image: e.target.files[0] })
                            }} />
                        </Form.Group>

                        <br />
                        <div>
                            <Button variant="primary" type="submit"> Submit</Button>
                        </div>
                    </Form>
                </div>
                : history.push("/404")}
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

export default SaveProduct;