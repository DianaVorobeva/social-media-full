import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../API/UserRequest.js";
import { AiOutlineClose } from 'react-icons/ai';
import { deleteChat } from "../../API/ChatRequest.js";

const Conversation = ({ data, currentUser, clickedUserId, chatId, remove, setRemove, online }) => {

    const [userData, setUserData] = useState(null);
    
    const dispatch = useDispatch();

    useEffect(()=> {
        const userId = data.members.find((_id) => _id !== currentUser);
       
        const getUserData = async () => {
          try
          {
            if(userId) {
              const {data} = await getUser(userId);
             setUserData(data);
             dispatch({type:"SAVE_USER", data:data});
            }
              
          }
          catch(error)
          {
            console.log(error);
          }
        }
    
        getUserData();
      }, []);


  // Delete chat

  const handleDelete = () => {
     setRemove(!remove)
  }
  

    const deleteThisChat = async() => {
          try{
            const {data} = await deleteChat(chatId);
            setUserData(data);
      }
      catch(error)
      {
        console.log(error);
      }
    }

   
    return (
        <>
        
           <div className="follower conversation" style={remove ? {display: "none"} : {display: "flex"} }>
              <div className="box2">
          {online && 
          <div className="online-dot"></div>
          }
          <div className="wrapper2">
          <img
            src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfilePicture.png"}
            alt="Profile"
            className="followerImg"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '12px'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online ? "#51e200" : ""}}>{online ? "Online" : "Offline"}</span>
          </div>
           <div className="close" onClick={deleteThisChat}>
                <AiOutlineClose/>
          </div>
          </div>
          
              </div>
             
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </div>
        
     
  
    </>

    )
}

export default Conversation;