import React, { useState, createContext } from "react"


export const ServerContext = createContext()


export const ServerProvider = (props) => {
    const [Servers, setServers] = useState([])

    const getServers = () => {
        return fetch("http://localhost:8000/servers",{
            headers:{
               Authorization: `Token 1`
            }
        })
        .then(res => res.json())
        .then(setServers)
    }

    return (
        <ServerContext.Provider value={{
            Servers, getServers
        }}>
            {props.children}
        </ServerContext.Provider>     
    )
}