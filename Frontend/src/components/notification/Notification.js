import React, { useEffect, useState } from "react";
import './Notification.css';
import { Link } from 'react-router-dom';
import { getUser } from "../../API/UserRequest";
import { useSelector } from "react-redux";

const Notification = ({senderId, over, setOver, notifications }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [senderData, setSenderData] = useState(user);

    useEffect(()=>{
        if(senderId!==null) {
          const getUserData = async () => {
            try {
              const { data } = await getUser(senderId);
              setSenderData(data);
            } catch (error) {
            console.log(error);
           }
        }
        getUserData();
      };
        
      
      },[user])

    return (
         <div className={over===true ? "listEvents" : "hiddenEvents"} onMouseLeave={()=>setOver(false)}>
            <img  
                src={senderData.profilePicture 
                ? process.env.REACT_APP_PUBLIC_FOLDER + senderData.profilePicture 
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultCoverPicture.jpg"} 
                 alt="userImg"
                 className="notiImg"
                />
            <span>{senderData.firstname} {senderData.lastname}</span>
            <span>({notifications.filter((item)=>item.senderId === senderData._id).length})</span>
        </div>
  
    )

}

export default Notification;