import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from 'react-router-dom';
import {registrationUser} from '../store/actions/registrationUser'
import {connect} from "react-redux";
import UserImg from '../assets/img/us.webp';

function Registration({registrationUser, statusErrors, globalIsActive}) {
    const [data, setData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
    });
    const [images, setImages] = useState([]);
    const [errors, setErrors]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        setErrors(statusErrors);
        setTimeout(()=>{
            return setErrors([])
        },3000)
    },[statusErrors]);

    useEffect(() => {
        setErrors([])
    }, []);

    const handleFileChange = (ev) => {
        const files = [...ev.target.files].map((file) => {
            file._preview = URL.createObjectURL(file);
            return file;
        })
        setImages([...files]);
        ev.target.value = '';
    }

    const buttonSubmit = (e) => {
        e.preventDefault();
        let info = {
            data,
            images,
        }
        registrationUser(info)
    }

    useEffect(() => {
        if (globalIsActive) {
            navigate('/profile');
        }
    }, [globalIsActive])

    if (!globalIsActive) {
        return (
            <Form className='forms'>
                <h1>Registration</h1>
                <ul>
                    {errors.length ? errors.map((item, i) => <li className='regFormError' key={i}>{item.message}</li>) : ""}
                </ul>
                <Form.Group className="mb-3" controlId="formFirstName"
                            onChange={(e) => setData({...data, 'firstName': e.target.value})}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name"/>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(e) => setData({...data, 'lastName': e.target.value})}
                            controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name"/>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(e) => setData({...data, 'email': e.target.value})}
                            controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
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
                    <img className='userRegInpPhoto' src={images.length ? images[0]._preview : UserImg} alt=""/>
                </label><br/>
                <Button variant="primary" className='btnReg' onClick={(e) => buttonSubmit(e)} type="submit">
                    Registration
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    statusErrors: state.userRegistration.statusErrors,
    globalIsActive: state.globalUser.globalIsActive,
})

const mapDispatchToProps = {
    registrationUser,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default Container;
