import React from "react";
import './ProfileLeft.css';
import './AdaptiveProfileLeft.css';
import LogoSearch from "../logoSearch/LogoSearch";
import InfoCard from "../infoCard/InfoCard";
import FollowersCard from "../followersCard/FollowersCard";

const ProfileLeft= () => {
    return (
    <div className="profileSide">
       <LogoSearch/>
       <div className="none">
        <InfoCard/>
       </div>
       
       <FollowersCard/>
    </div>
    )
}

export default ProfileLeft;
