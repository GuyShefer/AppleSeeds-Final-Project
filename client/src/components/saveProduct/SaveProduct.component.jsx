import React, { useEffect, useState } from 'react';
import './saveProduct.style.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import url from '../../utilities/serverURL';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const SaveProduct = (props) => {
    const initProductState = { productName: '', productType: 'earrings', bestSeller: false, quantity: 0, price: 0, image: '', material: 'silver', description : '' };
    const [product, setProudct] = useState(initProductState);
    const [updateProduct, setUpateProduct] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const getProductById = async (id) => {
            const response = await axios.patch(url + '/api/products/' + id);
            setProudct(response.data)
            setUpateProduct(true);
        }

        if (props.history) {
            const id = props.history.location.productId;
            getProductById(id);
        }

    }, [props.history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));
        let formData = new FormData();
        for (const [key, value] of Object.entries(product)) {
            formData.append(key, value);
        }

        if (updateProduct) {
            formData.append('id', props.history.location.productId);
            try {
                const response = await axios.put(url + `/api/products/updateProduct/byform`, formData, { headers: { Authorization: `Bearer ${token}` } });
                console.log(response);
                history.push({
                    pathname: `/admin`,
                    userType: { type: 'admin' },
                });
            } catch (err) {
                console.log(err);
            }
        } 
        // create new product
        else { 
            try {
                const response = await axios.post(url + "/api/products", formData, { headers: { Authorization: `Bearer ${token}` } });
                console.log(response);
                setProudct(initProductState);
            } catch (err) {
                console.log(err.response.data);
            }
        }
    }


    return (
        <>
            {console.log(product)}
            <div className="product-save">
                <Form onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={product.productName} required onChange={(e) => {
                            setProudct({
                                productName: e.target.value,
                                productType: product.productType,
                                bestSeller: product.bestSeller,
                                quantity: product.quantity,
                                price: product.price,
                                description: product.description,
                                image: product.image,
                                material: product.material
                            })
                        }} />
                        {/* <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Product type</Form.Label>
                        <Form.Control defaultValue={product.productType} as="select" required onChange={e => {
                            setProudct({
                                productName: product.productName,
                                productType: e.target.value,
                                bestSeller: product.bestSeller,
                                quantity: product.quantity,
                                description: product.description,
                                price: product.price,
                                image: product.image,
                                material: product.material
                            })
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
                            setProudct({
                                productName: product.productName,
                                productType: product.productType,
                                bestSeller: product.bestSeller,
                                quantity: e.target.value,
                                price: product.price,
                                description: product.description,
                                image: product.image,
                                material: product.material
                            })
                        }} />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>


                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Material</Form.Label>
                        <Form.Control as="select" defaultValue={product.material} required onChange={e => {
                            setProudct({
                                productName: product.productName,
                                productType: product.productType,
                                bestSeller: product.bestSeller,
                                quantity: product.quantity,
                                price: product.price,
                                description: product.description,
                                image: product.image,
                                material: e.target.value
                            })
                        }}>
                            <option value="silver">silver</option>
                            <option value="pure brass">pure brass</option>
                            <option value="sterling silver">sterling silver</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" min="0" placeholder="Price" value={product.price} required onChange={e => {
                            setProudct({
                                productName: product.productName,
                                productType: product.productType,
                                bestSeller: product.bestSeller,
                                quantity: product.quantity,
                                price: e.target.value,
                                description: product.description,
                                image: product.image,
                                material: product.material
                            })
                        }} />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={product.description} style={{resize: 'none'}} as="textarea" rows={2} onChange={e => {
                            setProudct({
                                productName: product.productName,
                                productType: product.productType,
                                bestSeller: product.bestSeller,
                                quantity: product.quantity,
                                price: product.price,
                                description: e.target.value,
                                image: product.image,
                                material: product.material
                            })
                        }} />
                    </Form.Group>

                    <Form.Group>
                        {/* <Form.Label>Best seller</Form.Label> */}
                        <Form.Check type="checkbox" label="Best seller" value={product.bestSeller} onChange={e => {
                            setProudct({
                                productName: product.productName,
                                productType: product.productType,
                                bestSeller: e.target.checked,
                                quantity: product.quantity,
                                price: product.price,
                                description: product.description,
                                image: product.image,
                                material: product.material
                            })
                        }} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.File onChange={e => {
                            setProudct({
                                productName: product.productName,
                                productType: product.productType,
                                bestSeller: product.bestSeller,
                                quantity: product.quantity,
                                price: product.price,
                                description: product.description,
                                image: e.target.files[0],
                                material: product.material
                            })
                        }} />
                    </Form.Group>

                    <br />
                    <div>
                        <Button variant="primary" type="submit"> Submit</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default SaveProduct;