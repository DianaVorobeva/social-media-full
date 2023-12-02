import React from "react";
import './PostSide.css';
import './AdaptivePostSide.css';
import PostShare from "../postShare/PostShare";
import Posts from "../posts/Posts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const PostSide = ({location}) => {
    const params = useParams();
    let profileUserId = params.id;
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
    <div className="postSide">
        {
            location !== 'profilePage' || user._id === profileUserId
            ? <PostShare/>
            : 
            <Link 
            to="../chat"
            style={{textDecoration: "none", color: "inherit"}}
            className="button btnWriteToUser"
            >
                Send a message
            </Link>
        }
        <Posts/>
    </div>
    )
}

export default PostSide;
