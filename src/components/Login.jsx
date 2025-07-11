import React, {useState} from 'react' 
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import {useForm} from 'react-hook-form'
import {useDispatch} from "react-redux"
import {login as authLogin} from '../store/authSlice'

function Login() {
    const navigate = useNavigate()
//this is to manage the state of the error and init the error as none
    const [error, setError]= useState('')
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const login = async (data) =>{
        setError('')
        try{
            const session = await authService.login(data)

            if(session){
                const currentUserData = await authService.getCurrentUser()
                if(currentUserData){
                    dispatch(authLogin({currentUserData}))
                    navigate('/')
                }
            }

        }catch(err){
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
                Login
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have an account?&nbsp;
                <Link
                to="/signup"
                className="font-meduim text-primary transition-all duration-200 hover:underline"
                />
            </p>
            {error &&
             <p className="text-red-600 mt-8 text-center">
                {error}
            </p>}
            <form onSubmit={handleSubmit(login)} className="mt-8">
                <div className="space-y-5">
                    <Input
                        {...register("email", {required:true})}
                        label="Email : "
                        placeholder="Your email"
                        type="email"
                    />
                    <Input
                        {...register("password", {required:true})}
                        label="Password : "
                        placeholder="Password"
                        type="pasword"
                    />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </div>
            </form>
        </div>
      </div>
  )
}

export default Login