import "./Chat.css";
import "./AdaptiveChat.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { userChats, createChat, findChat } from "../../API/ChatRequest.js";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { DarkModeContext } from "../../context/DarkModeContext";
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { getSearchList } from "../../API/SearchRequest";
import Conversation from "../../components/conversation/Conversation.js";
import NavBar from "../../components/navbar/NavBar";



const Chat = () => {
  const socket = useRef();
  
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatId, setChatId] =useState();
  const [remove, setRemove] = useState(false);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [listSearch, setListSearch] = useState([]);
  const [clickedUserId, setClickedUserId] = useState();

  // find user adn create a chat

  const itemClicked = (e) => { 
    setText(e.target.textContent);
    setIsOpen(!isOpen);
}

const inputClickHandler = () => {
    setIsOpen(true);
}

const closeClicked = () => {
  setText("")
}

//  fetch search array of users who match

useEffect(() => {
  const fetchSearchArray = async () => {
    try {
      if(text!=="") {
          const { data } = await getSearchList(text);
          setListSearch(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchSearchArray();
}, [text]);


// create a chat

useEffect(() => {
  const createNewChat = async() => {

  const oldChat = await findChat(user._id, clickedUserId);

  if(oldChat.data === null) {
      const newChat = {
      senderId: user._id,
      receiverId: clickedUserId,
    }
  
    try {
      if(clickedUserId) {
        const { data } = await createChat(newChat); 
        setChats([...chats, data]);
      }   
    } catch (error) {
      console.log(error);
    }} else {
    console.log("chat exits")
}}
createNewChat()
},[clickedUserId])


// Get the chat in chat section

  useEffect(() => {
    const getChats = async () => {
      
      try {
        const { data } = await userChats(user._id);
       
        setChats(data);
        setChatId(data[0]._id);
      } catch (error) {
        console.log(error);
      }
    };
    getChats(); 
    
  }, [user._id]);

//    Connect to Socket.io
useEffect(() => {
  
  socket.current = io("ws://localhost:8800", {transports: ['websocket', 'polling', 'flashsocket']});
  socket.current.emit("new-user-add", user._id);
  socket.current.on("get-users", (users) => {
    setOnlineUsers(users);
  });
}, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

 

    return (
        <div>
  <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="searchBlock">
            <LogoSearch/>
        </div>
        
        <div className="Chat-container">

        <div className="search">
            <input 
            type="text" 
            placeholder="Search..."  
            className={darkMode ? "input inputDarkMode" : "input"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={inputClickHandler}
            />
            <div className="searchIcon">
              {text
              ? <AiOutlineClose className={darkMode ? "blue" : ""} onClick={closeClicked}/>
              : <BiSearch className={darkMode ? "blue" : ""}/>
              }
                
               
            </div>
            {text && isOpen 
            ?
               <div className="autocomplete">
                    {
                        listSearch.map((item, index) => {
                            console.log(item._id)
                            return (
                                <div className="autocompleteItem" key={index}>

                                    <div className="person" 
                                    onClick={(e) => { 
                                      itemClicked(e);  
                                      setText("")}} 
                                      >
                                        <div onClick={() => setClickedUserId(item._id)}>
                                          <span>{item.firstname} {item.lastname}</span>
                                          <span>{item.username} </span>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                            
                        })
                    }
                </div>    
            : null}
            
       </div>
          <h2>Your Chats</h2>
          <div className="Chat-list">
            {chats.map((chat,id) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                key={id}
              >
                <Conversation
                data={chat}
                chatId={chatId}
                currentUser={user._id}
                clickedUserId={clickedUserId}
                remove={remove}
                setRemove={setRemove}
                online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div className="iconBlock" >
          <NavBar/>
        </div>
        <ChatBox
        chat={currentChat}
        currentUser={user._id}
        remove={remove}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
        />
    
      </div>
    </div>
        </div>
    )
}

export default Chat;