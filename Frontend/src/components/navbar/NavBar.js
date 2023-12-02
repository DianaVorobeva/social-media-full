import './NavBar.css';
import './AdaptiveNavBar.css';
import { AiFillHome  } from "react-icons/ai";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { Link } from 'react-router-dom';
import SupportModal from "../supportModal/SupportModal.js";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useContext, useState } from 'react';


const NavBar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);

    const [modalOpened, setModalOpened] = useState(false);

    const toggleModal = () => {
      setModalOpened(!modalOpened);
    };
  
    if(modalOpened) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }


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
            <div className="hamburger">
                <HamburgerMenu/>
            </div>    
        </div>
            )
}

export default NavBar;