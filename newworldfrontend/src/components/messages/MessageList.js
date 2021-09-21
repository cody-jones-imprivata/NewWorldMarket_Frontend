import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../post/Post.css"
import { MessageContext } from "./MessageProvider"
// import {CreateMessage} from "./CreateMessage"
export const Messagelist = ({ postid, postuser,isMine }) => {
    const { Messages, getMessages, addMessage,deleteMessage } = useContext(MessageContext)
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


    const handleControlledInputChange = () => {
        const newMessage = { ...Message };
        newMessage.message = Msg.current.value;
        newMessage.receiver = parseInt(Receiver.current.value);
        newMessage.timeStamp = Date.now();

        setMessages(newMessage);
    };

    useEffect(() => {
        getMessages(parseInt(postid))
        console.log("msg", Messages)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickSaveMessage = (event) => {
        event.preventDefault();


        if (Message.message === "") {
            window.alert("Please enter a message");
        } else {
            console.log(Message)
            addMessage(Message, parseInt(postid)).then(() => history.push(`/Posts/${parseInt(postid)}`));
        }
    };

    const UserReturn = (postuser) => {
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
                                value={Msg.message}
                                onChange={handleControlledInputChange}
                            />
                            <label htmlFor="description">Receiver:</label>
                            <input
                                ref={Receiver}
                                type="text"
                                id="Receiver"
                                required
                                className="textfield"
                                placeholder="Receiver"
                                value={Receiver.message}
                                onChange={handleControlledInputChange}
                            />
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
                            value={Msg.message}
                            onChange={handleControlledInputChange}
                        />
                        <label htmlFor="description">Receiver:</label>
                        <input
                            className="textfield"
                            ref={Receiver}
                            id={Receiver.message}
                            value={postuser}
                            readOnly= {true}
                        />
                    </div></div>      <button className="btn btn-primary" onClick={handleClickSaveMessage}>
                    Submit
                </button></div>)
        }
    }
    const deletemsg = (id,mymsg) =>{
        if (mymsg === true) { 
        return(<img onClick={()=>deleteMessage(id).then(getMessages(parseInt(postid))) } src="https://img.icons8.com/material-sharp/24/000000/trash.png" alt="loading..."/>)
    }   else{return(<div/>)}
}
    return (<>
        {Messages.map(Msg => {
            if (Msg.isMine === true) {
                return (<>
                    <section className="" key={Msg.id}>
                        <div key={Msg.id}  >#{Msg.sender?.user.id} {Msg.sender?.user.username} : "{Msg.message}" {Msg.timeStamp} {deletemsg(Msg.id,Msg.isMine)}</div>
                    </section>
                </>)
            } else { return (<div key={Msg.id}></div>) }
        })
        }
        {UserReturn(postuser, postid)}
        {/* <CreateMessage postid={parseInt(postid)}/> */}
    </>
    )
}