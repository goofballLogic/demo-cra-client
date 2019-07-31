import React, { useContext } from "react";
import AppStore from "./AppStore";
import Posts from "./Posts";
import Profile from "./Profile";
import "./Body.css";

const Body = () => {

    const { posts, profile } = useContext(AppStore);
    return (

        <main>
            <Posts {...posts} />
            <Profile {...profile} />
        </main>

    );

}

export default Body;