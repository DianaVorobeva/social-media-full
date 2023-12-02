import {AiOutlineClose} from 'react-icons/ai';
import './SupportModal.css';
import './AdaptiveSupportModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toSupport } from '../../actions/supportAction';

export default function SupportModal({modalOpened,setModalOpened,toggleModal}) {
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    phoneNumber: "",
    text: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = formData;
    try {
      dispatch(toSupport(data));
      
    
        setShowSuccess(true)
      console.log(showSuccess)
    } catch (error) {
      console.log("error")
    }
    // setModalOpened(false);
  };


  return (
    <>
{modalOpened && 
 (
      
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content2">
            {showSuccess===false && (
              <div className='box13'>
                <h2 className='text'>Do you have any questions about App?</h2>
            <h2 className='text'>Did you face with some problems?</h2>
            <p className='desc2'>Describe your issue and we will try to help you soon!</p>
             <form className='infoProfile' onSubmit={handleSubmit}>
                <div className='box'>
                    <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='infoInput'
                    value={user.username}
                    onChange={handleChange}
                    />
                </div>

                <div className='box'>
                <input
                    type='number'
                    placeholder='Telephone number'
                    name='phoneNumber'
                    className='infoInput'
                    onChange={handleChange}
                    />
                </div>

                <div className='box'>
                <textarea
                 placeholder='Describe your problem'
                 name='text'
                 type='text'
                 onChange={handleChange}
                 className='infoInput'
                />
                </div>
                
                <button className='button changeBtn' type="submit">Send</button>
            </form>
              </div>
              
            )}
            {showSuccess===true && (
              <div className='wrapper6'>
              <div className="heart"></div>
              <p className='text'>We will answer you soon!</p>
              </div>
            )}
            
            <AiOutlineClose className="close-modal" size={45} onClick={toggleModal}/>
            
          </div>
        </div>
      )
      }
{showSuccess===true && (
  <div>Thanks</div>
)}
    </>
  );
}