import React, { useEffect, useState } from "react";
import './ProfileCard.css';
import './AdaptiveProfileCard.css';
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import * as UserApi from '../../API/UserRequest.js';



const ProfileCard = ({location}) => {

    const params = useParams();
    let profileUserId = params.id;
    const { user } = useSelector((state) => state.authReducer.authData);
    const [profileUser, setProfileUser] = useState(user);
    
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const posts = useSelector((state) => state.postReducer.posts);
    if(profileUserId===undefined) {
        profileUserId = user._id
    }
  

    

    useEffect(() => {
        const fetchProfileUser = async () => {
          if (profileUserId === user._id) {
            setProfileUser(user);
          } else {
            const { data } = await UserApi.getUser(profileUserId);
            
            setProfileUser(data);
          }
        };
        fetchProfileUser();
      }, [user]);

    
     
   
    return (

    <div className="profileCard">
        

       <div className="profileImg">
        <img src={profileUser.coverPicture ? serverPublic + profileUser.coverPicture : serverPublic + "defaultCoverPicture.jpg"} alt="cover"/>
        <img src={profileUser.profilePicture ? serverPublic + profileUser.profilePicture : serverPublic + "defaultProfilePicture.png"} alt="userImg"/>
       </div>

       <div className="profileName">
        <span>{profileUser.firstname} {profileUser.lastname}</span>
        <span>{profileUser.workAt ? profileUser.workAt : "Write about yourself"}</span>
       </div>

       <div className="followStatus">
        <hr/>
        <div>
            <div className="follow">
                <span>{profileUser.following.length}</span>
                <span>followings</span>
            </div>

            <div className="vl"></div>

            <div className="follow">
                <span>{profileUser.followers.length}</span>
                <span>followers</span>
            </div>

            {location === 'profilePage' && (
                <>
                
                <div className="vl">

                </div>

                <div className="follow">
                    <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                    <span>Posts</span>
                </div>
                </>

            )}
           
        </div>
        <hr/>
       </div>
       
       
       {location === 'profilePage' 
       ? "" 
       : <span>
            <Link to={`/profile/${user._id}`} style={{textDecoration: "none", color: "inherit"}}>
                My Profile
            </Link>
        </span>}
        
       
    </div>
    )
}

export default ProfileCard;


