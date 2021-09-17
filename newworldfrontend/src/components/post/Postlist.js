import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"

export const PostList = () => {
    const { Posts, getPosts } = useContext(PostContext)

    useEffect(() => {
        console.log("PostList: useEffect - getPosts")
        getPosts()
    }, [])

    return (
        <section className="Section__Post">
            {
                Posts.map(Post => {

                    return (
                        <ul className="Post" id={`Post--${Post.id}`} key={`${Post.id}`}>
                            <div className="Post__content">
                                <h2 className="Post__item">{Post.item.itemName} </h2>
                                <div className="Post__settlement">Settlement:{Post.settlementId.settlementName}</div>
                                <div className="Post__server">Server:{Post.posterId.server.serverName}</div>
                            </div>
                        </ul>
                    )
                })
            }
        </section>
    )
}