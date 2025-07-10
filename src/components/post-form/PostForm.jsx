import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteService from "../../appwrite/config"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//**interdependence on the useForm, handleSubmit, and onSubmit attribute on form com
export default function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control,  getValues}= useForm({
        defaultValues:{
            title: post?.title|| "",
            slug: post?.slug|| "",
            content: slug?.content|| "",
            active: post?.content|| "active"
        }
    })
    const navigate = useNavigate()
    //useSelector gives you information about user state
    const userData = useSelector((state)=> state.auth.userData)
     const submit= async(data)=> {
        if(post){
            const file = data.image? await appwriteService.uploadFile(data.image[0]):null

            if(file){
                await appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file){
                const fileId= file.$id
                data.featuredImage = fileId
                const dbpost= await appwriteService.createPost({...data, userID: userData.$id})

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
     }
    
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
//watch simply returns values-> on submit actually store then  and saves slug
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
            <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            //register is giving the values to the input
            {...register("slug", {required:true})}
            onInput= {(e)=>{
                setValue("slug", transformSlug(e.currentTarget.value), {shouldValidate: true})

            }}
            //this is actually takes values into form 
            />
            <RTE 
            label="Content: "
            name="content"
            control={control}
            dafaultValue={getValues("content")}/>


        </div>
        <div classname="1/3 px-2">
            <Input 
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="images/png, image/jpeg, image/jpg"
            {...register("image", {required: !post})}
            />
            {post && (
                <div className="w-full mb-4">
                    <img src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"/>
                </div>
            )}
            <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", {required: true})}/>
            <Button 
            type="submit"
            bgColor={post? "bg-green-500": undefined}
            className="w-full">
                {post ? "Update": "Submit"}
            </Button>
        </div>
    </form>
)

}