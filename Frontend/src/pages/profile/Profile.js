import React from "react";
import './Profile.css';
import './AdaptiveProfile.css';
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSide from "../../components/postSide/PostSide";
import NavBar from "../../components/navbar/NavBar";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import InfoCard from "../../components/infoCard/InfoCard";


const Profile= () => {
    return (
    <div className="profile">
        <LogoSearch/>
        
        <div className="profileCenter">
            <div className="part">
                <ProfileCard location = "profilePage"/>
            </div>
            
            <InfoCard/>
            <PostSide  location = "profilePage"/>
        </div>
        <div className="navbar">
            <NavBar/>
        </div>
        
    </div>
    )
}

export default Profile;
