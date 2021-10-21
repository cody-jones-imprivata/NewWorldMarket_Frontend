import React, { useState, createContext } from "react"


export const FactionContext = createContext()


export const FactionProvider = (props) => {
    const [Factions, setFactions] = useState([])

    const getFactions = () => {
        return fetch("http://localhost:8000/factions",{
            headers:{
               Authorization: `Token 0f612061fb08c2a36eb700afba263b08ded91e51`
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