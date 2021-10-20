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