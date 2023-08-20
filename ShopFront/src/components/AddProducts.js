import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import ProdImg from "../assets/img/prod.webp";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {createProduct} from "../store/actions/createProduct";
import {colorList} from '../assets/colorList'
import {Modal} from "react-bootstrap";

function AddProducts({createProduct, globalUser, status, statusErrors}) {
    const [images, setImages] = useState([]);
    const [data, setData] = useState({
        name: '',
        price: '',
        color: 'White'
    });
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setErrors(statusErrors);
        setTimeout(() => {
            return setErrors([])
        }, 3000)
    }, [statusErrors]);

    useEffect(() => {
        if (status && errors.length === 0) {
            handleShow();
            setData({
                name: '',
                price: '',
                color: 'White'
            },)
            setImages([])
        }
    }, [status])

    useEffect(() => {
        setErrors([]);
        handleClose();
    }, []);


    const handleData = (e, val) => {
        if (val === 'price') {
            if (+e.target.value < 0 || typeof !(+e.target.value) === "number" || isNaN(+e.target.value)) {
                return null
            }
            return setData({...data, [val]: e.target.value})
        }
        setData({...data, [val]: e.target.value})
    }

    const handleFileChange = (ev) => {
        const files = [...ev.target.files].map((file) => {
            file._preview = URL.createObjectURL(file);
            return file;
        })
        setImages([...images, ...files]);
        ev.target.value = '';
    }

    const buttonSubmit = (e) => {
        e.preventDefault();
        data.Token = globalUser.Token
        let info = {
            data,
            images,
        }
        createProduct(info)
    }

    return (
        <div className='formCreateProduct'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product Added</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form className='forms'>
                <h1>Create Product</h1>
                <ul>
                    {errors.length ? errors.map((item, i) => <li className='regFormError'
                                                                 key={i}>{item.message}</li>) : ""}
                </ul>
                <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="text" value={data.name} onChange={(e) => handleData(e, 'name')}
                                  placeholder="Enter Product Name"/>
                </Form.Group>
                <Form.Label>Color</Form.Label>
                < Form.Control
                    as="select"
                    style={{backgroundColor: data.color}}
                    onChange={(e) => handleData(e, 'color')}>
                    {colorList.map((item, i) =>
                        (<option value={item} style={{backgroundColor: item}}
                                 key={i + item}>{item}</option>)
                    )}
                </Form.Control><br/>

                <Form.Group className="mb-3"
                            controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        onChange={(e) => handleData(e, 'price')}
                        type="text" value={data.price} placeholder="Enter Product Price"/>
                </Form.Group>
                <label className="filePicker">
                    <input multiple className='inpReg' type="file" accept="image/*" onChange={handleFileChange}/>
                    <span>Image Product</span>
                    <img className='userRegInpPhoto' src={ProdImg} alt=""/>
                </label><br/>
            </Form>
            {images.length ? <div className="addProduct">
                {images.map(image => (
                    <img width={150} key={image._preview} src={image._preview} alt=""/>
                ))}
            </div> : null}
            <Button variant="primary" className='btnReg' onClick={(e) => buttonSubmit(e)} type="submit">
                Create Product
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    globalUser: state.globalUser.globalUser,
    statusErrors: state.createProduct.statusErrors,
    status: state.createProduct.status,
})

const mapDispatchToProps = {
    createProduct,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AddProducts);

export default Container;
