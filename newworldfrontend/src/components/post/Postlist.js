import React, { useContext, useEffect,  } from "react"
import { PostContext } from "./PostProvider"
import { Link } from "react-router-dom"


export const PostList = () => {
    const { Posts, getPosts } = useContext(PostContext)

    useEffect(() => {
        getPosts()
        console.log(`Posts`,Posts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (<>
        <section className="Section__Post">
        {
            Posts.map(Post => {
                return (
                    <ul className="Post" id={`Post--${Post.id}`} key={`${Post.id}`}>
                        <div className="Post__content">
                            <Link to={`/posts/${Post.id}`}>{Post.item?.itemName}
                            <div className="Post__settlement">Settlement:{Post.settlementId?.settlementName}</div>
                            <div className="Post__server">Server:{Post.posterId?.server.serverName}</div>
                            </Link>
                        </div>
                    </ul>

                )
            })
        }
        </section>
    </>)
}