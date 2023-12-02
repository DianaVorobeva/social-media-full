import React, { useEffect, useState } from "react";
import './Post.css';
import './AdaptivePost.css';
import { IoMdHeart } from "react-icons/io";
import { BiSolidCommentDetail } from "react-icons/bi";
import Comments from "../comments/Comments";
import {  useSelector } from "react-redux";
import { likePost } from "../../API/PostRequest";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { getUser } from "../../API/UserRequest";


const Post= ({data}) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);
    const [postUserData, setPostUserData] = useState(user);
    const [comments, setComments] = useState(data.comments);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);
    const postUserId = data.userId;
    
    const handleLike = () => {
      likePost(data._id, user._id);
      setLiked((prev) => !prev);
      liked ? setLikes((prev) => prev-1): setLikes((prev) => prev+1)
    };


    useEffect(()=>{
      if(data!==null) {
        const getUserData = async () => {
          try {
            const { data } = await getUser(postUserId);
            setPostUserData(data);
          } catch (error) {
          console.log(error);
         }
      }
      getUserData()
    };
      
    
    },[user])



    return (
    <div className="post" > 

        <div className="info">

            <div>
                <img  
                 src={postUserData.profilePicture 
                  ? process.env.REACT_APP_PUBLIC_FOLDER + postUserData.profilePicture 
                  : process.env.REACT_APP_PUBLIC_FOLDER + "defaultCoverPicture.jpg"}  alt="userImg"
                />

                <Link to={`/profile/${postUserId}`}  
                      style={{textDecoration: "none", color: "inherit"} }
                >
                <div className="wrapper3">
                  <span>{postUserData.firstname} {postUserData.lastname}</span>
                  <span>{postUserData.username}</span>
                </div>
                </Link>
                <span className="date">{format(data.createdAt)}</span>
            </div>
            <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "10px",
                }}
              />
            
            <p className="desc">{data.desc}</p>
       </div>

       <img 
       src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} 
       alt="postImg"
       className="imgSize"
       />

       <div className="postReactions">
            <span onClick={handleLike}>{liked ? <IoMdHeart className="red" style={{cursor: "pointer"}}/> : <IoMdHeart style={{cursor: "pointer"}}/>}</span>
            <span><BiSolidCommentDetail onClick={() => {setCommentOpen(!commentOpen)}}/></span>
       </div>

       <span style={{color: "var(--gray)", fontSize: "14px"}}>{likes} likes</span>
       
       {commentOpen && <Comments 
                        comments={comments} 
                        postId={data._id} 
                        postUserId={data.userId}
                        currentUser={user} 
                        setComments={setComments}
                        />}
    </div>
    )
}

export default Post;
