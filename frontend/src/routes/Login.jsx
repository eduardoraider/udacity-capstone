import { React, useEffect } from "react"
import star from '../assets/stars.svg'
import './Login.css'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <div className='login-container'>
            <div className='left-panel'>
                <img src={star} />
                <h1>Stars Casting Agency</h1>
                <button className='btn btn-login' onClick={() => loginWithRedirect()}>Log In</button>
            </div>
            <div className='right-panel'></div>
        </div>
    )

}

export default Login