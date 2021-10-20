import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Messages.css"
import { MessageContext } from "./MessageProvider"
import { UserContext } from "../auth/UserProvider"

export const Messagelist = ({ postid, postuser, isMine }) => {
    const { Messages, getMessages, addMessage, deleteMessage } = useContext(MessageContext)
    const { Users, getUsers } = useContext(UserContext)
    const history = useHistory();
    const Msg = React.createRef();
    const Receiver = React.createRef();
    const [Message, setMessages] = useState({
        post: parseInt(postid),
        message: "",
        receiver: 0,
        timeStamp: 0,
        seen: false
    });

    //Changes the state of the message 
    const handleControlledInputChange = () => {
        console.log(Receiver.current.value)
        const newMessage = { ...Message };
        newMessage.message = Msg.current.value;
        newMessage.receiver = parseInt(Receiver.current.value);
        newMessage.timeStamp = Date.now();

        setMessages(newMessage);
    };
    //getting all messages & Users
    useEffect(() => {
        getMessages(postid)
        getUsers()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //Handling the message send button
    const handleClickSaveMessage = (event) => {
        event.preventDefault();


        if (Message.message === "") {
            window.alert("Please enter a message");
        } else {
            console.log(Message)
            addMessage(Message, parseInt(postid)).then(() => {
                history.push(`/Posts/${parseInt(postid)}`)
                setMessages({
                    post: parseInt(postid),
                    message: "",
                    receiver: 0,
                    timeStamp: 0,
                    seen: false
                })
            }
            );
        }
    };
    //Return a diffrent message form depending on if the user in the poster
    const UserReturn = (isMine, postuser) => {
        if (isMine === true) {
            return (
                <div className="postForm">
                    <div>
                        <div className="form-group">
                            <label htmlFor="description">Message:</label>
                            <input
                                ref={Msg}
                                type="text"
                                id="Msg"
                                required
                                className="textfield"
                                placeholder="Message"
                                value={Message.message}
                                onChange={handleControlledInputChange}
                            />
                            <label htmlFor="description">Send To:</label>
                            <select ref={Receiver} value={Message.receiver} onChange={handleControlledInputChange}>
                                <option id="item" value="0" >Select User</option>
                                {Users.map(usr => {
                                    return (
                                        <option key={usr.id} value={usr.user?.id}>{usr.user?.username}</option>)}
                                )}
                            </select>

                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleClickSaveMessage}>
                        Submit
                    </button>
                </div>)
        } else {
            return (<div className="postForm">
                <div>
                    <div className="form-group">
                        <label htmlFor="description">Message:</label>
                        <input
                            ref={Msg}
                            type="text"
                            id="Msg"
                            required
                            className="textfield"
                            placeholder="Message"
                            value={Message.message}
                            onChange={handleControlledInputChange}
                        />
                        <label htmlFor="description">Send To:</label>
                        <select ref={Receiver} value={Message.receiver} onChange={handleControlledInputChange}>
                            {Users.map(usr => {
                                if (postuser === usr.user?.id) {
                                    return (
                                        <option key={usr.id} value={usr.user?.id}>{usr.user?.username}</option>
                                    )
                                }
                            }
                            )}
                        </select>
                    </div></div>      <button className="btn btn-primary" onClick={handleClickSaveMessage}>
                    Submit
                </button></div>)
        }
    }
    //Deleting messages of the current logged in user
    const deletemsg = (id, isSender) => {
        if (isSender === true) {
            return (
            <img className="trash-img" onClick={() => { deleteMessage(id, postid); }} src="https://img.icons8.com/ios-glyphs/22/000000/trash--v3.png" alt="loading..." />)
        } else { return (<div />) }
    }
    return (<>
        {/* maps through the messages and displays 
    only messages the correlate to the current user */}
        {Messages.map(msg => {
            if (msg.isMineSender === true || msg.isMineReceiver === true) {
                const timeConverter = (timestamp) => {
                    var date = new Date(timestamp * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    return formattedTime;
                }
                return (<>
                    <section className="msg-box" key={msg.id}>
                        <div key={msg.id}  ><span style={{fontWeight:"bold"}}>{msg.sender?.user.username}</span>: "{msg.message}" <span style={{fontStyle:"italic"}}>{timeConverter(msg.timeStamp)}</span> {deletemsg(msg.id, msg.isMineSender)}</div>
                    </section>
                </>)
            } else { return (<div key={msg.id}></div>) }
        })
        }
        {UserReturn(isMine, postuser)}
    </>
    )
}