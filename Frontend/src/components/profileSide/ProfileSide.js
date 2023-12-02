import React from "react";
import './ProfileSide.css';
import './AdaptiveProfileSide.css';
import LogoSearch from '../logoSearch/LogoSearch.js'
import ProfileCard from "../profileCard/ProfileCard";
import FollowersCard from "../followersCard/FollowersCard";


const ProfileSide = () => {
    return (
    <div className="profileSide">
       <LogoSearch/>
       <ProfileCard location="homepage"/>
       <FollowersCard/>
    </div>
    )
}

export default ProfileSide;
