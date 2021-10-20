import React, { useState, createContext } from "react"


export const ServerContext = createContext()


export const ServerProvider = (props) => {
    const [Servers, setServers] = useState([])

    const getServers = () => {
        return fetch("https://newworldmarket-backend.herokuapp.com/servers",{
            headers:{
               Authorization: `Token 368cd43fa8431c93af79a1c54dae0cac5e34ea36`
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