/*
Author: Dustin Rischke
*/

import React, {useState, useEffect} from 'react'
import './UserList.css'
import { getAllUsers } from './UserSystem'
import { getAllUsersinRoom } from './RoomSystem'
import blankpfp from './material/index.png'

export default function UserList(props) {
  var [userlist, updateUserlist] = useState({}) //list of all users
  var className //help var to determine the room the current user is in

  useEffect(()=>{
    if (props.currentRoom !== undefined) { //if a room is given in props
      getAllUsersinRoom(props.currentRoom)  //user must be in room
      .then(data => updateUserlist(data)) //so fetches all users in the current room
    } else {
      getAllUsers()   //if none is given user must be in "lobby"
      .then(data => updateUserlist(data)) //so gives back all users
    }
      
  },[props.currentRoom])   

  function displayUsers(){ //function to display all users as idividual List elements
    var contentKeys = Object.keys(userlist)  //gets all keys of the userlist json object (= users)
    var allUsers = contentKeys.map( //maps an array of all first level keywords of json object
      (key) => userlist[key].map( //gives the 2nd level keywords into a new array (= user)
        (property) =>   { //3rd level keywords of room properties (= name, id)
          if (props.userId === property.id){
            className = 'current-user'
          } else {
            className = 'other-user'
          }
          return (
            <li className={className} key={property.id}> 
              <img className="pfp" alt = 'blank profile stockfoto' src={blankpfp}/><p className="element-Text">User: {property.id} <br /> {property.name}  </p>  
              
            </li>
          )
        }
      )
    )

    return allUsers
  }
  
  
  

  useEffect(()=>{
    var intervall = setInterval(() => {
      if (props.currentRoom !== undefined) {
        getAllUsersinRoom(props.currentRoom)
        .then(data => updateUserlist(data)) // updates the userlist every second, currently trying to use useMemo here to optimize render and data
                                            // current Problem: react doesnt allow hooks like useMemo, useCallback,... in other "Callbacks" bc appearently useEffect is a Callback???
      } else {
        getAllUsers()
        .then(data => updateUserlist(data)) // updates the userlist every second, currently trying to use useMemo here to optimize render and data
                                            // current Problem: react doesnt allow hooks like useMemo, useCallback,... in other "Callbacks" bc appearently useEffect is a Callback???
      }
    },1000)

    return () => clearInterval(intervall)
  },)   
    
  return (
    <div className="userList-wrapper">
      <h1 className="user-header">Active User</h1>
      <ul className="User-List">
        {displayUsers()}
      </ul>
    </div>
  )
}
