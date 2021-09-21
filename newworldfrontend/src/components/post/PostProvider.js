import React, { useState, createContext } from "react"


export const PostContext = createContext()


export const PostProvider = (props) => {
    const [Posts, setPosts] = useState([])
    const [ setPost] = useState({});

    const getPosts = () => {
        return fetch("http://localhost:8000/posts",{
            headers:{
                Authorization: `Token fa2eba9be8282d595c997ee5cd49f2ed31f65bed`,
            }
        })
        .then(res => res.json())
        .then(setPosts)
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
            Posts, getPosts, addPost, getPostbyId, deletePost,editPost,
        }}>
            {props.children}
        </PostContext.Provider>     
    )
}