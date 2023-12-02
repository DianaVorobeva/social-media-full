import React, { useEffect, useState } from "react";
import './FollowersCard.css';
import './AdaptiveFollowersCard.css';
import { useSelector } from "react-redux";
import User from "../user/User";
import { getAllUsers } from "../../API/UserRequest";
import { Link } from 'react-router-dom';


const FollowersCard = () => {

    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async() => {
            const { data } = await getAllUsers();
            let idSet = new Set(user.followers);
            let UserFollowers = data.filter(elem => idSet.has(elem._id));
            setPersons(UserFollowers);
        }
        fetchPersons();
    }, [])


    return (
    <div className="followersCard">
        <h3>They follow you</h3>
        {persons.map((person,id)=> {
            if(person._id !== user._id) {
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

export default FollowersCard;
