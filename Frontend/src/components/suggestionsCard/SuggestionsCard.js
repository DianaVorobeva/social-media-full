import React, { useEffect, useState } from "react";
import './SuggestionsCard.css';
import './AdaptiveSuggestionsCard.css';
import { Link } from 'react-router-dom';
import User from "../user/User";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../API/UserRequest";

const SuggestionsCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [suggestionArray, setSuggestionArray] = useState([]);
    const followingsId = user.following;
    const [allUsers, setAllUsers] = useState([]);
    

    useEffect(() => {
        const fetchPersons = async() => {
            const { data } = await getAllUsers();
            setAllUsers(data);
        }
        fetchPersons();
    }, [user]);

    useEffect(() => {
        if(allUsers!==null) {
            let idSet = new Set(followingsId);
            let notUserFollowings = allUsers.filter(elem => !idSet.has(elem._id));
            setSuggestionArray(notUserFollowings.filter(elem => elem._id!==user._id))
        }    
        }, [allUsers]);



    return (
    <div className="followersCard">
        <h3>Suggestions for you</h3>
        {suggestionArray.map((person,id) => {
            if(person) {
                return (
                    <Link to={`/profile/${person._id}`} 
                          state= {{ searchId: person._id }}  
                          style={{textDecoration: "none", color: "inherit"} }
                          key={id}
                          className="link"
                    >
                        <User person={person}/>               
                    </Link>
              
            ) 
            }
        })}
    </div>
    )
}

export default SuggestionsCard;
