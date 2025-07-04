import React from 'react'
import {Link} from "react-router-dom"
import appWriteService from "../appwrite/config.js"

function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div
        className="w-full bg-gray-100 rounded-xl p-4"
        >
         <img src={appWriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-xl"/>   
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
    </Link>

  )
}

export default PostCard