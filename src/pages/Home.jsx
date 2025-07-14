import React, { useState, useEffect} from 'react';
import appwriteService from '../appwrite/config'
import Container from  '../components/container/Container'
import PostCard from '../components/PostCard'


const Home = () => {
    const [posts, setPosts ] = useState(null)

    useEffect(()=>{
        const allPost = appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
    console.log("post",posts, posts!=null )
     if(posts==null ){
      //need to add conditional if posts.length==0  
            return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                       <h1>Login to read posts</h1>
                    </div>
                </Container>
    
            </div>
         )

     }
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post)=>(
                          <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post}/>
                          </div>  
                        ))}
                    </div>
                </Container>
    
            </div>
    );
};

export default Home;