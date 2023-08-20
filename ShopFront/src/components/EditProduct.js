import React, {useEffect, useMemo, useState} from 'react';
import NoImg from '../assets/img/no-image-available-vector-hand-260nw-745639717.webp'
import Delete from "../assets/img/tr.png";
import ProdImg from '../assets/img/54194038.webp'
import Form from "react-bootstrap/Form";
import {colorList} from "../assets/colorList";
import Button from "react-bootstrap/Button";
import {editProduct} from "../store/actions/editProduct";
import {connect} from "react-redux";

function EditProduct({editProd, active, editProduct, setShowEdit, errorsUpdate, status}) {
    const [prodDataInp, setProdDataInp] = useState({
        name: editProd.name,
        color: editProd.color,
        price: editProd.price
    })
    const [deleteImgId, setDeleteImgId] = useState([]);
    const [images, setImages] = useState([]);
    let filterImages = editProd.Images.length ? editProd.Images.filter((item, i) => !deleteImgId.includes(item.id)) : [];
    const [activeImg, setActiveImg] = useState(filterImages.length ? filterImages[0].src : NoImg);
    const [errors, setErrors] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        filterImages.length ? setActiveImg(filterImages[0].src) : images.length ? setActiveImg(images[0]._preview) : setActiveImg(NoImg)
    }, [deleteImgId, images]);

    useEffect(() => {
        setErrors(errorsUpdate);
        setTimeout(() => {
            return setErrors([])
        }, 3000)
    }, [errorsUpdate]);

    useEffect(() => {
        if (status && errors.length === 0) {
            if (modalIsOpen) {
                setShowEdit(false);
                return setModalIsOpen(false)
            }
        }
    }, [status])

    useEffect(() => {
        setModalIsOpen(false)
        setErrors([]);
        return setErrors([])
    }, []);

    const handleFileChange = (ev) => {
        const files = [...ev.target.files].map((file) => {
            file._preview = URL.createObjectURL(file);
            return file;
        })
        setImages([...images, ...files]);
        ev.target.value = '';
    }

    const handleData = (e, val) => {
        if (val === 'price') {
            if (+e.target.value < 0 || typeof !(+e.target.value) === "number" || isNaN(+e.target.value)) {
                return null
            }
            return setProdDataInp({...prodDataInp, [val]: e.target.value})
        }
        setProdDataInp({...prodDataInp, [val]: e.target.value})
    }

    const handlerClose = (e) => {
        e.preventDefault();
        setShowEdit(false);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setModalIsOpen(true)
        editProduct({
            limit: 8,
            offset: active,
            Token: window.localStorage.getItem('Token'),
            prodId: editProd.id,
            images,
            ...prodDataInp,
            deleteImgId: JSON.stringify(deleteImgId)
        })
    }

    return (
        <Form className='formsEditProd'>
            <div className='editProd'>
                <div className='editProfActiveImg'>
                    <img src={activeImg} alt=""/>
                </div>
                <label className="filePicker">
                    <input multiple className='inpReg' type="file" accept="image/*" onChange={handleFileChange}/>
                    <h1>Image Product</h1>
                    <img className='userRegInpPhoto' src={ProdImg} alt=""/>
                </label>
                <div className='editProfImgList'>
                    {images.length ?
                        images.map((image, i) => (
                            <div className='deletePhoto addPhoto' key={i}>
                                <img width={150} key={image._preview} onClick={() => setActiveImg(image._preview)}
                                     src={image._preview} alt=""/>
                                <img className='delete' src={Delete} alt="Delete"
                                     onClick={(e) => {
                                         setImages(images.filter((item, i) => item._preview !== image._preview))
                                     }}
                                />
                            </div>
                        ))
                        : null}
                    {filterImages.length ? filterImages.map((item, i) => (
                        <div className='deletePhoto' key={i}>
                            <img className='delete' src={Delete} alt="Delete"
                                 onClick={() => setDeleteImgId([...deleteImgId, item.id])}/>
                            <img src={item.src} onClick={() => setActiveImg(item.src)} alt=""/>
                        </div>

                    )) : null}
                </div>
            </div>
            <Form.Group className="mb-3" controlId="formProductName">
                <ul>
                    {errors.length ? errors.map((item, i) => <li className='regFormError'
                                                                 key={i}>{item.message}</li>) : ""}
                </ul>
                <Form.Label>Product name</Form.Label>
                <Form.Control type="text" value={prodDataInp.name} onChange={(e) => handleData(e, 'name')}
                              placeholder="Enter Product Name"/>
            </Form.Group>
            <Form.Label>Color</Form.Label>
            < Form.Control
                as="select"
                defaultValue={prodDataInp.color}
                style={{backgroundColor: prodDataInp.color}}
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
                    type="text" value={prodDataInp.price} placeholder="Enter Product Price"/>
            </Form.Group>
            <div className="btns">
                <Button variant="primary" className='btnEdit'
                        onClick={handleEdit}
                        type="submit">
                    Edit
                </Button>
                <Button variant="primary" className='cancel'
                        onClick={handlerClose}
                        type="submit">
                    Cancel
                </Button>
            </div>
        </Form>
    );
}

const mapStateToProps = (state) => ({
    errorsUpdate: state.editProduct.statusErrors,
    status: state.editProduct.status
})

const mapDispatchToProps = {
    editProduct
}

const Container = connect(mapStateToProps, mapDispatchToProps)(EditProduct);

export default Container;
