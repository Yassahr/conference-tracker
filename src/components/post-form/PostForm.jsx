import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteService from "../../appwrite/config"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control,  getValues}= useForm({
        defaultValues:{
            title: post?.title|| "",
            slug: post?.slug|| "",
            content: slug?.content|| "",
            active: post?.content|| "active",

            


        }
    })
    const navigate = useNavigate()
    //useSelector gives you information about user state
    const userData = useSelector((state)=> state.auth.userData)
     const submit= async(data)=> {}
    
     const transformSlug = useCallback((value)=>{
        if(value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
    //dependency array 
     },[])

     React.useEffect(()=>{
//value inside of watch is all of the values that are inside of the form
//somehow react just knows that this watch is for the useForm(hover over values to see all the associated props)
        watch((value, {name})=>{
            if(name==="title"){
                setValue("slug", transformSlug(value, title))
            }
        })
     }, [watch, transformSlug, setValue])

return(
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
            label="Title"
            placeholder="Title"
            className="mb-4"
            {...register("title")}/>

        </div>

    </form>
)

}