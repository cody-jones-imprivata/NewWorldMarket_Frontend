import React, { useState, createContext } from "react"


export const SettlementContext = createContext()


export const SettlementProvider = (props) => {
    const [Settlements, setSettlement] = useState([])

    const getSettlements = () => {
        return fetch("http://localhost:8000/settlements",{
            headers:{
               Authorization: `Token 1`
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