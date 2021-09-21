import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link"  to="/Posts">View All Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/CreatePost">Create New Post</Link>
            </li>
        
            {
                (localStorage.getItem("newworld_token") !== null) ?
                    <li className="navbar__item">
                        <button className="navbar__link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("newworld_token")
                                history.push({ pathname: "/Posts" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/login"> Login </Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/register"> Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}