import React, { useState, createContext } from "react"


export const SettlementContext = createContext()


export const SettlementProvider = (props) => {
    const [Settlements, setSettlement] = useState([])

    const getSettlements = () => {
        return fetch("https://newworldmarket-backend.herokuapp.com/settlements",{
            headers:{
               Authorization: `Token ${localStorage.getItem("newworld_token")}`
            }
        })
        .then(res => res.json())
        .then(setSettlement)
    }

    return (
        <SettlementContext.Provider value={{
            Settlements, getSettlements,
        }}>
            {props.children}
        </SettlementContext.Provider>     
    )
}