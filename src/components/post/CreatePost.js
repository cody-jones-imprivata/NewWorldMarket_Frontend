import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../item/ItemProvider";
import { SettlementContext } from "../Servers,Factions,Settlements/SettlementProvider";
import "./Post.css"

export const CreatePost = () => {
    const { addPost } = useContext(PostContext)
    const { Items, getItems } = useContext(ItemContext)
    const { Settlements, getSettlements } = useContext(SettlementContext)
    const history = useHistory();
    const description = React.createRef();
    const Settlement = React.createRef();
    const Item = React.createRef();
    const [Post, setPost] = useState({
        settlementId: 0,
        item: 0,
        description: "",
        timeStamp: 0
    });

    useEffect(() => {
        getSettlements()
        getItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleControlledInputChange = () => {
        const newPost = { ...Post };
        newPost.item = parseInt(Item.current.value);
        newPost.settlementId = parseInt(Settlement.current.value);
        newPost.description = description.current.value;
        newPost.timeStamp = Date.now();

        setPost(newPost);
    };


    const handleClickSavePost = (event) => {
        event.preventDefault();


        if (Post.item === isNaN || Post.item === null) {
            window.alert("Please select an item");
        } else {
            console.log(Post)
            addPost(Post).then(() => history.push("/Posts"));
        }
    };

    return (
        <div className="CreatePost">
            <h2 className="postForm__title">New Post</h2>
            <label htmlFor="Items">Choose an item:</label>
            <select ref={Item} value={Post.item} onChange={handleControlledInputChange}>
                {Items.map(Item => {return (<option key={Item.id} value={Item.id}>{Item.itemName}</option>)})}
            </select>
            <label htmlFor="Settlements">Choose an Settlements:</label>
            <select ref={Settlement} value={Post.Settlement} onChange={handleControlledInputChange}>
                {Settlements.map(settlement => {return (<option key={settlement.id} value={settlement.id}>{settlement.settlementName}</option>)})}
            </select>
            <div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        ref={description}
                        type="text"
                        id="description"
                        required
                        className="textfield"
                        placeholder="Description"
                        value={Post.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </div>
            <button className="Create_Post_Button" onClick={handleClickSavePost}>
                Submit
            </button>
        </div>);
};