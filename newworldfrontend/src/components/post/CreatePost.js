import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../item/ItemProvider";
import { SettlementContext } from "../Servers,Factions,Settlements/SettlementProvider";
import { Dropdown,Option } from "../dropdown/DropDown";
import "../post/Post.css"

export const CreatePost = () => {
    const [optionValueItem, setOptionValueItem] = useState("");
    const [optionValueSettlement, setOptionValueSettlement] = useState("");
    const {  addPost } = useContext(PostContext)
    const { Items, getItems } = useContext(ItemContext)
    const { Settlements, getSettlements } = useContext(SettlementContext)
    const history = useHistory();
    const description = React.createRef();


    const handleSelectItems = (e) => {
        console.log(`Item`,e.target.value);
        setOptionValueItem(e.target.value);
      };
      const handleSelectSettlements= (e) => {
        console.log(`Settlement`,e.target.value);
        setOptionValueSettlement(e.target.value);
      };

    const [Posts, setPosts] = useState({
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
        const newPost = { ...Posts };
        newPost.item= parseInt(optionValueItem);
        newPost.settlementId = parseInt(optionValueSettlement);
        newPost.description = description.current.value;
        newPost.timeStamp = Date.now();

        setPosts(newPost);
    };


    const handleClickSavePost = (event) => {
        event.preventDefault();


        if (Posts.item === isNaN || Posts.item === null) {
            window.alert("Please select an item");
        } else {
            console.log(Posts)
            addPost(Posts).then(() => history.push("/Posts"));
        }
    };

    return (
        <div className="postForm">
            <h2 className="postForm__title">New Post</h2>
                <label htmlFor="Items">Choose an item:</label>
                <Dropdown onChange={handleSelectItems}>
                    <option id="item" value="0" >Select</option>
                    {Items.map(item => { return (<Option key={item.id} value={item.id}  name={item.itemName} />) })}
                    </Dropdown>
                <label htmlFor="Settlements">Choose an Settlements:</label>
                <Dropdown onChange={handleSelectSettlements}>
                    <option id="item" value="0" >Select</option>
                    {Settlements.map(settlement => { return (<Option key={settlement.id} value={settlement.id}  name={settlement.settlementName} />) })}
                    </Dropdown>
            <div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        ref={description}
                        type="text"
                        id="description"
                        required
                        className="textfield"
                        placeholder="description"
                        value={Posts.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleClickSavePost}>
                Submit
            </button>
        </div>);
};