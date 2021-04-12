import React, { Component, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Post from './smallComponents/post';

const cookies = new Cookies();


export default function Profile(match) {
    
    const [postsUser, setPostsUser] = useState([])

    let userPerfile = '';

    async function  getProfile () 
    {
         userPerfile = 
        {
           user: match.match.params.user
        }
        if(postsUser == false)
        {
            axios.post('http://localhost:1500/dashboard/user', userPerfile)
            .then(res => setPostsUser(res.data))
            .catch(err => console.log(err))  
        }

    }

    const renderPosts = () =>
    {
        return postsUser.map(post =>
            {
                return (
                    <Post user={post.user} body={post.body} />
                )
            })
    }

    getProfile();

    return (
        <div>
            <div className='containerPosts'>
                <h1 className='my-3'>{userPerfile.user}</h1>
                 {renderPosts()} 
            </div>

        </div>
    )
}
