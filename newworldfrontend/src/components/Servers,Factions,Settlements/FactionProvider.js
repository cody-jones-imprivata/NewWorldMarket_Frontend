import React, { useState, createContext } from "react"


export const FactionContext = createContext()


export const FactionProvider = (props) => {
    const [Factions, setFactions] = useState([])

    const getFactions = () => {
        return fetch("http://localhost:8000/factions",{
            headers:{
               Authorization: `Token fa2eba9be8282d595c997ee5cd49f2ed31f65bed`
            }
        })
        .then(res => res.json())
        .then(setFactions)
    }

    return (
        <FactionContext.Provider value={{
            Factions, getFactions
        }}>
            {props.children}
        </FactionContext.Provider>     
    )
}