import React, {useEffect, useState} from 'react';
import NoImg from '../assets/img/no-image-available-vector-hand-260nw-745639717.webp';
import {getAllProducts} from "../store/actions/getAllProducts";
import {connect, useDispatch, useSelector, useStore} from "react-redux";
import Pagination from 'react-bootstrap/Pagination';
import ModalAllProducts from "../components/ModalAllProducts";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Search from '../assets/img/Vector_search_icon.svg.png';

function Home({count}) {
    let dispach=useDispatch()
    // console.log(useStore().getState())
    let productList=useSelector(store=>store.getAllProducts.productList)
    console.log(productList)

    const [active, setActive] = useState(0);
    const [prod, setProd] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let items = [];

    for (let number = 1; number <= count; number++) {
        items.push(<Pagination.Item onClick={() => setActive(number - 1)} key={number} active={number === active + 1}>
            {number}
        </Pagination.Item>,);
    }
    useEffect(() => {
        dispach(getAllProducts({limit: 12, offset: active}))
    }, [active]);


    return (
        <div className='home'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Info Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalAllProducts prod={prod}/>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
            <h1>All Products</h1>
            <div className='paginationBlock'><Pagination>{items}</Pagination></div>
            <div className='allProductsItem'>
                {productList.length ? productList.map((item, i) => (
                    <div key={i + item.price} id={item.id}
                         onClick={() => {
                             handleShow();
                             setProd(item)
                         }}
                         className='productItem'>
                        <img src={Search} className='searchIcon' alt=''/>
                        {item.Images.length ? <img src={item.Images[0].src} alt=""/> : <img src={NoImg} alt=""/>}
                        <h4>Name {item.name}</h4>
                        <h4>Price {item.price} $</h4>
                        <h4 style={{backgroundColor: item.color}}>Color {item.color} </h4>
                    </div>)) : <h1>There is no product</h1>}

            </div>
            <div className='paginationBlock'><Pagination>{items}</Pagination></div>
        </div>);
}

const mapStateToProps = (state) => ({
    productList: state.getAllProducts.productList,
    count: state.getAllProducts.count,

})

const mapDispatchToProps = {
    // getAllProducts,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Container;