import React from 'react';
import {globalSetUser} from "../store/actions/globalSetUser";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

function BtnExit({globalSetUser}) {
    const navigate=useNavigate()
    const handleButtonExit=()=>{
        globalSetUser(false, {});
        window.localStorage.removeItem('Token')
        navigate('/')
    }
    return (
        <button onClick={handleButtonExit} type="button" className="btn btn-dark">EXIT</button>
    );
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    globalSetUser,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(BtnExit);

export default Container;