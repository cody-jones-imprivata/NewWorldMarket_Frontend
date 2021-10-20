import React, { useState, createContext } from "react"


export const MessageContext = createContext()


export const MessageProvider = (props) => {
    const [Messages, setMessages] = useState([])

    const getMessages = (postid) => {
        return fetch(`https://newworldmarket-backend.herokuapp.com/messages?post=${postid}`,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            headers:{
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            }
        })
        .then(res => res.json())
        .then(setMessages)
    }

    const addMessage = (MessageObj,postid) => {
        return fetch("https://newworldmarket-backend.herokuapp.com/messages", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(MessageObj)
        })
        .then(() =>{getMessages(postid)})
    }

    const deleteMessage = (msgid,postid) => {
        return fetch(`https://newworldmarket-backend.herokuapp.com/messages/${msgid}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            },
        })
        .then(() =>{getMessages(postid)})
    }

    return (
        <MessageContext.Provider value={{
            Messages, addMessage, getMessages,deleteMessage
        }}>
            {props.children}
        </MessageContext.Provider>     
    )
}