//Deletes all rooms and users

import React, {useState, useEffect} from 'react'
import { getAllUsers, createNewUser, deleteUser } from './UserSystem'
import { getAllRooms, getAllUsersinRoom, enterRoom, leaveRoom } from './RoomSystem'

export default function Cleanup() {

    var roomlist
    var userlist
  
    async function deleteeverything(){
         await getAllRooms().then(rooms => roomlist = rooms)

        console.log(roomlist['rooms'])

        await roomlist['rooms'].forEach(async(room) => {
           /*  let response = await createNewUser("##delete##") 
            await enterRoom(room.name, response['id']) */
            await getAllUsersinRoom(room.name).then(users => userlist = users)
            console.log(userlist['users'])
            await userlist['users'].forEach(async(user) => {
                leaveRoom(room.name, user.id)
            })
            
        }); 

        await getAllUsers().then(users => userlist = users)
        console.log(userlist['users'])
        await userlist['users'].forEach(async(user) => {
            deleteUser(user.id)
        }) 

    }

    
    deleteeverything()
}
