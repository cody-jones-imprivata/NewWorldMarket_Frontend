import React from "react"
import { Route } from "react-router"
import { ItemProvider } from "./item/ItemProvider"
import { PostList } from "./post/Postlist"
import { PostProvider } from "./post/PostProvider"
import{CreatePost} from "./post/CreatePost"
import { SettlementProvider } from "./Servers,Factions,Settlements/SettlementProvider"

export const ApplicationViews = () => {
    return <>
    <SettlementProvider>
    <ItemProvider>
    <PostProvider>
        <Route exact path="/Posts">
        <PostList/>
        </Route>
        <Route exact path="/CreatePost">
        <CreatePost/>
        </Route>
    </PostProvider>
    </ItemProvider>
    </SettlementProvider>
    </>
}