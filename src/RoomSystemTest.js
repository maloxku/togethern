/*
Author: Dustin Rischke
*/

import React, {useState} from 'react'
import {getAllUsers, createNewUser, deleteUser} from './UserSystem'
import {getAllRooms, createNewRoom, enterRoom, getAllUsersinRoom, leaveRoom, getRoomStatus, setRoomStatus, getRoomVideo, setRoomVideo, setRoomTime, getRoomTime} from './RoomSystem'

//Dont use in working build
//test feature for fetch request

export default function RoomSystemTest() {

    const [number, changeNumber] = useState(0)
    const [roomname, changeName] = useState("")
   


  return (
    <div>
        <h1>RoomSystemTest</h1>
        <button onClick={() =>{getAllUsers()}}>All Users</button>
        <button onClick={() =>{createNewUser("Ben Dover")}}>Create User "Ben, Dover"</button>
        <input type="text" value={number} onChange={e => changeNumber(e.target.value)} />
        <button onClick={() =>{deleteUser(number)}}> c-- Delete User ID" </button>
        <button onClick={() =>{getAllRooms()}}>All Rooms</button>
        <button onClick={() =>{createNewRoom()}}>Create room</button>
        <input type="text" value={roomname} onChange={e => changeName(e.target.value)} />
        <input type="text" value={number} onChange={e => changeNumber(e.target.value)} />
        <button onClick={() =>{enterRoom(roomname, number)}}>Enter Room {roomname} with ID = {number} </button>
        <button onClick={() =>{getAllUsersinRoom(roomname)}}>All Users in Room {roomname}</button>
        <button onClick={() =>{getRoomStatus(roomname)}}>get Status of Room {roomname}</button>
        <button onClick={() =>{setRoomStatus(roomname, number, "playing")}}>set room {roomname} to playing</button>
        <button onClick={() =>{setRoomStatus(roomname, number, "paused")}}>set room {roomname} to paused</button>
        <button onClick={() =>{getRoomVideo(roomname, number)}}>get Room Video </button>
        <button onClick={() =>{setRoomVideo(roomname, number, 'https://www.youtube.com/watch?v=SBxpeuxUiOA' )}}>set the Room Video</button>
        <button onClick={() =>{getRoomTime(roomname, number)}}>get the Room time</button>
        <button onClick={() =>{setRoomTime(roomname, number, 100 )}}>set the Room time</button>
        <button onClick={() =>{leaveRoom(roomname, number)}}>Leave Room {roomname} with ID = {number}</button>
    </div>
  )
}
