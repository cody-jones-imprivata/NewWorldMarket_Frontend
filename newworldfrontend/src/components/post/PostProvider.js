import React, { useState, createContext } from "react"


export const PostContext = createContext()


export const PostProvider = (props) => {
    const [Posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts",{
            headers:{
                Authorization: `Token ${localStorage.getItem("newworld_token")}`
            }
        })
        .then(res => res.json())
        .then(setPosts)
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

    return (
        <PostContext.Provider value={{
            Posts, getPosts, addPost
        }}>
            {props.children}
        </PostContext.Provider>     
    )
}