import "./ChatBox.css";
import "./AdaptiveChatBox.css"
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji';
import { AiOutlineClose } from 'react-icons/ai';
import { addMessage, getMessages, deleteMessage } from "../../API/MessageRequest";
import { getUser } from "../../API/UserRequest";
import { uploadImage } from "../../actions/uploadAction";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';



const ChatBox = ({ chat, currentUser, remove, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const scroll = useRef();
  const imageRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  };

  const userId = chat?.members?.find((id) => id !== currentUser);

  // fetching data for header
  useEffect(() => {
    
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


  // Always scroll to last Message

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  // add image in message

  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        setImage(img)
    }
}

const reset = () => {
  setImage(null);
  imageRef.current.value = null;
}

  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault();
    
    const message = {
      senderId : currentUser,
      text: newMessage,
      image: image,
      chatId: chat._id,
  }

    if(image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      message.image = filename;
      
      try {
        dispatch(uploadImage(data))
      } catch (error) {
          console.log(error)
      }
      reset()
  }
    
  const receiverId = chat.members.find((id)=>id!==currentUser);

//   send message to socket server

  setSendMessage({...message, receiverId})


  // send message to database

  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    console.log(message.image)
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

// Receive Message from parent component

useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])

// delete a message
const deleteThisMessage = async() => {
  try{
    const {data} = await deleteMessage(messageId);
   
}
catch(error)
{
console.log(error);
}
}



  return (
    <>
      <div className="ChatBox-container">
        {chat&&remove===false ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
              <Link to={`/profile/${userId}`}
                    state= {{ searchId: userId}}  
                    style={{textDecoration: "none", color: "inherit"} }
              >
                <div className="header">
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfilePicture.png"
                    }
                    alt="Profile"
                    className="followerImg"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </Link>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message, id) => (
             
                  <div  ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                    key={id}
                  >
                    {message.image && (
                      <img src={process.env.REACT_APP_PUBLIC_FOLDER + message.image} alt="addedPicture" className="imgMessage"/>
                    )}
                    
                    <span>{message.text}</span>{" "}
                    <AiOutlineClose 
                    className="deleteMessage"
                    onClick={() => {setMessageId(messages[0]._id); deleteThisMessage()}}
                    />
                    <span className="date">{format(message.createdAt)}</span>
                  </div>
        
              ))}
              {image && (
            <div className="imagePreview">
                <AiOutlineClose onClick={()=>setImage(null)}/>
                <img src={URL.createObjectURL(image)} alt="capturedImage"/>
            </div>
            )}
            </div>

            {/* chat-sender */}
            <div>
            

            <div className="chat-sender">
        
            
              <div onClick={() => imageRef.current.click()}>+</div>
              <div style={{display:"none"}}>
                    <input
                     type="file" 
                     name="myImage" 
                     ref={imageRef} 
                     onChange={onImageChange}/>
              </div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick = {handleSend}>Send</div>
            </div>
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;