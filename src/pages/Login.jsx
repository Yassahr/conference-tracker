import React from 'react';
//using alias so Login function and login in comp can be differiatated
import LoginComponent from '../components/Login'

const Login = () => {
    return (
        <div className="py-8">
            <LoginComponent /> 
        </div>
    );
};

export default Login;