import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useParams, useHistory, Redirect } from "react-router"
import { EditPost } from "./EditPost"
import { Messagelist } from "../messages/MessageList"
// import "./IndividualPost.css"

export const IndividualPost = () => {
    const History = useHistory()
    const { PostId } = useParams();
    const { getPostbyId, deletePost } = useContext(PostContext)
    const [Post, setPost] = useState({});
    useEffect(() => {
        getPostbyId(PostId).then(setPost)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const timeConverter = (timestamp) => {
        var date = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }

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
        width: 'fit-content',
    };
    const itemImage = {
        filter: 'drop-shadow(1px 1px 5px white) brightness(1.5)',
    };

    const deletepost = (id) => {
        if (Post.isMine === true) {
            return (<>
                <div className="Post_Delete_Sold"><img className="Post_Delete" onClick={() => deletePost(id).then(setTimeout(() => { History.push("/Posts") }, 100))} src="https://img.icons8.com/ios-glyphs/30/ffffff/trash--v1.png" alt="loading..." />
                    <button className="Post_Sold" onClick={() => deletePost(id).then(setTimeout(() => { History.push("/Posts") }, 100))}>Sold</button></div></>)
        } else { return (<div />) }
    }

    return (<>
    <div className="Ind_Post">
    <h2 className="Post__item"> {Post.item?.itemName} </h2>
        <section className="Section__Post">
            <div className="item__background" style={itemRaritybackground}>
                <img style={itemImage} className="Item__Image" src={Post.item?.image} alt="Loading..." />
            </div>
            <div className="Post_Messages">
                <Messagelist isMine={Post.isMine} postuser={Post.posterId?.user.id} postid={PostId} />
            </div>
        </section>
        <section className="Section__Post">
        <ul className="Post__content">
            <EditPost isMine={Post.isMine} postid={Post.id} />
            <li className="Post__content">Seller: {Post.posterId?.user.username} </li>
            <li className="Post__content">Type: {Post.item?.type} </li>
            <li className="Post__content">Rarity: {Post.item?.rarity} </li>
            <li className="Post__content">Description: {Post.description} </li>
            <li className="Post__content">Settlement: {Post.settlementId?.settlementName}</li>
            <li className="Post__content">Server: {Post.posterId?.server.serverName}</li>
            <li className="Post__content">Posted at: {timeConverter(Post.timeStamp)}</li>
            {deletepost(Post.id)}
        </ul>
        </section>
        </div>
    </>)
}