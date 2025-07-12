import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser'
import {Link, useNavigate, useParams} from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Button from  '../components/Button'
import Container from  '../components/container/Container'
import { useSelector } from 'react-redux'



const Post = () => {
    const [post, setPost]= useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()
    //redux to get current user is
    const userData = useSelector((state)=> state.auth.userData)
    //if both the post and userData exists, then check if the auth is the same as current user
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() =>{
        if(slug){
            appwriteService.getPost(slug).then((postR)=>{
                if(postR){
                    setPost(postR)
                }else{
                    navigate('/')
                }
            })
        }

    }, [slug, navigate])

    const deletePost =() =>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        })

    }
    //replace the null with how not found pages should display
    return post? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative board rounded-xl p-2">
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='round-xl'/>
                    {isAuthor && 
                    <div className="absolute-right-6 top-6"> 
                    <Link to={`/edit-post/$${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>
                    </Link>
                    <Button onClick={deletePost} bgColor="bg-red-500" className="mr-3">
                            Delete
                        </Button>
                    </div>}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1> 
                    <div className="browser-css"> {parse(post.content)}</div>
                </div>
            </Container>
        </div>
        
    ) : null
};

export default Post;