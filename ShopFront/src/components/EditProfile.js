import React, {useEffect} from 'react';
import Form from "react-bootstrap/Form";
import UserImg from "../assets/img/us.webp";
import Button from "react-bootstrap/Button";
import {updateProfile} from "../store/actions/profileUpdate";
import {connect} from "react-redux";
import {useState} from "react";
import {Modal} from "react-bootstrap";

function EditProfile({globalUser, updateProfile, errorsUpdate, status}) {
    const [data, setData] = useState(globalUser);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setErrors(errorsUpdate);
        setTimeout(() => {
            return setErrors([])
        }, 3000)
    }, [errorsUpdate]);

    useEffect(()=>{
        if(status && errors.length===0){
            handleShow()
        }
    },[status])

    useEffect(() => {
        setErrors([]);
        handleClose();
    }, []);

    const handleFileChange = (ev) => {
        const files = [...ev.target.files].map((file) => {
            file._preview = URL.createObjectURL(file);
            return file;
        })
        setImages([...files]);
        ev.target.value = '';
    }

    const buttonSubmit = async (e) => {
        e.preventDefault();
        let info = {
            data,
            images,
        }
        updateProfile(info)
    }

    return (
        <div className='editProfile'>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention!</Modal.Title>
                </Modal.Header>
                <Modal.Body>User Changed</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form className='forms'>
                <h1>Edit Profile</h1>
                <ul>
                    {errors.length ? errors.map((item, i) => <li className='regFormError'
                                                                 key={i}>{item.message}</li>) : ""}
                </ul>
                <Form.Group className="mb-3" controlId="formFirstName"
                            onChange={(e) => setData({...data, 'firstName': e.target.value})}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control defaultValue={data.firstName} type="text" placeholder="Enter first name"/>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(e) => setData({...data, 'lastName': e.target.value})}
                            controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" defaultValue={data.lastName} placeholder="Enter last name"/>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(e) => setData({...data, 'email': e.target.value})}
                            controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control defaultValue={data.email} type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" onChange={(e) => setData({...data, 'password': e.target.value})}
                            controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <label className="filePicker">
                    <input multiple className='inpReg' type="file" accept="image/*" onChange={handleFileChange}/>
                    <span>Image Profile</span>
                    <img className='userRegInpPhoto'
                         src={images.length ? images[0]._preview : data.imageProfile ? data.imageProfile : UserImg}
                         alt=""/>
                </label><br/>
                <Button variant="primary" className='btnReg' onClick={(e) => buttonSubmit(e)} type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    errorsUpdate: state.profileUpdate.statusErrorsUpdate,
    status: state.profileUpdate.status,
    globalUser: state.globalUser.globalUser,
})

const mapDispatchToProps = {
    updateProfile,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(EditProfile);

export default Container;