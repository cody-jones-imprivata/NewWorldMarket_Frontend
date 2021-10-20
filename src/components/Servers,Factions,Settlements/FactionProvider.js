import React, { useState, createContext } from "react"


export const FactionContext = createContext()


export const FactionProvider = (props) => {
    const [Factions, setFactions] = useState([])

    const getFactions = () => {
        return fetch("https://newworldmarket-backend.herokuapp.com/factions",{
            headers:{
               Authorization: `Token 368cd43fa8431c93af79a1c54dae0cac5e34ea36`
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