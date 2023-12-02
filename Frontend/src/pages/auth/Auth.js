import React, { useState } from "react";
import './Auth.css';
import './AdaptiveAuth.css';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from "../../actions/AuthAction.js";


const Auth= () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(true);
    

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: ""
    });

    const [confirmPass, setConfirmPass] = useState(true);


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            data.password === data.confirmpass 
            ? dispatch(signUp(data)) 
            : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    }

    const resetForm = () => {
        setData(data);
        setConfirmPass(confirmPass);
      };

    return (
    <div className="auth">
        {/* Left side */}
        <div className="leftAuth">
            <h1>.SOCIAL</h1>
            <h3>Here you can find friends easily</h3>
        </div>

        {/* Right side */}

         <div className="bgRight">
            <form className="infoForm authForm" onSubmit={handleSubmit}>

                <h3>{isSignUp ? "Sing Up" : "Login"}</h3>
                   
                {isSignUp && 
                    <div>
                        <input 
                        type="text" 
                        placeholder="First name" 
                        className="infoInput" 
                        name="firstname"
                        onChange={handleChange}
                        value={data.firstname}
                        />

                        <input 
                        type="text" 
                        placeholder="Last name" 
                        className="infoInput" 
                        name="lastname"
                        onChange={handleChange}
                        value={data.lastname}
                        />
                        
                    </div>
                }
                
                    
                <div>
                    <input 
                    type="text" 
                    placeholder="Username" 
                    className="infoInput" 
                    name="username"
                    onChange={handleChange}
                    value={data.username}
                    />
                </div>

                <div>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    className="infoInput" 
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    />

                    {isSignUp &&
                        <input 
                        type="password" 
                        placeholder="Confirm password" 
                        className="infoInput" 
                        name="confirmpass"
                        onChange={handleChange}
                        value={data.confirmpass}
                        />
                   }
                </div>
                
                <span style={{
                    display: confirmPass ? "none" : "", 
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "center",
                    marginRight: "5px",}}>
                    * Confirm Password is not same!
                </span>

                <div>
                    <span style={{fontSize:"12px", cursor:"pointer"}} onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}>
                        {isSignUp 
                        ? "Already have an account? Login!" 
                        : "Don`t have an account? Sing Up!"}
                    </span>
                </div>

                <button className="button singUpBtn" type="submit" disabled={loading}>
                    {loading ? "loading..." : isSignUp ? "Sing Up" : "Login"}
                </button>

            </form>
        </div>

    </div>
    )
}



export default Auth;
