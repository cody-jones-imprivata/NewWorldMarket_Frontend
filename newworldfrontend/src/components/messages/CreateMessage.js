import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { MessageContext } from "./MessageProvider"

import "../post/Post.css"

export const CreateMessage = ({ postid }) => {
    const history = useHistory();
    const Message = React.createRef();
    const Receiver = React.createRef();
    const { addMessage } = useContext(MessageContext)
    const [Messages, setMessages] = useState({
        post: parseInt(postid),
        message: "",
        receiver: 0,
        timeStamp: 0,
        seen: false
    });

    const handleControlledInputChange = () => {
        const newMessage = { ...Messages };
        newMessage.message = Message.current.value;
        newMessage.receiver = parseInt(Receiver.current.value);
        newMessage.timeStamp = Date.now();

        setMessages(newMessage);
    };


    const handleClickSaveMessage = (event) => {
        event.preventDefault();


        if (Messages.message === "") {
            window.alert("Please enter a message");
        } else {
            console.log(Messages)
            addMessage(Messages, parseInt(postid)).then(() => history.push(`/Posts`));
        }
    };

    return (
        <div className="postForm">
            <div>
                <div className="form-group">
                    <label htmlFor="description">{parseInt(postid)}Message:</label>
                    <input
                        ref={Message}
                        type="text"
                        id="Message"
                        required
                        className="textfield"
                        placeholder="Message"
                        value={Messages.message}
                        onChange={handleControlledInputChange}
                    />
                    <label htmlFor="description">{parseInt(postid)}Receiver:</label>
                    <input
                        ref={Receiver}
                        type="text"
                        id="Receiver"
                        required
                        className="textfield"
                        placeholder="Message"
                        value={Receiver.message}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleClickSaveMessage}>
                Submit
            </button>
        </div>);
};