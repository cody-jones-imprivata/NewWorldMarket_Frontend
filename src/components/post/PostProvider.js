import React, { useState, createContext } from "react"


export const PostContext = createContext()


export const PostProvider = (props) => {
    const [Posts, setPosts] = useState([])
    const [ setPost] = useState({});
    const [PostsSold,setSoldPosts] = useState([])
    const getPosts = () => {
        return fetch("http://localhost:8000/posts?sold=False",{
            headers:{
                Authorization: `Token 1`,
            }
        })
        .then(res => res.json())
        .then(setPosts)
    }

    const getSoldPosts = () => {
        return fetch("http://localhost:8000/posts?sold=True",{
            headers:{
                Authorization: `Token 1`,
            }
        })
        .then(res => res.json())
        .then(setSoldPosts)
    }

    const getPostbyId = PostId => {
        return fetch(`http://localhost:8000/posts/${PostId}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            }
        })
        .then(res => res.json())
        .then(setPost)
    }

    const addPost = PostObj => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(PostObj)
        })
        .then(getPosts)
    }

    const editPost =(PostObj,postid) => {
        return fetch(`http://localhost:8000/posts/${postid}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(PostObj)
        })
        .then(getPosts)
    }

    const deletePost = postid => {
        return fetch(`http://localhost:8000/posts/${postid}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            },
        })
        .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            Posts, getPosts, addPost, getPostbyId, deletePost,editPost,PostsSold,getSoldPosts
        }}>
            {props.children}
        </PostContext.Provider>     
    )
}