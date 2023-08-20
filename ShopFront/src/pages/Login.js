import React, {useEffect, useMemo, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from 'react-router-dom';
import {getUser} from '../store/actions/getUser'
import {connect} from "react-redux";

function Login({getUser, statusErrorsLogin, globalIsActive}) {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setErrors(statusErrorsLogin);
        setTimeout(() => {
            return setErrors([])
        }, 3000)
    }, [statusErrorsLogin]);

    useEffect(() => {
        setErrors([])
    }, []);

    useEffect(() => {
        if (globalIsActive) {
            navigate('/profile');
        }
    }, [globalIsActive])

    const buttonSubmit = (e) => {
        e.preventDefault();
        getUser(data)
    }

    if (!globalIsActive) {
        return (
            <Form className='forms'>
                <h1>Login</h1>
                <ul>
                    {errors.length ? errors.map(
                        (item, i) => <li className='regFormError' key={i}>{item.message}</li>) : ""}
                </ul>
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
                <Button variant="primary" onClick={(e) => buttonSubmit(e)} type="submit">
                    Login
                </Button>
            </Form>
        );

    }
}

const mapStateToProps = (state) => ({
    globalIsActive: state.globalUser.globalIsActive,
    statusErrorsLogin: state.getUser.statusErrorsLogin,
})

const mapDispatchToProps = {
    getUser,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Container;




