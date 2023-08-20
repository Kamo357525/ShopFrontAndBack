import Home from "./pages/Home";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {Container as Wrapper } from 'react-bootstrap';
import Header from "./components/Header";
import Profile from "./pages/Profile";
import {useEffect} from "react";
import {getUserFromToken} from './store/actions/getUserFromToken';
import {connect} from "react-redux";
import {io} from 'socket.io-client'

function App({getUserFromToken}) {

    useEffect(()=>{
        const Token=window.localStorage.getItem('Token');
        if(Token){
            getUserFromToken(Token)
        }
        const socket = io('http//localhost:8000');
        socket.on('connect', ()=>{
            console.log('laall')
        })
    },[])

    return (
        <div className="App">
            <Wrapper>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="profile" element={<Profile/>} />
                        <Route path="*" element={<Navigate to={"/"} replace />} />
                    </Routes>
                </BrowserRouter>
            </Wrapper>
        </div>
    );
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    getUserFromToken,
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container;

