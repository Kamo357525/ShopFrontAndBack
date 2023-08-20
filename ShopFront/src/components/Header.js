import React from 'react';
import {Link} from "react-router-dom";
import imgLogo from "../assets/img/logo.png";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import User from "../components/User";


function Header() {
    return (
        <div className='homeHeader'>
            <div className='logoBlock'>
                <Link to='/'>
                    <img src={imgLogo} alt=""/>
                </Link>
            </div>
            { !window.localStorage.getItem('Token')? (<div className='btnBlock'>
                <Link to={'/login'}><Button variant="success">Login</Button></Link>
                <Link to={'/registration'}><Button variant="warning">Registration</Button>{' '}</Link>
            </div>) : <User/>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    globalIsActive: state.globalUser.globalIsActive,
})

const mapDispatchToProps = {}

const Container = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Container;