import React, { useEffect, useRef, useState } from "react";
import './Comments.css';
import './AdaptiveComments.css';
import { format } from "timeago.js";
import { addComment, deleteComment, updateComment } from "../../actions/postAction";
import { useDispatch } from "react-redux";
import { FiEdit } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';




const Comments = ({comments, postId, currentUser, setComments, postUserId}) => {
    const yourComment = useRef();
    const yourNewComment= useRef();
    const idOf = useRef(0);
    const [commentId, setCommentId] = useState("");
    const [newComment, setNewComment] = useState();
    const [updateBox, setUpdateBox] = useState(false);
    const [updateText, setUpdateText] =  useState();
    const dispatch = useDispatch();
    
    const onCommentChange = (e) => {
        let currentComment = e.target.value;
        setNewComment(currentComment)
    }

    const onCommentUpdate = (e) => {
        let currentText = e.target.value;
        setUpdateText(currentText)
    }

    const addNewComment = async() => {
  
        if(newComment===null) {
            alert("Please write a comment")
        } else {
            const data = {
                commentatorImage: currentUser.profilePicture,
                commentatorName: currentUser.firstname + currentUser.lastname,
                text: newComment,
                userId: currentUser._id
            }
        
            try {
               dispatch(addComment(postId, data));
                setNewComment("");
                yourComment.current.value = "";
                setComments([...comments, data]);
              }
              catch
              {
                console.log("error")
              }
        }
    }

    useEffect(()=> {
        let set=()=>{setCommentId(idOf.current.id)};
    set();
    },[])
    
    // delete a comment
    
    const deleteThisComment = async()=> {
       

        const data = {
            commentId: commentId
            } 
        
        try {
            dispatch(deleteComment(postId, data));
           
            }
        catch
            {
                console.log("error")
            }
        }
    
        // update comment

    const updateThisComment = async() => {

            const data = {
                commentId: commentId,
                text: updateText
            }
        
            try {
               dispatch(updateComment(postId, data));
               setUpdateBox(!updateBox)
              }
              catch
              {
                console.log("error")
              }
    }


 

    return (
        <div>
        {updateBox===false
        ?
        <div className="commentBox">    
        <div className="writeInput">
            <img src={process.env.REACT_APP_PUBLIC_FOLDER + currentUser.profilePicture} alt="profileImg"/>
            <input
            type="text" 
            placeholder="write a comment"
            name="yourComment"
            ref={yourComment}
            onChange={onCommentChange}/>
            <button className="button sendBtn" onClick={addNewComment}>Send</button>
        </div>
       
       {comments.map((comment,id) => {
        
        return (
        <div key={id} className="comments" ref={idOf} id={comment._id}>
            <img src={comment.commentatorImage ? process.env.REACT_APP_PUBLIC_FOLDER + comment.commentatorImage : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfilePicture.png" } alt="profileImg"/>
            <div className="info">
                <span>{comment.commentatorName}</span>
                <p>{comment.text}</p>
                
            </div>
            <div>
                <span className="date">{format(comment.createdAt)}</span> 
                <div className="wrapper5">
                    <FiEdit 
                    onClick={()=>{
                        setCommentId(comment._id); 
                        setUpdateBox(!updateBox)}
                    }
                    className={comment.userId===currentUser._id ? "" : "updateBoxNone"}
                    />
                    <AiOutlineClose 
                    onClick={() => {
                        setCommentId(comment._id); 
                        deleteThisComment()}
                        } 
                    style={{cursor: "pointer",fontSize: "15px"}}
                    className={comment.userId===currentUser._id || currentUser._id===postUserId ? "" : "updateBoxNone"}
                    />
                </div>
            </div>
            
        </div>)
       })} </div>
        : <div className={updateBox===true ? "updateBox" : "updateBoxNone"}>
            <h1>Updating the comment...</h1>
            <div className="writeInput">
                <input
                type="text" 
                placeholder="write a new text"
                name="yourNewComment"
                ref={yourNewComment}
                onChange={onCommentUpdate}
                />
                <button className="button sendBtn" onClick={updateThisComment}>Update</button>
            </div>
          </div>
            }
   </div>
    )
}

export default Comments;
