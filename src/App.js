import React from "react";
import NavigationBar from './NavigationBar'
import './App.css';
import { createNewUser, deleteUser} from './UserSystem';
import Videoplayer from './Videoplayer';
import { useState, useEffect, useRef }  from'react';
import UserList from './UserList';
import { leaveRoom } from "./RoomSystem";
import RoomSystemTest from './RoomSystemTest';
import RoomList from './RoomList';
import logo from "./material/logo_dark.png"
import Cleanup from "./Cleanup";


 //https://stackoverflow.com/questions/67463964/react-useeffect-and-setinterval


function App() {
  
  
  const [user, changeUser] = useState()
  const [currentRoom, changeRoom] = useState()
  //var currentRoom  = useRef()
  
  const roomChanger = (roomName)=>{
    changeRoom(roomName)
  }
  
   window.addEventListener("beforeunload", (ev) => 
  {  
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
  }) 
  window.addEventListener("unload", (ev) => 
  {  
    ev.preventDefault();
    if (currentRoom !== undefined){
      leaveRoom(currentRoom, user.id)
    }
    deleteUser(user.id)
    
  }) 

  function Login() {
  
    const inputRef = useRef()
    const handleSubmit = async(e) => {
      if (inputRef.current.value !== undefined) {
        e.preventDefault();
        console.log('You clicked submit.')
        let response = await createNewUser(inputRef.current?.value) 
        changeUser ( {
          id: response['id'],
          name: response['name'],
        })
      } else {
        inputRef.focus()
      }
    }
  
    return(
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="centered">
            <img className="loginLogo" alt = "Logo of Togethern" src={logo}/>
          </div>
          <h1 className="login-title"> Login Page</h1>
          <h2 className="login-subtitle">Please choose a username to continue!</h2>
          <label className="centered">
            <input ref={inputRef} type="text" required/>
          </label>
          <div className="centered">
            <button className="submit-button" type="submit"><b>Submit</b></button>
          </div>
        </form>
      </div>
    )
  }

  function MainPage() {
    return (
      <div className="content-container">
        <div className="row">
          <div className="memberlist-box">
            <UserList currentRoom = {currentRoom} userId = {user.id} /> 
          </div>
          <div className="video-box">
            {currentRoom !== undefined && <Videoplayer roomname = {currentRoom} userId={user.id}/>}
          </div>
          <div className="roomlist-box">
            <RoomList currentRoom = {currentRoom} userId = {user.id} changeRoom={roomChanger} /> 
          </div>
        </div>
      </div>
    )
}

  
  return (
    <div>
      <NavigationBar/> 
      {user === undefined && <Login/>}
      {user !== undefined && <MainPage/>}      
    </div>
    
  )
}


/* <NavigationBar/>

<RoomSystemTest />

<div>
<UserList />
<Videoplayer roomname = {currentRoom} userId={userid}/>
<RoomList/>
</div>

{/* <UserList userid = {userid} currentRoom = {currentRoom}/>
<RoomList userid = {userid} currentRoom = {currentRoom} /> */

/* <button onClick={() =>{createNewUser("Ben Dover")}}>Create User "Ben, Dover"</button>
<input type="text" value={number} onChange={e => changeNumber(e.target.value)} /> */

export default App;




