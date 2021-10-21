import React, { useState, createContext } from "react"


export const PostContext = createContext()


export const PostProvider = (props) => {
    const [Posts, setPosts] = useState([])
    const [ setPost] = useState({});
    const [PostsSold,setSoldPosts] = useState([])
    const getPosts = () => {
<<<<<<< HEAD:src/components/post/PostProvider.js
        return fetch("http://localhost:8000/posts?sold=False",{
            headers:{
                Authorization: `Token 0f612061fb08c2a36eb700afba263b08ded91e51`,
=======
        return fetch("https://newworldmarket-backend.herokuapp.com/posts?sold=False",{
            headers:{
                Authorization: `Token 368cd43fa8431c93af79a1c54dae0cac5e34ea36`,
>>>>>>> 57504da2618328ddf21fdcd0ca4f9046f89a6f05:src/components/post/PostProvider.js
            }
        })
        .then(res => res.json())
        .then(setPosts)
    }

    const getSoldPosts = () => {
<<<<<<< HEAD:src/components/post/PostProvider.js
        return fetch("http://localhost:8000/posts?sold=True",{
            headers:{
                Authorization: `Token 0f612061fb08c2a36eb700afba263b08ded91e51`,
=======
        return fetch("https://newworldmarket-backend.herokuapp.com/posts?sold=True",{
            headers:{
                Authorization: `Token 368cd43fa8431c93af79a1c54dae0cac5e34ea36`,
>>>>>>> 57504da2618328ddf21fdcd0ca4f9046f89a6f05:src/components/post/PostProvider.js
            }
        })
        .then(res => res.json())
        .then(setSoldPosts)
    }

    const getPostbyId = PostId => {
        return fetch(`https://newworldmarket-backend.herokuapp.com/posts/${PostId}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            }
        })
        .then(res => res.json())
        .then(setPost)
    }

    const addPost = PostObj => {
        return fetch("https://newworldmarket-backend.herokuapp.com/posts", {
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
        return fetch(`https://newworldmarket-backend.herokuapp.com/posts/${postid}`, {
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
        return fetch(`https://newworldmarket-backend.herokuapp.com/posts/${postid}`, {
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