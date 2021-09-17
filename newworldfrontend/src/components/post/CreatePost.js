import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../item/ItemProvider";
import { SettlementContext } from "../Servers,Factions,Settlements/SettlementProvider";

export const CreatePost = () => {
    const { getPosts, addPost } = useContext(PostContext)
    const { Items, getItems } = useContext(ItemContext)
    const { Settlements, getSettlements } = useContext(SettlementContext)
    const history = useHistory();
    const item = React.createRef();
    const description = React.createRef();
    const Settlement = React.createRef();
    const [Posts, setPosts] = useState({
        settlementId: 0,
        item: 0,
        description: "",
        timeStamp: 0
    });
    useEffect(() => {
        getPosts()
        getSettlements()
        getItems()
    }, []);

    const handleControlledInputChange = (event) => {

        const newPost = { ...Posts };

        newPost.settlementId = Settlement.current.value;
        newPost.item = item.current.value;
        newPost.description = description.current.value;
        newPost.timeStamp = Date.now();
        
        setPosts(newPost);
    };


    const handleClickSavePost = (event) => {
        event.preventDefault();


        if (Posts.item === "") {
            window.alert("Please select an item");
        } else {
            addPost(Posts).then(() => history.push("/Posts"));
        }
    };

    return (
        <form className="postForm">
            <h2 className="postForm__title">New Post</h2>
            <form action="/">
                <label for="Items">Choose an item:</label>
                <select id="Items" name="Items">
                    {Items.map(Item => { return (<option id="item" value={Item.id} ref={item}>{Item.itemName}</option>) })}
                </select>
            </form>
            <form action="/">
                <label for="Settlements">Choose an Settlements:</label>
                <select id="Settlements" name="Settlements">
                    {Settlements.map(settlement => { return (<option id="settlementId" value={settlement.id} ref={Settlement}>{settlement.settlementName}</option>) })}
                </select>
            </form>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        ref={description}
                        type="text"
                        id="description"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="description"
                        value={Posts.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSavePost}>
                Submit
            </button>
        </form>);
};