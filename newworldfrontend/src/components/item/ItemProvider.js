import React, { useState, createContext } from "react"


export const ItemContext = createContext()


export const ItemProvider = (props) => {
    const [Items, setItems, setItem] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8000/items",{
            headers:{
                Authorization: `Token ${localStorage.getItem("newworld_token")}`
            }
        })
        .then(res => res.json())
        .then(setItems)
    }

    const getSingleItem = name => {
        return fetch(`http://localhost:8000/items?itemName=${name}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            },
        
        })
        .then(setItem)
    }

    return (
        <ItemContext.Provider value={{
            Items, getItems, getSingleItem
        }}>
            {props.children}
        </ItemContext.Provider>     
    )
}