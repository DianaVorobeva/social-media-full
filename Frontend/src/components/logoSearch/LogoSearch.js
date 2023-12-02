import React, { useContext, useEffect, useRef, useState } from "react";
import './LogoSearch.css';
import './AdaptiveLogoSearch.css';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from 'react-router-dom';
import { getSearchList } from "../../API/SearchRequest";
import NavBar from "../navbar/NavBar";

const LogoSearch = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [listSearch, setListSearch] = useState([]);

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

    return (
        <div className="adaptiveModeBox">
    <div className="logoSearch">

       <Link to="../home" style={{textDecoration: "none"}}>
            <h1 className={darkMode ? "blue logo" : "logo"} >.SOCIAL</h1>
       </Link>

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
               <div className="autocomplete1">
                    {
                        listSearch.map((item, index) => {
                            return (
                                <div className="autocompleteItem1" onClick={itemClicked} key={index}>

                                    <Link to={`/profile/${item._id}`} 
                                          state= {{ searchId: item._id }}  
                                          style={{textDecoration: "none", color: "inherit"} }
                                          className="link"
                                    >
                                        <span>{item.firstname} {item.lastname}</span>
                                        <span>{item.username} </span>
                                    </Link>
                                    
                                </div>
                            )
                            
                        })
                    }
                </div>    
            : null}
            
       </div>
      
    </div>
    <div className="nav">
        <NavBar/>
    </div>
    
        </div>
    )
}

export default LogoSearch;
