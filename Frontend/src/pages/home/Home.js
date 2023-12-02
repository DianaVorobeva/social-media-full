import React from "react";
import './Home.css';
import './AdaptiveHome.css';
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/postSide/PostSide";
import RightSide from "../../components/rightSide/RightSide";

const Home = ({switchTheme, theme}) => {
    return (
    <div className="home">
        <div className="rightSide">
           <ProfileSide/>
        </div>

        <div className="postSide" location = "home">
            <PostSide/>
        </div>

        <div className="leftSide">
            <RightSide switchTheme = {switchTheme} theme = {theme}/>
        </div>
    </div>
    )
}

export default Home;
