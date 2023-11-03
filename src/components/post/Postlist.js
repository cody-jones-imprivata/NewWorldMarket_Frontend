import React, { useContext, useEffect, } from "react"
import { PostContext } from "./PostProvider"
import { Link } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { Posts, getPosts } = useContext(PostContext)

    useEffect(() => {
        getPosts()
        console.log(`Posts`, Posts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <section className="Section__Post">
                {
                    Posts.map(Post => {
                        let Itemrarity;
                        switch (Post.item?.rarity) {
                            case "rare":
                                Itemrarity = "https://cdn.nwdb.info/static/images/tooltip_header_bg_2.jpg";
                                break;
                            case "epic":
                                Itemrarity = "https://cdn.nwdb.info/static/images/tooltip_header_bg_3.jpg";
                                break;
                            case "common":
                                Itemrarity = "https://cdn.nwdb.info/static/images/tooltip_header_bg_5.jpg";
                                break;
                            case "uncommon":
                                Itemrarity = "https://cdn.nwdb.info/static/images/tooltip_header_bg_1.jpg";
                                break;
                            case "legendary":
                                Itemrarity = "https://cdn.nwdb.info/static/images/tooltip_header_bg_4.jpg";
                                break;
                            default:
                                Itemrarity = "";
                                break;
                        }
                        const itemRaritybackground = {
                            backgroundImage: 'url(' + Itemrarity + ')',
                            backgroundRepeat: 'no-repeat',
                            borderStyle:'solid',
                            borderColor:'black',
                        };
                        
                        return (<>
                            <div className="Post" id={`Post--${Post.id}`} key={`${Post.id}`}>
                                <div className="Post_image"><Link to={`/posts/${Post.id}`}><div style={itemRaritybackground} className="Post_image_background">
                                <img className="Post_item_image" src={Post.item?.image} alt="...Loading" /></div></Link></div>
                                <div className="post_td"><Link className="Post_Item" to={`/posts/${Post.id}`}>{Post.item?.itemName}</Link></div>
                                <div className="post_td"><Link className="Post_Item" to={`/posts/${Post.id}`}>{Post.settlementId?.settlementName}</Link></div>
                                <div className="post_td"><Link className="Post_Item" to={`/posts/${Post.id}`}>{Post.posterId?.server.serverName}</Link></div>
                            </div>
                        </>)
                    })
                }
        </section>
    </>)
}