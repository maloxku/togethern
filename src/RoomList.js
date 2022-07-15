/*
Author: Dustin Rischke
*/

import React, {useState, useEffect} from 'react'
import './RoomList.css'
import { getAllRooms, enterRoom, leaveRoom, createNewRoom, setRoomVideo, setRoomStatus } from './RoomSystem'


export default function RoomList({currentRoom, userId, changeRoom}) {
    var [roomlist, updateRoomlist] = useState({}) //list of all available rooms
    var className //help var to determine the room the current user is in

    useEffect(()=>{ //initialize useEffect
        getAllRooms()
        .then(data => updateRoomlist(data)) 
        
    },[])   
  
    function displayRooms(){ //function to display all Rooms as idividual List elements
        var contentKeys = Object.keys(roomlist) //gets all keys of the roomlist json object (= rooms)
        var allRooms = contentKeys.map(  //maps an array of all first level keywords of json object
            (key) => roomlist[key].map( //gives the 2nd level keywords into a new array (= room)
                (property) => {     //3rd level keywords of room properties (name)

                    if(currentRoom !== undefined && currentRoom === property.name){ //determines the users current room if given so the room can be highlighted
                        className = 'current-Room'
                    } else {
                        className = 'other-Room'
                    }
                    return (
                        <li className = {className} key={property.name}> 
                        <button className={"room-button-" +className} onClick={() =>
                            {
                            enterRoom(property.name, userId)
                            changeRoom(property.name)
                            }
                        }> {property.name} </button>   
                        </li>
                    )
                }
                
            )
        )
  
      return (
        <div>
            {allRooms}
        </div>
      )
    }
    
    
    
  
    useEffect(()=>{
      var intervall = setInterval(() => {
        getAllRooms()
        .then(data => updateRoomlist(data)) //updates the Roomlist every second, currently trying to use useMemo here to optimize render and data
                                            // current Problem: react doesnt allow hooks like useMemo, useCallback,... in other "Callbacks" bc appearently useEffect is a Callback???
      },1000)
  
      return () => clearInterval(intervall)
    },)   
      
    return (
        <div className="roomlist-wrapper"> 
            <h1 className="room-header">Room List</h1>
            <ul className="room-list">
                {displayRooms()}
            </ul>
            <button className="create" onClick={async() => 
                {
                    let response = await createNewRoom() 
                    setRoomVideo(response['name'], userId, 'https://www.youtube.com/watch?v=SBxpeuxUiOA' )
                    setRoomStatus(response['name'], userId, 'paused' )
                    changeRoom(response['name'])
                    enterRoom(response['name'], userId)
                }
            }>Create New Room</button>
            {currentRoom !== undefined && <button className="delete" onClick={() =>
                {
                changeRoom()
                leaveRoom(currentRoom, userId)
                }
            }> Leave Room</button>} {/* renders a button to leave the room if user is in a room */}
        </div>
      
    )
}
