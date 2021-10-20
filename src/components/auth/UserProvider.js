import React, { useState, createContext } from "react"


export const UserContext = createContext()


export const UserProvider = (props) => {
    const [Users, setUsers] = useState([])

    const getUsers = () => {
        return fetch(`https://newworldmarket-backend.herokuapp.com/gameusers`,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            headers:{
                Authorization: `Token ${localStorage.getItem("newworld_token")}`,
            }
        })
        .then(res => res.json())
        .then(setUsers)
    }

    return (
        <UserContext.Provider value={{
            Users,getUsers
        }}>
            {props.children}
        </UserContext.Provider>     
    )
}