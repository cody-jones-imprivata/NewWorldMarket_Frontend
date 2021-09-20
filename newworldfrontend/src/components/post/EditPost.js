import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../item/ItemProvider";
import { SettlementContext } from "../Servers,Factions,Settlements/SettlementProvider";
import { Dropdown, Option } from "../dropdown/DropDown";
import Collapsible from 'react-collapsible';

export const EditPost = ({postid, user,item,settlement}) => {
    const [optionValueItem, setOptionValueItem] = useState("");
    const [optionValueSettlement, setOptionValueSettlement] = useState("");
    const { editPost } = useContext(PostContext)
    const { Items, getItems } = useContext(ItemContext)
    const { Settlements, getSettlements } = useContext(SettlementContext)
    const history = useHistory();
    const description = useRef();
    const [Posts, setPosts] = useState({
        settlementId: 0,
        item: 0,
        description: ""
    });

    const handleSelectItems = (e) => {
        console.log(`Item`, e.target.value);
        setOptionValueItem(e.target.value);
    };
    const handleSelectSettlements = (e) => {
        console.log(`Settlement`, e.target.value);
        setOptionValueSettlement(e.target.value);
    };

    useEffect(() => {
        getSettlements()
        getItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleControlledInputChange = (event) => {
        const newPost = { ...Posts };
        newPost.item = parseInt(optionValueItem);
        newPost.settlementId = parseInt(optionValueSettlement);
        newPost.description = description.current.value;

        setPosts(newPost);
    };


    const handleClickSavePost = (event) => {
        event.preventDefault();

        if (Posts.item === null || Posts.settlementId === null) {

        } else {
            editPost(Posts, postid).then(() => history.push(`/Posts/`));
        }
    };


    const UserReturn = (user) => {
        if (parseInt(localStorage.getItem("user")) === parseInt(user)) {
            return (
                <Collapsible trigger="Edit Post">
                <div className="postForm">
                    <h2 className="postForm__title">Edit Post</h2>

                    <label htmlFor="Items">Choose an item:</label>
                    <Dropdown onChange={handleSelectItems} key="items">
                        <option id="item" value="0" >Select Item</option>
                        {Items.map(item => { return (<Option key={item.id} value={item.id} name={item.itemName} />) })}
                    </Dropdown>

                    <label htmlFor="Settlements">Choose an Settlements:</label>
                    <Dropdown onChange={handleSelectSettlements}>
                        <option id="item" value="0" >Select Settlement</option>
                        {Settlements.map(settlement => { return (<Option key={settlement.id} value={settlement.id} name={settlement.settlementName} />) })}
                    </Dropdown>

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
                    <button className="btn btn-primary" onClick={handleClickSavePost}>
                        Submit
                    </button>
                </div></Collapsible>)
        } else {
            return (<div></div>)
        }
    }
    return (<>
        {UserReturn(user)}
    </>);
};