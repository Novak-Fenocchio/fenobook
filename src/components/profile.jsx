import React, { Component, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Post from './smallComponents/post';
const cookies = new Cookies();


/* function Profile(match) {
    
    const [postsUser, setPostsUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const images = [
        'https://image.flaticon.com/icons/png/128/2922/2922510.png',
        'https://image.flaticon.com/icons/png/128/2922/2922515.png',
        'https://image.flaticon.com/icons/png/128/2922/2922565.png',
        'https://image.flaticon.com/icons/png/128/2922/2922656.png',
        'https://image.flaticon.com/icons/png/128/2922/2922715.png',
        'https://image.flaticon.com/icons/png/128/2922/2922546.png',
        'https://image.flaticon.com/icons/png/128/2922/2922532.png',
        'https://image.flaticon.com/icons/png/128/2922/2922522.png',
        'https://image.flaticon.com/icons/png/128/2922/2922575.png',
        'https://image.flaticon.com/icons/png/128/2922/2922624.png',
        'https://image.flaticon.com/icons/png/128/2922/2922671.png'
    ];

    let userPerfile = '';

    async function  getProfile () 
    {
         userPerfile = 
        {
           user: match.match.params.user,
           username: match.match.params.user
        }
        
        if(postsUser == false)
        {
            axios.post('http://localhost:1500/user/searchUserByName', userPerfile)
            .then(res => setPostsUser(res.data[0]))
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
    )
} */
    /* 
    export default class profileClass extends Component {

        constructor(props)
        {
            super();
            this.state = {
                userID: '607421b71233fd3e643600a6'
            } 
        }

        componentDidMount()
        {   
            this.setState({
                userID: this.props.userID
            })
        } */

   /*  searchProfile = (id) =>
    {
        const userToFind = {
            id: this.state.userID
        }

        axios.post('http://localhost:1500/user/searchUser', userToFind)
        .then(res => {
           return ('dawaaaw');
       })
       .catch(err => console.log(err))
    } */

/*     render() {
        return (
            <div>
            <header className='background-profile'>
            </header>
            <div className='containerPosts'>

                <h1 className='my-3'>{this.state.userID}</h1>

            </div>

        </div>
        )
    }
}
 */