import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Post from './smallComponents/post';
const cookies = new Cookies();

export default class profileClass extends Component {

    constructor(props)
    {
        super();
        this.state = {
            userID: '607421b71233fd3e643600a6',
            username: cookies.get('usuarioParaBuscar'),
            useravatar: '',
            images : [
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
            ],
            posts: [],
        } 
    }

    componentDidMount()
    {
        const userToFind = {
           username: this.state.username
        }

        axios.post('http://localhost:1500/user/searchUserByName', userToFind)
        .then(res => {
           this.userData(res.data);
       })
       .catch(err => console.log(err))

    }

    getPosts = () =>
    {
        const user = {
            id: this.state.userID
        }
        console.log(user);
        axios.post('http://localhost:1500/dashboard/user', user)
        .then(res => {
            this.setState({
                posts : res.data
            })
        })
        .catch(err => console.log(err))
    }


    userData = (data) =>
    {
        const {_id, username, avatar} = data[0];
        console.log(data);
        this.setState({
            userID: _id,
            username: username,
            useravatar: avatar
        })
       this.getPosts()

    }

    renderPosts = () =>
    {
        return this.state.posts.map(post =>
           { 
            let datePost =  post.createdAt.slice(0,10);
               
            return (
            <Post user={post.user} body={post.body} avatar={post.avatarUser} date={datePost}  />
           ) }
        )
    }

    render() {
        return (
            <div>
            <header className='background-profile'>
                <div className='containerImageAvatar'> 
                    <img src={this.state.images[this.state.useravatar]} className="imageAvatar"/>
                </div>  
            </header>
            <div className='containerPosts'>
                <h1 className='my-3 nameUser'>{this.state.username}</h1>
                <div className="containerPosts">
                    {this.renderPosts()}
                </div>
            </div>

        </div>
        )
    }
}
