import conf from "../conf/conf.js";

import { Client, Databases, Storage, Query, ID } from "appwrite";


export class Service{
    client= new Client()
    database;
    bucket;

    consturctor(){
        this.setEndpoint(conf.appwriteURL) // Your API Endpoint
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        }catch(error){
            console.log("Appwrite service :: getPost()", error)
            return false
        }
    }
    async getPosts(queries=[Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        }catch(error){
            console.log("Appwrite service :: getPosts()", error)
            return false
        }
    }
    async createPost({conferenceName, topicName, eventDate, userId, content, status, multimedia }){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {conferenceName, topicName, eventDate, userId, content, status, multimedia })
        }catch(error){
            console.log("Appwrite service :: createPost()", error)
            return false
        }
    }
    async updatePost(slug, {topicName, userId, content, status, multimedia}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {topicName, userId, content, status, multimedia })
        }catch(error){
            console.log("Appwrite service :: updatePost()", error)
            return false
        }
    }
    async deletePost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
            )
            return true

        }catch(error){
            console.log("Appwrite service :: deletePost()", error)
            return false
        }

}
//storage service
async uploadFile(file){
    try{
        return await this.bucket.createFile(
            conf.appwriteBucketId, 
            ID.unique(), 
            file
          )
    }catch(error){
        console.log("Appwrite service :: uploadFile()", error)
        return false
    }
}
async deleteFile(fileId){
    try{
        return await this.bucket.deleteFile(
            conf.appwriteBucketId, 
            fileId
          )
    }catch(error){
        console.log("Appwrite service :: deleteFile()", error)
        return false
    }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    ).href
}

}

const service= new Service()
export default service;
