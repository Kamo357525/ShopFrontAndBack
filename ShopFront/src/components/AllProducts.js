import React, {useState} from 'react';
import {getUserProducts} from "../store/actions/getUserProducts";
import {connect} from "react-redux";
import NoImg from '../assets/img/no-image-available-vector-hand-260nw-745639717.webp';
import Edit from '../assets/img/edit.jpeg';
import Delete from '../assets/img/tr.png';
import Pagination from 'react-bootstrap/Pagination';
import {useEffect} from "react";
import {Modal} from "react-bootstrap";
import EditProduct from "./EditProduct.js";
import Button from "react-bootstrap/Button";
import {deleteProduct} from "../store/actions/deleteProduct";
import {editProduct} from "../store/actions/editProduct";

function AllProducts({getUserProducts, deleteProduct, productList, count}) {
    const [active, setActive] = useState(0);
    const [prodId, setProdId] = useState('');
    const [editProd, setEditProd] = useState('');
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let items = [];

    for (let number = 1; number <= count; number++) {
        items.push(<Pagination.Item onClick={() => setActive(number - 1)} key={number} active={number === active + 1}>
            {number}
        </Pagination.Item>,);
    }

    useEffect(() => {
        getUserProducts({
            limit: 8,
            offset: active,
            Token: window.localStorage.getItem('Token')
        });
    }, [active]);


    const DeleteBtnModal = (id) => {
        deleteProduct({
            Token: window.localStorage.getItem('Token'),
            productId: id,
            limit: 8,
            offset: active,
        })
    }

    return (
        <div className='userProductsBlock'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="secondary" onClick={() => {
                        DeleteBtnModal(prodId);
                        handleClose();
                    }} id='deleteProdYes'>
                        Yes
                    </Button>
                    <Button variant="secondary" id='deleteProdNo' onClick={handleClose}>
                        No
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProduct editProd={editProd} active={active} setShowEdit={setShowEdit}/>

                </Modal.Body>
            </Modal>
            <div className='userProductsWrapper'>
                <h1>My Products</h1>
                <div className='paginationBlock'><Pagination>{items}</Pagination></div>
                <div className='userProducts'>
                    {productList ? productList.length ? productList.map((item, i) => (
                            <div className='userProductItems' key={i}>
                                <div className='editDeleteWrapper'>
                                    <div className='editDelete'>
                                        <img className='edit' src={Edit} alt="Edit"
                                             onClick={() => {
                                                 setEditProd(item);
                                                 setShowEdit(true);
                                             }}
                                        />
                                        <img className='delete' src={Delete} alt="Delete"
                                             onClick={() => {
                                                 handleShow();
                                                 setProdId(item.id);
                                             }
                                             }/>
                                    </div>
                                </div>
                                {item.Images.length ? <img src={item.Images[0].src} alt=""/> :
                                    <img src={NoImg} alt=""/>}
                                <div className='userProductInfo'>
                                    <h4>Name {item.name}</h4>
                                    <h4>Price {item.price}</h4>
                                    <h4> Color {item.color}
                                    </h4>
                                </div>
                            </div>
                        )
                    ) : <h1>No Products</h1> : <h1>Load...</h1>}

                </div>
                <div className='paginationBlock'><Pagination>{items}</Pagination></div>
            </div>

        </div>

    );
}

const mapStateToProps = (state) => ({
    productList: state.getUserProducts.userProductList,
    count: state.getUserProducts.count
})

const mapDispatchToProps = {
    getUserProducts,
    deleteProduct,
    editProduct,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllProducts);

export default Container;
