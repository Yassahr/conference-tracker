import React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


//this is for auth, to make sure you are logged in to the correct place to login into a page
//checking if the user is logged in usinf store to check the state
function Protected ({children, authentication = true}){
    const authStatus = useSelector((state =>{
         return state.auth.status
    }))

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        //if auth is need but your authStatus(if you are logged in) is false
        if(authentication && authStatus !== authentication){
            navigate("/login")
        //if auth is not needed but the user is logged in=> go to home page
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, authentication, navigate ])

//replace null with the loader
    return loader ? null : <>{children}</>
};

export default Protected;