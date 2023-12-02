import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction";
import { useState } from "react";

const User = ({person}) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));

    const dispatch = useDispatch();

    const handleFollow = () => {
        following 
        ? dispatch(unFollowUser(person._id, user))
        : dispatch(followUser(person._id, user));

        setFollowing((prev) => !prev);
    }

    return (
        <div className="follower">
            <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfilePicture.png"} alt="userPicture" className="followerImg"/>
            <div className="wrapper">
                <span>{person.firstname} {person.lastname}</span>
                <span style={{color: "silver"}}>{person.username}</span>
            </div>
            <button className={following ? "button followerBtn unfollowButton" : "button followerBtn"} onClick={handleFollow}>{following ? "Unfollow" : "Follow"}</button>
        </div>
    )
}

export default User;