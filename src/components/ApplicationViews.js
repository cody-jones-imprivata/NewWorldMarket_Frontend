import React from "react"
import { Route } from "react-router"
import { ItemProvider } from "./item/ItemProvider"
import { PostList } from "./post/Postlist"
import { PostProvider } from "./post/PostProvider"
import { CreatePost } from "./post/CreatePost"
import { SettlementProvider } from "./Servers,Factions,Settlements/SettlementProvider"
import { IndividualPost } from "./post/IndividualPost"
import { MessageProvider } from "./messages/MessageProvider"
import { UserProvider } from "./auth/UserProvider"
import { Login } from './auth/Login'

export const ApplicationViews = () => {
    return <>
        <UserProvider>
            <MessageProvider>
                <PostProvider>
                    <SettlementProvider>
                        <ItemProvider>
                                <Route exact path="/Posts">
                                    <PostList />
                                </Route>
                            <Route exact path="/Posts/:PostId(\d+)" render={() => {
                                if (localStorage.getItem("newworld_token")) {
                                    return <IndividualPost />
                                } else {
                                    return <Login />
                                }
                            }} />
                            <Route exact path="/CreatePost" render={() => {
                                if (localStorage.getItem("newworld_token")) {
                                    return <CreatePost />
                                } else {
                                    return <Login />
                                }
                            }} />
                    </ItemProvider>
                </SettlementProvider>
            </PostProvider>
        </MessageProvider>
    </UserProvider>
    </>
}