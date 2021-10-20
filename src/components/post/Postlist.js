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
                                Itemrarity = "https://newworldfans.com/packs/media/db_images/backgrounds/rare-327ddaed1306ba9899fb560440bce57f.png";
                                break;
                            case "epic":
                                Itemrarity = "https://newworldfans.com/packs/media/db_images/backgrounds/epic-6b4f59e4c20cf8f1d50a743b21db23bb.png";
                                break;
                            case "common":
                                Itemrarity = "https://newworldfans.com/packs/media/db_images/backgrounds/common-6a449e0e4259ec225fd34e2ee2d7ce16.png";
                                break;
                            case "uncommon":
                                Itemrarity = "https://newworldfans.com/packs/media/db_images/backgrounds/uncommon-d0273c085c8d5bbde02bdf7932422275.png";
                                break;
                            case "legendary":
                                Itemrarity = "https://newworldfans.com/packs/media/db_images/backgrounds/legendary-68889726f115945dceeea08d37c85672.png";
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