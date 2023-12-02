import React, { useEffect, useState } from "react";
import './InfoCard.css';
import './AdaptiveInfoCard.css';
import { AiOutlineClose } from 'react-icons/ai'
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from '../../API/UserRequest.js';
import { logout } from "../../actions/AuthAction";

const InfoCard= () => {
    const [modalOpened, setModalOpened] = useState(false);

    const dispatch = useDispatch()
    const params = useParams();
    let profileUserId = params.id;
    
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);
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
      };
      fetchProfileUser();
    }
      
    }, [user]);

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  };

  if(modalOpened) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleLogout = () => {
    dispatch(logout());
  }

    return (
    <div className="infoCard">

            <h4>{user._id===profileUserId ? "Your info" : "User info"}</h4>

        <div className="item">
            <span>Status</span>
            <span>{profileUser.relationship ? profileUser.relationship : "no info"}</span>
            {user._id === profileUserId 
            ? <AiOutlineClose onClick={toggleModal} style={{color: "var(--blueDark)"}}/>
            : ""}
        </div>

        <div className="item">
            <span>Live in</span>
            <span>{profileUser.livesIn ? profileUser.livesIn : "no info"}</span>
            {user._id === profileUserId 
            ? <AiOutlineClose onClick={toggleModal} style={{color: "var(--blueDark)"}}/>
            : ""}
        </div>
        <div className="item">
            <span>Country</span>
            <span>{profileUser.country ? profileUser.country : "no info" }</span>
            {user._id === profileUserId 
            ? <AiOutlineClose onClick={toggleModal} style={{color: "var(--blueDark)"}}/>
            : ""}
        </div>
        <div className="item">
            <span>Work at</span>
            <span>{profileUser.workAt ? profileUser.workAt : "no info" }</span>
            {user._id === profileUserId 
            ? <AiOutlineClose onClick={toggleModal} style={{color: "var(--blueDark)"}}/>
            : ""}
        </div>
        <div className="item">
            <span>Relationship status</span>
            <span>{profileUser.relationship ? profileUser.workAt : "no info" }</span>
            {user._id === profileUserId 
            ? <AiOutlineClose onClick={toggleModal} style={{color: "var(--blueDark)"}}/>
            : ""}
        </div>
        
        {user._id === profileUserId &&
        <div className="btnBlock">
            <button className="button changeBtn" onClick={toggleModal}>Change Info</button>
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} toggleModal={toggleModal} data={user}/>
            <button className="button logoutBtn" onClick={handleLogout}>Log out</button>
        </div>
        }
        
    </div>
    )
}

export default InfoCard;
