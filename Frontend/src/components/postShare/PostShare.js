import React, { useState, useRef } from "react";
import './PostShare.css';
import './AdaptivePostShare.css';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const PostShare = ({location}) => {
    const loading = useSelector((state) => state.postReducer.uploading);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img)
        }
    }

    const reset = () => {
        setImage(null);
        desc.current.value = null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }

        if(image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;
            
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }

            dispatch(uploadPost(newPost));
            reset()
        }
    }

    return (
    <div className="postShare">
       
        <div className="block">
            <div className="wrapper11">
            <img 
            src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfilePicture.png"} 
            alt="userImg"
            className="imgProfile"
            />
            <input 
            type="text" 
            placeholder="What's happening?" 
            ref={desc} 
            required
            />
            </div>

             <div className="shareOptions">

                <div className="option" 
                onClick={()=>imageRef.current.click()}>
                    <HiOutlinePhoto style={{color:"E95793", fontSize: "30px", marginRight: "5px"} }/>
                    <span>Photo</span>
                </div>

                <button 
                className="button psBtn" 
                onClick={handleSubmit}
                disabled={loading}
                >
                    {loading ? "Uploading..." : "Share"}
                </button>

                <div style={{display:"none"}}>
                    <input
                     type="file" 
                     name="myImage" 
                     ref={imageRef} 
                     onChange={onImageChange}/>
                </div>

            </div>

            
        </div>
        {image && (

            <div className="imagePreview">
                <AiOutlineClose onClick={()=>setImage(null)}/>
                <img src={URL.createObjectURL(image)} alt="capturedImage"/>
            </div>
        )}
    </div>
    )
}

export default PostShare;
