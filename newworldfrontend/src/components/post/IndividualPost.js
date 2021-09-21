import React, { useContext, useEffect,useState } from "react"
import { PostContext } from "./PostProvider"
import { useParams, useHistory } from "react-router"
import { EditPost } from "./EditPost"
import { Messagelist } from "../messages/MessageList"


export const IndividualPost = () => {
    const History = useHistory()
    const { PostId } = useParams();
    const { getPostbyId, deletePost } = useContext(PostContext)
    const [Post, setPost] = useState({});
    useEffect(() => {
        getPostbyId(PostId).then(setPost)
        console.log('indpost',Post)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
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
    };
    const itemImage = {
        filter: 'drop-shadow(1px 1px 5px white) brightness(1.5)',
    };

    const deletepost = (id) =>{
        if (parseInt(localStorage.getItem("user")) === parseInt(Post.posterId?.id)) { 
        return(<><img onClick={()=>deletePost(id).then(setTimeout(() => { History.push("/Posts") }, 100)) } src="https://img.icons8.com/material-sharp/24/000000/trash.png" alt="loading..."/>
        <button onClick={()=>deletePost(id).then(setTimeout(() => { History.push("/Posts") }, 100)) }>Sold</button></>)
    }   else{return(<div/>)}
}

    return (
    <section className="Section__Post">
        <div style={itemRaritybackground}>
            <img style={itemImage} className="Item__Image" src={Post.item?.image} alt="Loading..." />
        </div>
        <ul className="Post" id={`Post--${Post.id}`} key={Post.id}>
            <div className="Post__content">
                <div className="Post__description">poster:{Post.posterId?.user.username} </div>
                <div className="Post__description">rarity: {Post.item?.rarity} </div>
                <div className="Post__description">Description: {Post.description} </div>
                <div className="Post__item">Item: {Post.item?.itemName} </div>
                <div className="Post__settlement">Settlement: {Post.settlementId?.settlementName}</div>
                <div className="Post__server">Server: {Post.posterId?.server.serverName}</div>
                <div className="Post__server">time: {timeConverter(Post.timeStamp)}</div>
            </div>
            {deletepost(Post.id)}
             <EditPost isMine={Post.isMine} postid={Post.id} /> 
             <Messagelist isMine={Post.isMine} postuser={Post.posterId?.user.id} postid={PostId} /> 
        </ul>
    </section>
    )
}