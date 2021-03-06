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
            userID: 0,
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
            followers: [],
            followersUsernames: [],
            followersAmount: 0,
            followingID: [],
            followingAmount: 0,
            dateIntro: 0
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
        axios.post('http://localhost:1500/dashboard/user', user)
        .then(res => {
            this.setState({
                posts : res.data
            })
        })
        .catch(err => console.log(err))
    }

    getFollows = () =>
    {
        const userID = {
            userID : this.state.userID
        }
        console.log(this.state.userID);
        axios.post('http://localhost:1500/user/getFollowers', userID)
        .then(res => {
            this.setState({
                followers: res.data.followers,
                followingID: res.data.following,
                followingAmount: res.data.following.length
            })

            this.state.followers.map(follower => {
                let userToSearch = {
                    id: follower
                }
              axios.post('http://localhost:1500/user/searchUser', userToSearch) 
                .then(res => {
                    
                    const newArray = this.state.followersUsernames;
                    const newwArray = newArray.push(res.data.username)
                    this.setState({
                        followersAmount: this.state.followersUsernames.length
                    })
                })
            })

        })
    }


    userData = (data) =>
    {
        console.log(data[0]._id);
        const {_id, username, avatar, followers, createdAt} = data[0];
        this.setState({
            userID: _id,
            username: username,
            useravatar: avatar,
            followers: followers,
            dateIntro: createdAt
        })
        this.getPosts()
        this.getFollows()

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
            <div className='containerPosts mainProfileMain'>
                <h1 className='my-3 nameUser'>{this.state.username}</h1>
               
                <div className="containerProfileMine">

                    <div className="profileBiography">
                        <h3>Biograf??a:</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui harum tenetur provident aliquam quidem excepturi ea, dicta eos eveniet blanditiis!  
                        </p>
                        
                        <hr/>
                        <p className='seguidores'>{this.state.followersAmount} seguidores</p>
                        <p className='seguidores'>{this.state.followingAmount} seguidos</p>

                        <hr/>
                        <h4>Se uni?? en:</h4>
                        <p>2021-4-12</p>
                        

                    </div>

                    <div className="containerPosts postProfile">
                        {this.renderPosts()}
                    </div>
            </div>
            </div>
        </div>
        )
    }
}
