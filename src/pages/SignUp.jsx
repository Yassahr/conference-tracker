import React from 'react';
//using alias so Login function and login in comp can be differiatated
import  SignupComponent from '../components/SignUp'

const Signup = () => {
    return (
        <div className="py-8">
            <SignupComponent /> 
        </div>
    );
};

export default Signup;