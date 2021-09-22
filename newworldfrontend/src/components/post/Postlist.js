import React, { useContext, useEffect, } from "react"
import { PostContext } from "./PostProvider"
import { Link } from "react-router-dom"


export const PostList = () => {
    const { Posts, getPosts } = useContext(PostContext)

    useEffect(() => {
        getPosts()
        console.log(`Posts`, Posts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (<>
        <section className="Section__Post">
            <table>
                <tr>
                    <th>Item</th>
                    <th>Settlement</th>
                    <th>Server</th>
                </tr>
                {
                    Posts.map(Post => {
                        return (<>
                            <tr className="Post" id={`Post--${Post.id}`} key={`${Post.id}`}>
                                <td className="Post_Item"><Link to={`/posts/${Post.id}`}>{Post.item?.itemName}</Link></td>
                                <td className="Post_Settlement"><Link to={`/posts/${Post.id}`}>{Post.settlementId?.settlementName}</Link></td>
                                <td className="Post_Server"><Link to={`/posts/${Post.id}`}>{Post.posterId?.server.serverName}</Link></td>
                            </tr>
                        </>)
                    })
                }
            </table>
        </section>
    </>)
}