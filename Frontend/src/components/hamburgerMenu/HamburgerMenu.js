import React, {useContext, useState} from "react";
import './HamburgerMenu.css';
import { AiFillHome  } from "react-icons/ai";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { BsFillFilePersonFill } from "react-icons/bs"
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from 'react-router-dom';
import SupportModal from "../supportModal/SupportModal.js";
import { useSelector } from "react-redux";

const HamburgerMenu = () => {

    const { toggle, darkMode } = useContext(DarkModeContext);
    const { user } = useSelector((state) => state.authReducer.authData);

    const [modalOpened, setModalOpened] = useState(false);

    const toggleModal = () => {
      setModalOpened(!modalOpened);
    };
  
    if(modalOpened) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <div>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
                <div  className={!isMenuClicked ? "menu hidden" : "menu visible"}>
                    <Link to="../home" 
                    style={{textDecoration: "none", color: "inherit"}}
                    className="linkBox"
                    >
                        <AiFillHome className={darkMode ? "blue" : ""}/><p className="link">Home</p>
                    </Link>
                    <Link to="../chat"
                    style={{textDecoration: "none", color: "inherit"}}
                    className="linkBox"
                    >
                    <BiSolidMessageDetail  className={darkMode ? "blue" : ""}/><p className="link">Messages</p>
                    </Link>
                    <div className="linkBox">
                        <MdContactSupport  
                        onClick={toggleModal}
                        className={darkMode ? "blue" : ""}
                        />
                        <p className="link">Support</p>
                    </div >
                    {modalOpened && 
                    <SupportModal modalOpened={modalOpened} setModalOpened={setModalOpened} toggleModal={toggleModal} />
                    }
                    <span>
                        {darkMode  
                        ? <IoSunny onClick={toggle}/> 
                        : <IoMdMoon onClick={toggle}/>} 
                        <p className="link">Light/Dark Mode</p>
                    </span>
                    <Link to={`/profile/${user._id}`} 
                    style={{textDecoration: "none", color: "inherit"}}
                    className="linkBox"
                    >
                        <BsFillFilePersonFill/> 
                        <p className={darkMode ? "blue link" : "link"}>My Profile</p>
                    </Link>
               </div>
            </nav>

            
        </div>
    )
}

export default HamburgerMenu;