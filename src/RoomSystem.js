/*
Author: Dustin Rischke
*/

export default function RoomSystem() {

}
// varies get,put,delete,..... api methods concerning the rooms
//api readme here: https://gitlab.hs-anhalt.de/barth_to/watch2gether

const fetchUrl = 'https://gruppe16.toni-barth.com/'

async function getAllRooms () { //returns a Promise that contains all existing rooms
    return await fetch(fetchUrl +'rooms/')
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to fetch')
        } 
        return res.json()
    })
   
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function createNewRoom () { //creates a new room and returns a promise that contains the rooms information
    return await fetch(fetchUrl +'rooms/', {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        }
    })
    .then(res => {
        //console.log(res.status)
        
        if (!res.ok){
            throw Error('Failed to create new room')
        } else {
            console.log('new room created successfully')
        }
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function enterRoom (roomname, userid) { //enters a room 
    return await fetch(fetchUrl +'rooms/' + roomname + "/users", {
        method: 'PUT',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            user: userid
        })
    })
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('userid: ' + userid + ' failed to enter room: ' + roomname)
        } else {    
            console.log('Room entered successfully')
        } 
        //return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function getAllUsersinRoom (roomname) { //returns a Promise that contains all users in a specific rooms
    return await fetch(fetchUrl +'rooms/' + roomname + "/users")
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to get all users in room: ' + roomname)
        } 
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function leaveRoom (roomname, userid) { //leaves a room
    return await fetch(fetchUrl +'rooms/' + roomname + "/users",{
        method: 'DELETE',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            user: userid
        })
    }).then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to remove userid: ' + userid + ' from room: ' + roomname)
        } else {    
            console.log('User removed successfully')
        } 
        //return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function getRoomStatus (roomname) { //returns a Promise that contains a rooms status (paused/playing)
    return await fetch(fetchUrl +'rooms/'+ roomname+'/status')
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to fetch room status on room: ' + roomname)
        } else {    
            //console.log('Room status fetched successfully')
        } 
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function setRoomStatus (roomname, userid, status) { //sets a room status (paused/playing)
    return await fetch(fetchUrl +'rooms/'+ roomname+'/status', {
        method: 'PUT',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            user: userid,
            status: status
        })
    })
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to set roomstatus on room: ' + roomname)
        } else {    
            console.log('Room status updated successfully')
        } 
        //return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
}

async function getRoomVideo (roomname) { //returns a Promise that contains the rooms video url
    return await fetch(fetchUrl +'rooms/'+ roomname+'/video')
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to fetch room status on room: ' + roomname)
        } else {    
            console.log('Room Video fetched successfully')
        } 
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function setRoomVideo (roomname, userid, videourl) { //changes a rooms video url
    return await fetch(fetchUrl +'rooms/'+ roomname+'/video', {
        method: 'PUT',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            user: userid,
            url: videourl
        })
    })
    .then(res => {
        console.log(res.status)
        if (!res.ok){
            throw Error('Failed to set room video on room: ' + roomname)
        } else {    
            console.log('Room video updated successfully')
        } 
        //return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
}

async function setRoomTime (roomname, userid, position) { //changes the current time of the rooms video
    return await fetch(fetchUrl +'rooms/'+ roomname+'/position', {
        method: 'PUT',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            user: userid,
            position: position
        })
    })
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to set save roomtime in: ' + roomname)
        } else {    
            console.log('Room time was set successfully')
        } 
        //return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
}

async function getRoomTime (roomname) { //returns a Promise that contains the videos current time 
    return await fetch(fetchUrl +'rooms/'+ roomname+'/position')
    .then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to get room time in room: ' + roomname)
        }
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
}

export {getAllRooms, createNewRoom, enterRoom, getAllUsersinRoom, leaveRoom, getRoomStatus, setRoomStatus, getRoomVideo, setRoomVideo, setRoomTime, getRoomTime}