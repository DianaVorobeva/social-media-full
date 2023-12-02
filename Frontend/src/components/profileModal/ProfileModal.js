import {AiOutlineClose} from 'react-icons/ai';
import './ProfileModal.css';
import './AdaptiveProfileModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

export default function ProfileModal({modalOpened,setModalOpened,toggleModal,data}) {
  
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };


  return (
    <>
{modalOpened && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Your info</h2>
            <form className='infoProfile'>
                <div className='box'>
                    <input
                    type='text'
                    placeholder='First name'
                    name='firstname'
                    className='infoInput'
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    />

                    <input
                    type='text'
                    placeholder='Last name'
                    name='lastname'
                    className='infoInput'
                    value={formData.lastname || ""}
                    onChange={handleChange}
                    />
                </div>

                <div className='box'>
                <input
                    type='text'
                    placeholder='Work at'
                    name='workAt'
                    className='infoInput'
                    value={formData.workAt ? formData.workAt : ""}
                    onChange={handleChange}
                    />
                </div>

                <div className='box'>
                    <input
                    type='text'
                    placeholder='Lives in'
                    name='livesIn'
                    className='infoInput'
                    value={formData.livesIn ? formData.livesIn : ""}
                    onChange={handleChange}
                    />

                    <input
                    type='text'
                    placeholder='Country'
                    name='country'
                    className='infoInput'
                    value={formData.country ? formData.country : ""}
                    onChange={handleChange}
                    />
                </div>

                <div className='box'>
                <input
                    type='text'
                    placeholder='Relationship status'
                    name='relationship'
                    className='infoInput'
                    value={formData.relationship || ""}
                    onChange={handleChange}
                />
                </div>

                <div className='box'>
                  <div className='col'>
                      Profile image
                      <input type="file" name="profileImage" onChange={onImageChange} className='infoInput'/>    
                  </div>
                  <div className='col'>
                      Cover image
                      <input type="file" name="coverImage" onChange={onImageChange} className='infoInput'/>
                  </div>
                </div>
                
                <button className='button changeBtn' onClick={handleSubmit}>Update</button>
            </form>
            <AiOutlineClose className="close-modal" size={45} onClick={toggleModal}/>
            
          </div>
        </div>
      )}
      
    </>
  );
}