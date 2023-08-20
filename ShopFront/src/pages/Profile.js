import React, {useEffect,  useState} from 'react';
import UserPhoto from '../assets/img/us.webp'
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import AllProducts from "../components/AllProducts";
import EditProfile from "../components/EditProfile";
import AddProducts from "../components/AddProducts";

function Profile({globalUser}) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('AllProducts')

    useEffect(() => {
        if (!window.localStorage.getItem('Token')) {
            navigate('/')
        }
    }, [])

    if (window.localStorage.getItem('Token')) {
        return (<div className='profileBlock'>
            <div className='leftBlock'>
                <div className='userInfoBlock'>
                    <img src={globalUser.imageProfile ? globalUser.imageProfile : UserPhoto} alt=""/>
                    <div className='userInfo'>
                        <div className='infoUserItem'><h2>ID </h2><h1>{globalUser.id}</h1></div>
                        <div className='infoUserItem'><h2>First name </h2><h1>{globalUser.firstName}</h1></div>
                        <div className='infoUserItem'><h2>Last name </h2><h1>{globalUser.lastName}</h1></div>

                        <div className='infoUserItem'><h2>Email </h2><h1>{globalUser.email}</h1></div>
                    </div>
                </div>
                <div className='nav_list'>
                    <div className='infoUserItem'><h2 onClick={() => setActivePage("AllProducts")}>All Products</h2>
                    </div>
                    <div className='infoUserItem'><h2 onClick={() => setActivePage("AddProducts")}>Add Products</h2>
                    </div>
                    <div className='infoUserItem'><h2 onClick={() => setActivePage("EditProfile")}>Edit Profile</h2>
                    </div>
                </div>
            </div>
            <div className='rightBlock'>
                {activePage === 'AllProducts' ? <AllProducts/> : ""}
                {activePage === 'AddProducts' ? <AddProducts/> : ""}
                {activePage === 'EditProfile' ? <EditProfile/> : ""}
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    globalUser: state.globalUser.globalUser,
})

const mapDispatchToProps = {}

const Container = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Container;