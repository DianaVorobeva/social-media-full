import { useContext } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeContext } from './context/DarkModeContext';
import { useSelector } from 'react-redux';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';

function App() {

  const { darkMode }  = useContext(DarkModeContext);
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className={darkMode ? "App-dark " : "App-light"}>
      <Routes>
        <Route path='/' element={user ? <Navigate to = "home"/> : <Navigate to = "auth"/>}/>

        <Route path='/home' element={user ? <Home/> : <Navigate to = '../auth'/>}/>

        <Route path='/auth' element={user ? <Navigate to = "../home"/> : <Auth/>}/>

        <Route path='/profile/:id' element = {user ? <Profile/> : <Navigate to="../auth"/>}/>

        <Route path="/chat" element={user ? <Chat/> : <Navigate to="../auth"/>}/>
      </Routes>
    </div>
  );
}

export default App;
