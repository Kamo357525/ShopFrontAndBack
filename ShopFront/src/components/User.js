import React from 'react';
import {connect} from "react-redux";
import BtnExit from "./BtnExit";
import PhotoUser from '../assets/img/us.webp';
import {useNavigate} from "react-router-dom";

function User({globalIsActive, globalUser}) {
    const navigate=useNavigate();

    if (globalIsActive) {
        return (
            <div className='userBlock'>
                <div onClick={()=>navigate("/profile")} className='goProfile'>
                    <img src={globalUser.imageProfile?globalUser.imageProfile:PhotoUser} alt=""/>
                    <h4>ID:{globalUser.id}</h4>
                </div>
                <BtnExit/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    globalIsActive: state.globalUser.globalIsActive,
    globalUser: state.globalUser.globalUser,
})

const mapDispatchToProps = {}

const Container = connect(mapStateToProps, mapDispatchToProps)(User);

export default Container;
