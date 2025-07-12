import {useNavigate, useParams} from 'react-router-dom'
import appwriteService from '../appwrite/config'
import React, {useEffect, useState} from 'react';
import Container from  '../components/container/Container'
import PostForm from  '../components/post-form/postForm'



function EditPosts(){
    const navigate = useNavigate()
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    useEffect((()=>{
        if(slug){
            appwriteService.getPost(slug).then(post=>{
                if(post){
                    setPost(post)
                }else{
                    navigate('/')

                }
            })
        }
    }), [slug, navigate])
    return (
        <div className="py-6">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    );
};

export default EditPosts;