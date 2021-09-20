import React from "react"
import { Route } from "react-router"
import { ItemProvider } from "./item/ItemProvider"
import { PostList } from "./post/Postlist"
import { PostProvider } from "./post/PostProvider"
import { CreatePost } from "./post/CreatePost"
import { SettlementProvider } from "./Servers,Factions,Settlements/SettlementProvider"
import { IndividualPost } from "./post/IndividualPost"
import { MessageProvider } from "./messages/MessageProvider"

export const ApplicationViews = () => {
    return <>
        <MessageProvider>
            <PostProvider>
                <SettlementProvider>
                    <ItemProvider>
                        <Route exact path="/Posts">
                            <PostList />
                        </Route>
                        <Route exact path="/Posts/:PostId(\d+)">
                            <IndividualPost />
                        </Route>
                        <Route exact path="/CreatePost">
                            <CreatePost />
                        </Route>
                    </ItemProvider>
                </SettlementProvider>
            </PostProvider>
        </MessageProvider>
    </>
}