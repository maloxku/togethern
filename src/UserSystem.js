/*
Author: Dustin Rischke
*/

import React from 'react'

export default function UserSystem() {
  return (
    <div>UserSystem</div>
  )
}

const fetchUrl = 'https://gruppe16.toni-barth.com/'

function getAllUsers () { //returns a Promise that contains all existing users
 
    return fetch(fetchUrl +'users/')
    .then((res) => {
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

async function createNewUser (username) {// creates new user and returns a Promise that contains all info of the new user
    return await fetch(fetchUrl +'users/', {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            name: username,
        })
    })
    .then(res => {
        //console.log(res.status)
       
        if (!res.ok){
            throw Error('Failed to create new User: ' + username)
        } else{
            console.log('new user created successfully')
        }
        
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

async function deleteUser (userid) {//deletes specific user
    return await fetch(fetchUrl +'users/'+ userid , {
        method: 'DELETE',
        headers: {
            'content-type':'application/json'
        }    
    }).then(res => {
        //console.log(res.status)
        if (!res.ok){
            throw Error('Failed to delete User with userid: ' + userid)
        } 
        //return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 

export {getAllUsers, createNewUser, deleteUser}

