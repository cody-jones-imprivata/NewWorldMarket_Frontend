import React, { useState, createContext } from "react"


export const ServerContext = createContext()


export const ServerProvider = (props) => {
    const [Servers, setServers] = useState([])

    const getServers = () => {
        return fetch("https://newworldmarket-backend.herokuapp.com/servers",{
            headers:{
               Authorization: `Token 0f612061fb08c2a36eb700afba263b08ded91e51`
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