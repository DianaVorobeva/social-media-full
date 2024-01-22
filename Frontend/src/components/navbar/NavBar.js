import './NavBar.css';
import './AdaptiveNavBar.css';
import { AiFillHome  } from "react-icons/ai";
import { IoMdMoon } from "react-icons/io";
import { IoSunny, IoTerminal } from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { Link } from 'react-router-dom';
import SupportModal from "../supportModal/SupportModal.js";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useContext, useEffect, useState } from 'react';
import { getAllNotifications } from "../../API/NotificationsRequest.js";
import { useSelector } from 'react-redux';
import { getUser } from "../../API/UserRequest";
import Notification from "../notification/Notification";


const NavBar = ({location}) => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { user } = useSelector((state) => state.authReducer.authData);
    const [notifications, setNotifications] = useState([]);
    const [sendersArray, setSendersArray] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [over, setOver] = useState(false);
    

    const toggleModal = () => {
      setModalOpened(!modalOpened);
    };
  
    if(modalOpened) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

         // fetch notifications

    useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const { data } = await getAllNotifications();
  
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEvents();
},[]);

//get an array of senders
useEffect(() => {
  
  const senders = [];
  notifications.forEach(item=> {
    const senderId = item.senderId;
    if(!senders.includes(senderId)) {
      senders.push(senderId)
    }
  })
  setSendersArray(senders);

},[notifications])


    return (
        <div className="rightSide">
             <div className="navIcon collapsed">
                <Link to="../home">
                    <AiFillHome className={darkMode ? "blue" : ""}/>
                </Link>

                
                <Link to="../chat">
                    <BiSolidMessageDetail  className={darkMode ? "blue" : ""}/>
                   
                </Link>
              
          

                <MdContactSupport  
                onClick={toggleModal}
                className={darkMode ? "blue" : ""}/>
                {modalOpened && 
                <SupportModal modalOpened={modalOpened} setModalOpened={setModalOpened} toggleModal={toggleModal} />
                }
            
                {darkMode  
                ? <IoSunny onClick={toggle}  className={darkMode ? "blue" : ""}/> 
                : <IoMdMoon onClick={toggle}  className={darkMode ? "blue" : ""}/>
                }
            </div>
            
            <div className='blockNoti'>
                  { notifications.filter((notification)=>notification.receiverId === user?._id).length>=1 
                    ? <div 
                    className={location === 'homepage' ? "notificationsNavHome" : "notificationsNav"} 
                    onMouseOver={() => {setOver(true)}}
                    >
                      {notifications.filter((notification)=>notification.receiverId === user?._id).length}
                    </div>
                   : null
                   }
              {
              sendersArray.map((senderId, id) => {
              return (
                <div>
                  <Notification senderId={senderId} over={over} setOver={setOver} notifications={notifications} key={id} />
                </div>
              )
            }
            )
            }  
            </div>

            <div className="hamburger">
                <HamburgerMenu/>
            </div>    
        </div>
            )
}

export default NavBar;